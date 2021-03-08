import * as fs from 'fs'
import { join } from 'path'
import * as process from 'process'
import * as Shell from 'shelljs'
import { dclone } from 'dclone'

const logGreen = (text: string) => {
  console.log(`\x1B[32m ${text}`)
}
const logRed = (text: string) => {
  console.log(`\x1B[31m ${text}`)
}
interface TemplateMap {
  [key: string]: string | undefined
}

interface Options {
  template?: string
}

const init = async (options?: Options) => {
  const argv = require('minimist')(process.argv.slice(2))
  const cwd = process.cwd()

  const templateMap: TemplateMap = {
    'spa': 'https://github.com/ykfe/ssr/tree/dev/example/midway-react-ssr',
    'serverless-react-ssr': 'https://github.com/ykfe/ssr/tree/dev/example/midway-react-ssr',
    'serverless-vue-ssr': 'https://github.com/ykfe/ssr/tree/dev/example/midway-vue-ssr',
    'midway-react-ssr': 'https://github.com/ykfe/ssr/tree/dev/example/midway-react-ssr',
    'midway-vue-ssr': 'https://github.com/ykfe/ssr/tree/dev/example/midway-vue-ssr',
    'nestjs-react-ssr': 'https://github.com/ykfe/ssr/tree/dev/example/nestjs-react-ssr',
    'nestjs-vue-ssr': 'https://github.com/ykfe/ssr/tree/dev/example/nestjs-vue-ssr',
    'ssr-with-js': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-js',
    'ssr-with-ts': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-ts',
    'ssr-with-antd': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-antd',
    'ssr-with-dva': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-dva'
  }
  if (!argv._[0]) {
    logRed('未指定项目名称 请使用格式 npm init ssr-app <project-name>')
    return
  }
  const targetDir = argv._[0]

  if (fs.existsSync(targetDir)) {
    logRed(`${targetDir}文件夹已存在，请先删除`)
    return
  }
  let template: string = 'serverless-react-ssr'
  if (templateMap[argv.template] === undefined) {
    logGreen('未选择模版类型，默认创建 serverless react ssr 应用')
    template = 'serverless-react-ssr'
  } else {
    logGreen(`${argv.template} 应用创建中...`)
    template = argv.template
  }
  const dir = templateMap[template]
  await dclone({
    dir
  })
  if (template === 'serverless-react-ssr') {
    template = 'midway-react-ssr'
  }
  if (template === 'serverless-vue-ssr') {
    template = 'midway-vue-ssr'
  }
  Shell.mv(`${join(cwd, `./example/${template}`)}`, `${join(cwd, `./${targetDir}`)}`)
  Shell.rm('-rf', `${join(cwd, './example')}`)
  console.log(`  cd ${targetDir}`)
  console.log(`  npm install (or \`yarn\`)`)
  console.log(`  npm start (or \`yarn start\`)`)
  console.log()
}

export {
  init
}
