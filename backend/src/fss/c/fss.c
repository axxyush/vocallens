#include <limits.h>
#include <string.h>

#include "fss.h"

int min(int x, int y) {
	return x < y ? x : y;
} // min

int levenshtein_distance(const char *src, const char *dst) {
	int n = strlen(src);
	int m = strlen(dst);

	int dp[n+1][m+1];

	for (int i = 0; i <= n; ++i) {
		dp[i][0] = i;
	}

	for (int j = 0; j <= m; ++j) {
		dp[0][j] = j;
	}

	for (int i = 1; i <= n; ++i) {
		for (int j = 1; j <= m; ++j) {
			if (src[i-1] == dst[j-1])
				dp[i][j] = dp[i-1][j-1];
			else
				dp[i][j] = 1 + min(min(dp[i-1][j], dp[i][j-1]), dp[i-1][j-1]);
		}
	}

	return dp[n][m];
} // levenshtein_distance

struct word {
	char *str;
	int distance;
}; // word

struct word word_min(struct word a, struct word b) {
	return a.distance < b.distance ? a : b;
} // word_min

#pragma omp declare reduction(word_min: struct word: omp_out=word_min(omp_out, omp_in))\
	initializer(omp_priv={NULL, INT_MAX})

char *get_nearest_word(char *src, char **dictionary, int dictionary_size) {
	struct word nearest = {NULL, INT_MAX};

	# pragma omp parallel for schedule(guided) reduction(word_min:nearest)
	for (int i = 0; i < dictionary_size; ++i) {
		int distance = levenshtein_distance(src, dictionary[i]);
		struct word word = {dictionary[i], distance};
		nearest = word_min(nearest, word);
	}

	return nearest.str;
} // get_nearest_word

