# create-ssr-app

<a href="https://github.com/zhangyuang/create-ssr-app/actions">
  <img src="https://github.com/zhangyuang/create-ssr-app/workflows/CI/badge.svg"/>
</a>
<a href="https://codecov.io/gh/zhangyuang/create-ssr-app">
  <img src="https://codecov.io/gh/zhangyuang/create-ssr-app/branch/master/graph/badge.svg?token=TW0NOTDU39"/>
</a>  
<a href="https://npmcharts.com/compare/create-ssr-app"><img src="https://img.shields.io/npm/dt/create-ssr-app" alt="download"></a>

Fast create an server-side-render app contains both [serverless ssr](https://github.com/ykfe/ssr) and [egg-react-ssr](https://github.com/ykfe/egg-react-ssr/) realized by [dclone](https://github.com/ykfe/dclone)

`create-ssr-app` 用于快速创建 `ssr` 服务端渲染应用。可创建基于 [ssr 框架](https://github.com/ykfe/ssr) 的开箱即用的服务端渲染应用，以及 [egg-react-ssr](https://github.com/ykfe/egg-react-ssr/) 骨架类型的应用。如无特殊需求，我们推荐创建基于 [ssr 框架](https://github.com/ykfe/ssr) 的开箱即用的服务端渲染应用

## 创建应用

我们提供了两种方式来快速创建应用

### 手动选择(推荐使用)

```bash
$ npm init ssr-app my-ssr-project
$ cd my-ssr-project
$ npm install
$ npm start
```

![](https://res.wx.qq.com/op_res/EwhvVPNOBCxrgWbWeqeeKbpdFC8KA7riyvB8UJ4eTYt25oBm_D4yX3OtJkV2g-9E1rr1iFCQgikOaDyM1YXr1g)

手动选择需要创建的应用类型 基于 [ssr 框架](https://github.com/ykfe/ssr)

### 命令行指定模版类型

通过该方式来手动制定需要创建的模版类型。同时支持创建基于 [ssr 框架](https://github.com/ykfe/ssr) 的开箱即用的服务端渲染应用，以及[egg-react-ssr](https://github.com/ykfe/egg-react-ssr/) 骨架类型的应用

```js
   const templateMap: TemplateMap = {
    'spa': 'https://github.com/ykfe/ssr/tree/dev/example/midway-react-ssr',
    'serverless-react-ssr': 'https://github.com/ykfe/ssr/tree/dev/example/midway-react-ssr',
    'serverless-vue-ssr': 'https://github.com/ykfe/ssr/tree/dev/example/midway-vue-ssr',
    'midway-react-ssr': 'https://github.com/ykfe/ssr/tree/dev/example/midway-react-ssr',
    'midway-vue-ssr': 'https://github.com/ykfe/ssr/tree/dev/example/midway-vue-ssr',
    'midway-vue3-ssr': 'https://github.com/ykfe/ssr/tree/dev/example/midway-vue3-ssr',
    'nestjs-react-ssr': 'https://github.com/ykfe/ssr/tree/dev/example/nestjs-react-ssr',
    'nestjs-vue-ssr': 'https://github.com/ykfe/ssr/tree/dev/example/nestjs-vue-ssr',
    'nestjs-vue3-ssr': 'https://github.com/ykfe/ssr/tree/dev/example/nestjs-vue3-ssr',
    'ssr-with-js': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-js',
    'ssr-with-ts': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-ts',
    'ssr-with-antd': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-antd',
    'ssr-with-dva': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-dva'
  }
```

```bash
$ npm init ssr-app my-ssr-project --template=serverless-react-ssr
$ npm init ssr-app my-ssr-project -- --template=midway-react-ssr # when Node.js >= 15
$ cd my-ssr-project
$ npm install
$ npm start
```

## Publish On NPM

```bash
$ npm version patch|minor|major
$ git push origin master # github ci will publish package on NPM automatically
```
