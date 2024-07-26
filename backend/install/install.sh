#!/bin/bash

# Check for HuggingFace access token
if [ "$#" -le 0 ]; then
  echo "Missing HuggingFace access token. Usage: $0 {TOKEN}"
  exit
fi

# Set default number of cores for build
if [ -z "$2" ]; then
  set "$2" "1"
fi

# Move to backend root
cd ..

# Check for Kaldi build
if [ -f kaldi/src/bin/compute-gop ]; then
  echo "Kaldi build already exists. Skipping."
else
  # Build Kaldi
  cd kaldi/tools
  make -j"$2"
  cd ../src
  ./configure
  make clean depend
  make -j"$2"
  cd ../..
fi

# Check for LibriSpeech models
if [ -d kaldi/egs/librispeech/s5/data ]; then
  echo "LibriSpeech models already exist. Skipping."
  echo "If you want to reinstall the LibriSpeech models, run 'rm -rf kaldi/egs/librispeech/s5/data && rm -rf kaldi/egs/librispeech/s5/exp' and then execute the script again."
else
  # Download LibriSpeech models
  mkdir stage
  cd stage
  wget https://kaldi-asr.org/models/13/0013_librispeech_v1_chain.tar.gz
  wget https://kaldi-asr.org/models/13/0013_librispeech_v1_lm.tar.gz
  wget https://kaldi-asr.org/models/13/0013_librispeech_v1_extractor.tar.gz

  # Untar LibriSpeech models
  for file in *.tar.gz; do
    tar xf $file
  done

  # Install LibriSpeech models
  mv data/lang_test_tgsmall data/lang
  mv exp/chain_cleaned/tdnn_1d_sp exp/nnet3_cleaned/tdnn_sp
  rmdir exp/chain_cleaned
  mv data ../kaldi/egs/librispeech/s5
  mv exp ../kaldi/egs/librispeech/s5
  cd ..
  rm -r stage
fi

# Check for GOP recipe
if [ -d kaldi/egs/gop ]; then
  echo "GOP recipe already exists. Skipping."
  echo "If you want to use a new GOP recipe, run 'rm -rf kaldi/egs/gop' and then execute the script again."
else
  # Add GOP recipe to Kaldi
  cp -r gop kaldi/egs
fi

# Check for virtual environment
if [ -d venv ]; then
  echo "Virtual environment already exists. Skipping."
  echo "If you want to recreate the virtual environment, run 'rm -rf venv' and then execute the script again."
else
  # Create virtual environment
  python3.8 -m venv venv

  # Add environment variables
  echo '' >> venv/bin/activate
  echo '# Screener environment variables' >> venv/bin/activate
  echo 'export KALDI_ROOT="$VIRTUAL_ENV/../kaldi"' >> venv/bin/activate
  echo 'export PHONETIC_MODEL_PATH="mrrubino/wav2vec2-large-xlsr-53-l2-arctic-phoneme"' >> venv/bin/activate
  echo "export HF_TOKEN=\"$1\"" >> venv/bin/activate

  # Activate virtual environment
  source venv/bin/activate

  # Install runtime dependencies
  pip install -r requirements.txt
fi

# Check for fast string search library
if [ -f src/fss/c/libfss.so ]; then
  echo "Fast string search library already exists. Skipping."
  echo "if you want to recreate the library, run 'rm src/fss/c/libfss.so' and then execute the script again."
else
  # Build fast string search library
  cd src/fss/c
  make omp 2> /dev/null

  # Try without OpenMP if failed
  if [ "$?" != 0 ]; then
    make 2> /dev/null
  fi

  cd ../../..
fi

