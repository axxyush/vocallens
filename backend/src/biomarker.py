"""
Functions for extracting speech biomarkers
from various symbolic representations.
"""

import itertools


# Computed as #E / (#C + #E + #B).
def mispronunciation_density(s):
    n = len(s)
    assert n != 0,'Input string must have at least 1 character.'

    errors = s.count('E')
    return errors / n


# Computed as #B / (#C + #E + #B).
def block_density(s):
    n = len(s)
    assert n != 0,'Input string must have at least 1 character.'

    blocks = s.count('B')
    return blocks / n


# Computed as #transitions / (#C + #E + #B).
def normalized_transition_count(s):
    n = len(s)
    assert n != 0,'Input string must have at least 1 character.'

    transitions = sum(1 for i in range(1, n) if s[i] != s[i-1])
    return transitions / n


# Computes the length of the longest continuous
# subsequence of character t in s.
def longest_common(s, t):
    n = len(s)
    assert n != 0,'Input string must have at least 1 character.'

    groups = itertools.groupby(s)
    counts = {label: sum(1 for _ in group) for label,group in groups}
    return counts.get(t, 0)


# Computes the length of the average continuous
# subsequence of character t in s.
def average_common(s, t):
    n = len(s)
    assert n != 0,'Input string must have at least 1 character.'

    groups = itertools.groupby(s)
    subsequences = sum(1 for label,_ in groups if label == t)
    return s.count(t) / subsequences if subsequences else 0


# Returns CE sequence biomarker labels.
def ce_header():
    return [
        "MPD",
        "NTC",
        "LCC",
        "ACC",
        "LCE",
        "ACE",
    ]


# Extracts biomakers from CE sequence.
def ce_extract(ce):
    return [
        mispronunciation_density(ce),
        normalized_transition_count(ce),
        longest_common(ce, 'C'),
        average_common(ce, 'C'),
        longest_common(ce, 'E'),
        average_common(ce, 'E'),
    ]

