## hint-hint

A module that produces TAP output for JSHint. *hint hint*

[![Build Status](https://travis-ci.org/diy/hint-hint.png?branch=master)](https://travis-ci.org/diy/hint-hint)

[![NPM](https://nodei.co/npm/hint-hint.png)](https://nodei.co/npm/hint-hint/)

### Usage

```js
var hinthint = require('hint-hint');

hinthint('file/path/*.js', config)
```

File paths support glob syntax. `config` is a JS object.