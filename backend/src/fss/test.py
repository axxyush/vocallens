import requests
import time
import unittest

from string2string.distance import LevenshteinEditDistance

from fss import get_nearest_word, get_nearest_word_python


class TestFindClosestWord(unittest.TestCase):
    def test_empty_dictionary(self):
        result = get_nearest_word("hello", [])
        self.assertIsNone(result)

    def test_single_word_dictionary(self):
        result = get_nearest_word("hello", ["hola"])
        self.assertEqual(result, "hola")

    def test_get_nearest_word(self):
        result = get_nearest_word("hello", ["hola", "help", "hell", "hi"])
        self.assertEqual(result, "hell")

    def test_large_dictionary(self):
        request = requests.get("http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/cmudict-0.7b")
        dictionary = [line.split()[0].lower() for line in request.text.splitlines() if not line.startswith(";;;")]

        srcs = ["asdf123", "twentith", "frbla", "foo", "lnoie", "hjoupishpJPIj;kzjzns;dfzj", "shjdfo", "hajposfp", "ajsdfjiapo", "qupiwnk10ja"]
        c_times = []
        p_times = []

        distance = LevenshteinEditDistance()

        for src in srcs:
            start = time.time()
            c_nearest = get_nearest_word(src, dictionary)
            end = time.time()
            c_times.append(end-start)

            start = time.time()
            p_nearest = get_nearest_word_python(src, dictionary)
            end = time.time()
            p_times.append(end-start)

            c_dist = distance.compute(src, c_nearest)
            p_dist = distance.compute(src, p_nearest)
            self.assertEqual(c_dist, p_dist)

        print(f"Mean Runtime C: {sum(c_times)/len(c_times)}")
        print(f"Mean Runtime Python: {sum(p_times)/len(p_times)}")


if __name__ == "__main__":
    unittest.main()

