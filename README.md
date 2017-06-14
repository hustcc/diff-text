# diff-text

> Inline text diff algorithm. Simplified from [https://neil.fraser.name/writing/diff/](https://neil.fraser.name/writing/diff/). For input text diff in HTML with Chinese input software.

[![Build Status](https://travis-ci.org/ProtoTeam/diff-text.svg?branch=master)](https://travis-ci.org/ProtoTeam/diff-text) [![Coverage Status](https://coveralls.io/repos/github/ProtoTeam/diff-text/badge.svg)](https://coveralls.io/github/ProtoTeam/diff-text)


## Usage

> **npm i --save diff-text**


```js
var diffText = require('diff-text');

diffText('diff---text', 'diff+++text');

// will get array like below:
[
	[0, 'diff'], // equal
	[-1, '---'], // delete
	[1, '+++'],  // add
	[0, 'text']  // equal
]
```


## Test & Perf

```
> npm run test

> npm run pref

diff-text x 1,238,388 ops/sec ±1.22% (88 runs sampled)
```


## License

ISC@[ProtoTeam](https://github.com/ProtoTeam).


