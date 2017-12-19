# Profiling Websites / APIs

tags: profiling, ab, stress-testing

To do some rough profiling around response time, you can use `ab` - apache benchmark.

This will send a total of 1000 requests, 10 at a time to `http://www.something.com/`.

```
ab -n 1000 -c 10 -g something.tsv http://www.something.com/
```

`-g` means each response is listed separately, and the file is tab separated.

```
starttime	seconds	ctime	dtime	ttime	wait
Wed Apr 15 18:54:11 2015	1429149251	1	147	148	147
Wed Apr 15 18:54:11 2015	1429149251	0	152	152	152
Wed Apr 15 18:54:11 2015	1429149251	1	152	153	152
...
```

`-e` would be comma separated and would have to requests binned by the time it
took to complete that percent of requests.

```
Percentage served,Time in ms
0,117.436
1,117.436
2,120.811
3,120.811
...
```

Of course each format is useful for different things, so don't restrict yourself:

```
ab -n 1000 -c 10 -e something.csv -g something.tsv http://www.something.com/
```

Additionally you get a summary of the requests.

```
Document Path:          /
Document Length:        0 bytes

Concurrency Level:      10
Time taken for tests:   55.637 seconds
Complete requests:      1000
Failed requests:        0
Non-2xx responses:      1000
Total transferred:      357000 bytes
HTML transferred:       0 bytes
Requests per second:    17.97 [#/sec] (mean)
Time per request:       556.368 [ms] (mean)
Time per request:       55.637 [ms] (mean, across all concurrent requests)
Transfer rate:          6.27 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    9  89.3      1    1003
Processing:   376  547 137.9    530    1942
Waiting:      376  546 137.9    530    1942
Total:        377  555 168.9    531    1942

Percentage of the requests served within a certain time (ms)
  50%    531
  66%    552
  75%    568
  80%    577
  90%    611
  95%    653
  98%   1473
  99%   1655
 100%   1942 (longest request)
 ```

You can use gnuplot to visualize:

You can place multiple outputs on the same graph. This is useful for comparing
before and afters, or showing degradation as concurrency increases.

It is possible to send data, headers, and cookies with requests.
