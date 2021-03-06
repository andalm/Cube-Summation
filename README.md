Cube Summation
===

It's my solution for Cube Summation from hackerrank. I have applied IoC and DI patterns for obtain a extendible and testeable solution.
Also this project uses ECMAScript 2015 syntax and OOP programming.

### Problem Description

You are given a 3-D Matrix in which each block contains 0 initially. The first block is defined by the coordinate (1,1,1) and the last block is defined by the coordinate (N,N,N). There are two types of queries.

```
UPDATE x y z W
```
updates the value of block (x,y,z) to W.

```
QUERY x1 y1 z1 x2 y2 z2
```

calculates the sum of the value of blocks whose x coordinate is between x1 and x2 (inclusive), y coordinate between y1 and y2 (inclusive) and z coordinate between z1 and z2 (inclusive).

__Input Format__

The first line contains an integer T, the number of test-cases. T testcases follow.
For each test case, the first line will contain two integers N and M separated by a single space.
N defines the N * N * N matrix.
M defines the number of operations.
The next M lines will contain either

```
 1. UPDATE x y z W
 2. QUERY  x1 y1 z1 x2 y2 z2
```

__Output Format__

Print the result for each QUERY.

__Constrains__
```
1 <= T <= 50
1 <= N <= 100
1 <= M <= 1000
1 <= x1 <= x2 <= N
1 <= y1 <= y2 <= N
1 <= z1 <= z2 <= N
1 <= x,y,z <= N
-109 <= W <= 109
```

__Sample Input__
```
2
4 5
UPDATE 2 2 2 4
QUERY 1 1 1 3 3 3
UPDATE 1 1 1 23
QUERY 2 2 2 4 4 4
QUERY 1 1 1 3 3 3
2 4
UPDATE 2 2 2 1
QUERY 1 1 1 1 1 1
QUERY 1 1 1 2 2 2
QUERY 2 2 2 2 2 2
```
__Sample Output__
```
4
4
27
0
1
1
```
### How it works

1. It needs node version >=6.9.1
2. Run ```npm install```
3. Run ```npm start```
4. PORT by default is 3000
5. Run tests ```npm test```
6. Index page ```http://localhost:3000/index.html```