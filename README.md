# create-ssr-app

Create an app powered by [serverless ssr](https://github.com/ykfe/ssr) or [egg-react-ssr](https://github.com/ykfe/egg-react-ssr/)

## template list

可创建以下应用类型

```js
const templateMap: TemplateMap = {
  'spa': 'https://github.com/ykfe/ssr/tree/dev/example/spa',
  'ssr-with-js': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-js',
  'ssr-with-ts': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-ts',
  'ssr-with-antd': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-antd',
  'ssr-with-dva': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-dva'
}
```

```bash
$ npm init ssr-app my-ssr-project --template=spa
$ cd my-ssr-project
$ npm install
$ npm start
```

