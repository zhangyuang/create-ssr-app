import { join } from 'path'
import * as process from 'process'
import * as Shell from 'shelljs'
import { dclone } from 'dclone'

const logGreen = (text: string) => {
  console.log(`\x1B[32m ${text}`)
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
    'spa': 'https://github.com/ykfe/ssr/tree/dev/example/spa',
    'ssr-with-js': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-js',
    'ssr-with-ts': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-ts',
    'ssr-with-antd': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-antd',
    'ssr-with-dva': 'https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-dva'
  }
  const targetDir = argv._[0] || '.'
  if (templateMap[argv.template] === undefined) {
    logGreen('未选择模版类型，默认创建 serverless-spa 应用')
  } else {
    logGreen(`${argv.template} 应用创建中...`)
  }
  const template: string = argv.template || 'spa'
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
