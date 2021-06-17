import * as fs from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import * as process from 'process'
import * as Shell from 'shelljs'
import { dclone } from 'dclone'

const prompts = require('prompts')
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
    spa: 'https://github.com/ykfe/ssr/tree/dev/example/midway-react-ssr',
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
  if (!argv._[0]) {
    logRed('未指定项目名称 请使用格式 npm init ssr-app')
    return
  }
  const targetDir = argv._[0]

  if (fs.existsSync(targetDir)) {
    logRed(`${targetDir}文件夹已存在，请先删除`)
    return
  }
  let template = options?.template ?? argv.template
  if (!template) {
    const { stdout } = await promisify(exec)('node -v')
    if (stdout.startsWith('v15') || stdout.startsWith('v16')) {
      logGreen('获取 template 参数失败，请手动选择模版类型，若 Node.js version >=15 需使用 npm init ssr-app my-ssr-project -- --template=midway-react-ssr 的形式来创建应用')
    } else {
      const { stdout } = await promisify(exec)('npm -v')
      if (stdout.startsWith('7')) {
        logGreen('获取 template 参数失败，请手动选择模版类型，若 npm version >=7 需使用 npm init ssr-app my-ssr-project -- --template=midway-react-ssr 的形式来创建应用')
      }
    }
    const answers = await prompts({
      type: 'select',
      name: 'template',
      message: '请选择模版类型',
      choices: [
        { title: 'midway-vue3-ssr', value: 'midway-vue3-ssr' },
        { title: 'midway-react-ssr', value: 'midway-react-ssr' },
        { title: 'midway-vue-ssr', value: 'midway-vue-ssr' },
        { title: 'nestjs-vue3-ssr', value: 'nestjs-vue3-ssr' },
        { title: 'nestjs-react-ssr', value: 'nestjs-react-ssr' },
        { title: 'nestjs-vue-ssr', value: 'nestjs-vue-ssr' }
      ]
    }, {
      onCancel: () => {
        logRed('退出选择')
        process.exit(0)
      }
    })
    template = answers.template
  }

  logGreen(`${template} 应用创建中...`)
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
  console.log('  npm install (or `yarn`)')
  console.log('  npm start (or `yarn start`)')
  console.log()
}

export {
  init
}
