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
    'serverless-ssr-app': 'https://github.com/ykfe/ssr/tree/dev/example/serverless-ssr-app',
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
  if (templateMap[argv.template] === undefined) {
    logGreen('未选择模版类型，默认创建 serverless 应用')
  } else {
    logGreen(`${argv.template} 应用创建中...`)
  }
  const template: string = argv.template || 'serverless-ssr-app'
  const dir = templateMap[template]
  await dclone({
    dir
  })
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
