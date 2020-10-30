# create-ssr-app

<a href="https://github.com/zhangyuang/create-ssr-app/actions">
  <img src="https://github.com/zhangyuang/create-ssr-app/workflows/CI/badge.svg"/>
</a>
<a href="https://codecov.io/gh/zhangyuang/create-ssr-app">
  <img src="https://codecov.io/gh/zhangyuang/create-ssr-app/branch/master/graph/badge.svg?token=TW0NOTDU39"/>
</a>  

Fast create an server-side-render app contains both [serverless ssr](https://github.com/ykfe/ssr) and [egg-react-ssr](https://github.com/ykfe/egg-react-ssr/) realized by [dclone](https://github.com/ykfe/dclone)

## Template list

可创建 Serverless-Side-Render 应用 或者 传统的 Node.js Server-Side-Render 应用 即 [egg-react-ssr](https://github.com/ykfe/egg-react-ssr/)

```js
const templateMap: TemplateMap = {
  'spa': 'https://github.com/ykfe/ssr/tree/dev/example/spa', // 默认创建 serverless-ssr 应用
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

## Publish On NPM

```bash
$ npm version patch|minor|major
$ git push origin master # github ci will publish package on NPM automatically
```
