# create-ssr-app

<a href="https://github.com/zhangyuang/create-ssr-app/actions">
  <img src="https://github.com/zhangyuang/create-ssr-app/workflows/CI/badge.svg"/>
</a>
<a href="https://codecov.io/gh/zhangyuang/create-ssr-app">
  <img src="https://codecov.io/gh/zhangyuang/create-ssr-app/branch/master/graph/badge.svg?token=TW0NOTDU39"/>
</a>  
<a href="https://npmcharts.com/compare/create-ssr-app"><img src="https://img.shields.io/npm/dt/create-ssr-app" alt="download"></a>

Fast create an server-side-render app contains both [serverless ssr](https://github.com/zhangyuang/ssr) and [egg-react-ssr](https://github.com/zhangyuang/egg-react-ssr/) realized by [dclone](https://github.com/zhangyuang/dclone)

`create-ssr-app` 用于快速创建 `ssr` 服务端渲染应用。可创建基于 [ssr 框架](https://github.com/zhangyuang/ssr) 的开箱即用的服务端渲染应用，以及 [egg-react-ssr](https://github.com/zhangyuang/egg-react-ssr/) 骨架类型的应用。如无特殊需求，我们推荐创建基于 [ssr 框架](https://github.com/zhangyuang/ssr) 的开箱即用的服务端渲染应用

## 创建应用

```bash
$ npm init ssr-app my-ssr-project
$ cd my-ssr-project
$ npm install
$ npm start
```

![](http://doc.ssr-fc.com/images/resume3.svg)


## Publish On NPM

```bash
$ npm version patch|minor|major
$ git push origin master # github ci will publish package on NPM automatically
```
