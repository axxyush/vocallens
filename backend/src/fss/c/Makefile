CC=gcc
CFLAGS=-Wall -Wextra -std=c11 -fopenmp

all: fss.c fss.h
	$(CC) $(CFLAGS) -shared -fPIC fss.c -o libfss.so

clean:
	rm -rf libfss.so

