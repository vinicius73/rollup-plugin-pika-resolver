# @vinicius73/rollup-plugin-skypack-resolver

Generate the bundle of your project using [Skypack CDN](https://www.skypack.dev) for external dependencies.

[![Maintainability](https://api.codeclimate.com/v1/badges/5fa12e0c2482b3da931f/maintainability)](https://codeclimate.com/github/vinicius73/rollup-plugin-pika-resolver/maintainability)
[![Build Status](https://scrutinizer-ci.com/g/vinicius73/rollup-plugin-pika-resolver/badges/build.png?b=master)](https://scrutinizer-ci.com/g/vinicius73/rollup-plugin-pika-resolver/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/vinicius73/rollup-plugin-pika-resolver/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/vinicius73/rollup-plugin-pika-resolver/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/vinicius73/rollup-plugin-pika-resolver/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/vinicius73/rollup-plugin-pika-resolver/?branch=master)
[![@vinicius73/rollup-plugin-skypack-resolver](https://img.shields.io/npm/v/@vinicius73/rollup-plugin-skypack-resolver)](https://www.npmjs.com/package/@vinicius73/rollup-plugin-skypack-resolver)

## Install

```sh
yarn add @vinicius73/rollup-plugin-skypack-resolver rollup -D
```

## Usage

On this example, [axios](https://www.skypack.dev/npm/axios) and [lodash-es](https://www.skypack.dev/npm/lodash-es) need be installed as project dependencies, using [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install).

> `skypackResolver` uses your local dependencies to determine cdn version.

```js
//> rollup.config.js
const { skypackResolver } = require('@vinicius73/rollup-plugin-skypack-resolver')

module.exports = {
  input: 'src/index.js',
  output: {
    format: 'es'
  },
  plugins: [skypackResolver({
    modules: ['axios', 'lodash-es']
  })]
}
```

```js
//> src/index.js
import axios from 'axios'
import { get } from 'lodash-es'

const run = async () => {
  const { data } = await axios.get('https://reqres.in/api/users/2')
  
  console.log(
    get(data, ['data', 'email'])
  )
}

run()
  .then(() => console.log('All done'))
  .catch(err => console.error(err))
```

```sh
rullup -c
```

```js
//> output
import axios from 'https://cdn.skypack.dev/axios@0.20.0';
import { get } from 'https://cdn.skypack.dev/lodash-es@4.17.15';

const run = async () => {
  const { data } = await axios.get('https://reqres.in/api/users/2');
  console.log(get(data, ['data', 'email']));
};

run()
  .then(() => console.log('All done'))
  .catch(err => console.error(err));
```

## Options

### `modules`

Type: `Array[...String]`  
Required: `true`  

An array with modules that will be transformed into cdn import.

### `cdnHost`

Type: `String`  
Required: `false`  
Default: `https://cdn.skypack.dev`  

Host used in imports.
