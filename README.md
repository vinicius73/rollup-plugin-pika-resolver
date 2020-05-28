# rollup-plugin-pika-resolver

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
    modules: ['axios']
  })]
}
```

> src/index.js

```js
import axios from 'axios'

const run = async () => {
  const { data } = await axios.get('https://reqres.in/api/users/2')
  console.log(data)
}

run()
  .then(() => console.log('All done'))
  .catch(err => console.error(err))
```

> output
```js
import axios from 'https://cdn.pika.dev/axios@0.19.2';

const run = async () => {
  const { data } = await axios.get('https://reqres.in/api/users/2');
  console.log(data);
};

run()
  .then(() => console.log('All done'))
  .catch(err => console.error(err));

```