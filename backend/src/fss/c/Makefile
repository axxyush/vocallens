CC=gcc
CFLAGS=-Wall -Wextra -std=c11

all: fss.c fss.h
	$(CC) $(CFLAGS) -shared -fPIC fss.c -o libfss.so

omp: fss.c fss.h
	$(CC) $(CFLAGS) -fopenmp -shared -fPIC fss.c -o libfss.so

clean:
	rm -rf libfss.so

