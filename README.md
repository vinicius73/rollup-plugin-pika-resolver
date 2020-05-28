# @vinicius73/rollup-plugin-pika-resolver

Generate the bundle of your project using [Pika CDN](https://www.pika.dev/cdn) for external dependencies.

## Install
```sh
yarn install @vinicius73/rollup-plugin-pika-resolver rollup -D
```

## Usage

> rollup.config.js

```js
const { pikaResolver } = require('@vinicius73/rollup-plugin-pika-resolver')

module.exports = {
  input: 'src/index.js',
  output: {
    format: 'es'
  },
  plugins: [pikaResolver({
    modules: ['axios', 'lodash-es']
  })]
}
```

> src/index.js

```js
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

> output
```js
import axios from 'https://cdn.pika.dev/axios@0.19.2';
import { get } from 'https://cdn.pika.dev/lodash-es@4.17.15';

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
Default: `https://cdn.pika.dev`

Host used in imports.
