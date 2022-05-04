import * as fs from 'fs'
import { promises } from 'fs'
import { join } from 'path'
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
  let isSSR = false // 当前创建的是 ssr 框架的模版
  const templateMap: TemplateMap = {
    spa: 'https://github.com/zhangyuang/ssr/tree/dev/example/midway-react-ssr',
    'serverless-react-ssr': 'https://github.com/zhangyuang/ssr/tree/dev/example/midway-react-ssr',
    'serverless-vue-ssr': 'https://github.com/zhangyuang/ssr/tree/dev/example/midway-vue-ssr',
    'midway-react-ssr': 'https://github.com/zhangyuang/ssr/tree/dev/example/midway-react-ssr',
    'midway-vue-ssr': 'https://github.com/zhangyuang/ssr/tree/dev/example/midway-vue-ssr',
    'midway-vue3-ssr': 'https://github.com/zhangyuang/ssr/tree/dev/example/midway-vue3-ssr',
    'nestjs-react-ssr': 'https://github.com/zhangyuang/ssr/tree/dev/example/nestjs-react-ssr',
    'nestjs-vue-ssr': 'https://github.com/zhangyuang/ssr/tree/dev/example/nestjs-vue-ssr',
    'nestjs-vue3-ssr': 'https://github.com/zhangyuang/ssr/tree/dev/example/nestjs-vue3-ssr',
    'ssr-with-js': 'https://github.com/zhangyuang/egg-react-ssr/tree/dev/example/ssr-with-js',
    'ssr-with-ts': 'https://github.com/zhangyuang/egg-react-ssr/tree/dev/example/ssr-with-ts',
    'ssr-with-antd': 'https://github.com/zhangyuang/egg-react-ssr/tree/dev/example/ssr-with-antd',
    'ssr-with-dva': 'https://github.com/zhangyuang/egg-react-ssr/tree/dev/example/ssr-with-dva'
  }
  if (!argv._[0]) {
    logRed('未指定项目名称 请使用格式 npm init ssr-app')
    return
  }
  const targetDir = argv._[0]

  if (fs.existsSync(targetDir)) {
    logRed(`${targetDir} already existed, please delete it`)
    return
  }
  let template = options?.template ?? argv.template
  if (!template) {
    const answers = await prompts({
      type: 'select',
      name: 'template',
      message: 'Select a framework:',
      choices: [
        { title: 'nestjs-vue3-ssr(Support Vite and Script Setup)', value: 'nestjs-vue3-ssr' },
        { title: 'nestjs-vue3-ssr-pinia(Support Pinia, Vite and Script Setup)', value: 'nestjs-vue3-ssr-pinia' },
        { title: 'nestjs-react-ssr(Support Vite)', value: 'nestjs-react-ssr' },
        { title: 'nestjs-vue-ssr', value: 'nestjs-vue-ssr' },
        { title: 'midway-vue3-ssr(Midawy3.0, Support Vite and Script Setup)', value: 'midway-vue3-ssr' },
        { title: 'midway-react-ssr(Midawy3.0, Support Vite)', value: 'midway-react-ssr' },
        { title: 'midway-vue-ssr(Midawy3.0)', value: 'midway-vue-ssr' },
        { title: 'micro-app-ssr(micro-frontends + ssr)', value: 'micro-app-ssr' }
      ]
    }, {
      onCancel: () => {
        logRed('退出选择')
        process.exit(0)
      }
    })
    isSSR = true
    template = answers.template
  }

  logGreen(`${template} is creating...`)
  const dir = templateMap[template]
  if (!isSSR) {
    await dclone({
      dir
    })
  }
  if (template === 'serverless-react-ssr') {
    template = 'midway-react-ssr'
  }
  if (template === 'serverless-vue-ssr') {
    template = 'midway-vue-ssr'
  }
  if (!isSSR) {
    Shell.cp('-r', `${join(cwd, `./example/${template}`)}`, `${join(cwd, `./${targetDir}`)}`)
    Shell.rm('-rf', `${join(cwd, './example')}`)
    await promises.writeFile(`${join(cwd, `./${targetDir}/.npmrc`)}`, `# for pnpm mode
    public-hoist-pattern[]=@babel/runtime
    ${template.includes('nestjs') ? 'public-hoist-pattern[]=@types/express' : ''}
    ${template.includes('vue3') ? 'public-hoist-pattern[]=pinia' : ''}
    `
    )
  } else {
    Shell.cp('-r', `${join(__dirname, `../example/${template}`)}`, `${join(cwd, `./${targetDir}`)}`)
  }
  Shell.cp('-r', `${join(__dirname, '../gitignore.tpl')}`, `${join(cwd, `./${targetDir}/.gitignore`)}`)

  logGreen(`${template} has created succeed `)

  console.log(`  cd ${targetDir}`)
  console.log('  npm install (or `yarn`)')
  console.log('  npm start (or `yarn start`)')
  console.log()
}

export {
  init
}
