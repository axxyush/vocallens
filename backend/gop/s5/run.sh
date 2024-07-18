#!/usr/bin/env bash

# Check script inputs
lang=data/lang_nosp
if [ ! -d $lang ]; then
	echo "$0: No lang '$lang'." && exit 1
fi

set -e
. ./cmd.sh
. ./path.sh
. parse_options.sh

# Check librispeech's models
librispeech_eg=../../librispeech/s5
model=$librispeech_eg/exp/nnet3_cleaned/tdnn_sp
ivector_extractor=$librispeech_eg/exp/nnet3_cleaned/extractor

for d in $model $ivector_extractor; do
	[ ! -d $d ] && echo "$0: no such path $d. Did you import LibriSpeech (see README)?" && exit 1;
done

# Reset the sample directory
rm -rf data/sample/*.ark data/sample/*.scp
mkdir -p data/sample

# Compute MFCCs. The MFCCs are the acoustic features used to compute
# the phone probability distribution of a given segment of speech.
compute-mfcc-feats --config=conf/mfcc_hires.conf scp:wav.scp ark:- | \
	copy-feats --compress=true ark:- ark,scp:data/sample/feats.ark,data/sample/feats.scp

# Extract ivectors. The ivectors identify who is speaking in a given
# segment of speech, and they are a required input for the phone
# probability distribution computation in the next steps.
ivector-extract-online2 --config=conf/ivector_extractor.conf ark:spk2utt scp:data/sample/feats.scp ark:- | \
	copy-feats --compress=true ark:- ark,scp:data/sample/ivectors.ark,data/sample/ivectors.scp

# Compute CMVN statistics. These statistics are used to normalize
# the MFCCs so the sample follows the standard normal distribution.
compute-cmvn-stats scp:data/sample/feats.scp ark,scp:data/sample/cmvn.ark,data/sample/cmvn.scp

# Normalize MFCCs. The normalized MFCCs are used as input to the
# probability distribution computation, along with the ivectors.
cmvn_opts=`cat $model/cmvn_opts`
apply-cmvn $cmvn_opts scp:data/sample/cmvn.scp scp:data/sample/feats.scp ark:- | \
	copy-feats --compress=true ark:- ark,scp:data/sample/feats-cmvn.ark,data/sample/feats-cmvn.scp

# Generate probability matrix. The probability matrix stores the
# probabilities of each phone for each time slice in the input.
nnet3-compute --online-ivectors=scp:data/sample/ivectors.scp --online-ivector-period=10 \
	$model/final.mdl scp:data/sample/feats-cmvn.scp ark:- | \
	copy-feats --compress=true ark:- ark,scp:data/sample/posteriors.ark,data/sample/posteriors.scp

# Generate alignment graph. The alignment graph describes valid
# patterns of words and phones that can be generated when decoding
# an arbitrary speech signal. In this case, we know the words
# and phones that correspond to the decoded signal, so we create
# a graph using this one pattern of words and phones.
compile-train-graphs-without-lexicon --read-disambig-syms=data/lang_nosp/phones/disambig.int \
	$model/tree $model/final.mdl ark,t:data/sample/text.int ark,t:data/sample/text-phone.int \
	ark,scp:data/sample/graph.ark,data/sample/graph.scp

# Compute alignment. The alignment computation uses the phone-level
# probability information and the alignment graph to decode the input
# signal, determining where each phone starts and stops.
align-compiled-mapped --acoustic-scale=0.1 --self-loop-scale=0.1 --beam=10 --retry-beam=40 \
	$model/final.mdl scp:data/sample/graph.scp ark:data/sample/posteriors.ark \
	ark,scp:data/sample/ali.ark,data/sample/ali.scp

# Convert alignment to phones. The alignment is represented as
# hidden states of an HMM with transitions. This representation
# must be converted to the linguistically meaningful sequence
# of phones to compute the GOP scores.
ali-to-phones --per-frame=true $model/final.mdl scp:data/sample/ali.scp \
	ark,scp:data/sample/ali-phone.ark,data/sample/ali-phone.scp

# Generate GOP scores. The GOP score is calculated by using
# the phone alignments and phone probabilities to determine
# the probability that a given section of speech corresponds
# to the label phone. High probability = good proununcation.
compute-gop --phone-map=data/lang_nosp/phone-to-pure-phone.int --skip-phones-string=0:1:2 \
	$model/final.mdl ark:data/sample/ali-phone.ark ark:data/sample/posteriors.ark \
	ark,scp:data/sample/gop.ark,data/sample/gop.scp ark,scp:data/sample/feats-phone.ark,data/sample/feats-phone.scp

# Convert archive to readable format. The Kaldi archive
# contains a table of GOP scores in a binary format. This
# conversion makes the output easy for a human to interpret.
python3 local/gop_to_score_eval.py data/model_gop data/sample/gop.scp data/sample/gop.txt

echo "GOP scores saved in data/sample/gop.txt"

