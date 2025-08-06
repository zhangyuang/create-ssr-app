import { existsSync, promises } from 'fs'
import { join } from 'path'
import * as process from 'process'
import * as Shell from 'shelljs'

const prompts = require('prompts')
const logGreen = (text: string) => {
  console.log(`\x1B[32m ${text}`)
}
const logRed = (text: string) => {
  console.log(`\x1B[31m ${text}`)
}

interface Options {
  template?: string
}

const init = async (options?: Options) => {
  const argv = require('minimist')(process.argv.slice(2))
  const cwd = process.cwd()

  if (!argv._[0]) {
    logRed('未指定项目名称 请使用格式 npm init ssr-app <project-name>')
    return
  }
  const targetDir = argv._[0]

  if (existsSync(targetDir)) {
    logRed(`${targetDir} already existed, please delete it`)
    return
  }
  const { ssrVersion } = await prompts({
    type: 'select',
    name: 'ssrVersion',
    message: 'Select ssr framework version (v6 or v7):',
    choices: [
      { title: 'v7(Recommend, Support Rspack, Rolldown-Vite, Webpack@4)', value: 'v7' },
      { title: 'v6(Support Webpack@4, Vite@2)', value: 'v6' }
    ]
  }, {
    onCancel: () => {
      logRed('退出选择')
      process.exit(0)
    }
  })

  const answers = await prompts({
    type: 'select',
    name: 'template',
    message: 'Select a framework:',
    choices: [
      { title: 'nestjs-vue3-ssr', value: 'nestjs-vue3-ssr' },
      { title: 'nestjs-vue3-ssr-pinia', value: 'nestjs-vue3-ssr-pinia' },
      { title: 'nestjs-react18-ssr', value: 'nestjs-react18-ssr' },
      { title: 'nestjs-react-ssr', value: 'nestjs-react-ssr' },
      { title: 'nestjs-vue-ssr', value: 'nestjs-vue-ssr' },
      { title: 'midway-vue3-ssr', value: 'midway-vue3-ssr' },
      { title: 'midway-react18-ssr', value: 'midway-react18-ssr' },
      { title: 'midway-react-ssr', value: 'midway-react-ssr' },
      { title: 'midway-vue-ssr', value: 'midway-vue-ssr' },
      { title: 'micro-app-ssr(micro-frontends)', value: 'micro-app-ssr' }
    ]
  }, {
    onCancel: () => {
      logRed('退出选择')
      process.exit(0)
    }
  })
  const template = answers.template
  let tools = []
  if (ssrVersion === 'v7' && template !== 'micro-app-ssr') {
    const response = await prompts([
      {
        type: 'multiselect',
        name: 'tools',
        message: 'Select build tools which you want to use, you can select multiple tools, but install size will be larger',
        choices: [
          { title: 'Rspack', value: 'rspack' },
          ...(!['nestjs-vue-ssr', 'midway-vue-ssr'].includes(template) ? [{ title: 'Rolldown-Vite', value: 'vite' }] : []),
          { title: 'Webpack', value: 'webpack' }
        ]
      }
    ])
    tools = response.tools
  }
  if (tools.length === 0) {
    logRed('You must select at least one build tool')
    return
  }
  logGreen(`${template} is creating...`)
  Shell.cp('-r', `${join(__dirname, `../${ssrVersion === 'v7' ? 'ssr_v7_example' : 'ssr_v6_example'}/${template}`)}`, `${join(cwd, `./${targetDir}`)}`)
  Shell.cp('-r', `${join(__dirname, '../gitignore.tpl')}`, `${join(cwd, `./${targetDir}/.gitignore`)}`)
  if (ssrVersion === 'v7' && template !== 'micro-app-ssr') {
    const pkgJson = require(join(cwd, `./${targetDir}/package.json`))
    const bootstrapFileName = template.includes('nest') ? 'dist/main.js' : 'bootstrap.js'
    pkgJson.scripts = {
      start: `ssr start --tool ${tools[0]}`,
      ...(tools.slice(1)?.includes('vite') ? { 'start:vite': 'ssr start --tool vite' } : {}),
      ...(tools.slice(1)?.includes('rspack') ? { 'start:rspack': 'ssr start --tool rspack' } : {}),
      ...(tools.slice(1)?.includes('webpack') ? { 'start:webpack': 'ssr start --tool webpack' } : {}),
      build: `ssr build --tool ${tools[0]}`,
      ...(tools.slice(1)?.includes('vite') ? { 'build:vite': 'ssr build --tool vite' } : {}),
      ...(tools.slice(1)?.includes('rspack') ? { 'build:rspack': 'ssr build --tool rspack' } : {}),
      ...(tools.slice(1)?.includes('webpack') ? { 'build:webpack': 'ssr build --tool webpack' } : {}),
      prod: `ssr build --tool ${tools[0]} && NODE_ENV=production node ${bootstrapFileName}`,
      ...(tools.slice(1)?.includes('vite') ? { 'prod:vite': `ssr build --tool vite && NODE_ENV=production node ${bootstrapFileName}` } : {}),
      ...(tools.slice(1)?.includes('rspack') ? { 'prod:rspack': `ssr build --tool rspack && NODE_ENV=production node ${bootstrapFileName}` } : {}),
      ...(tools.slice(1)?.includes('webpack') ? { 'prod:webpack': `ssr build --tool webpack && NODE_ENV=production node ${bootstrapFileName}` } : {}),
      lint: 'biome format --diagnostic-level error',
      'lint:fix': 'biome format --diagnostic-level error --write'
    }
    delete pkgJson.scripts[`start:${tools[0]}`]
    delete pkgJson.scripts[`build:${tools[0]}`]
    delete pkgJson.scripts[`prod:${tools[0]}`]
    const devDependencies = pkgJson.devDependencies
    if (!tools.includes('webpack')) {
      delete devDependencies['ssr-webpack']
    }
    if (!tools.includes('rspack')) {
      delete devDependencies['ssr-rspack']
    }
    if (!tools.includes('vite')) {
      delete devDependencies['ssr-vite']
    }

    pkgJson.devDependencies = devDependencies
    await promises.writeFile(join(cwd, `./${targetDir}/package.json`), JSON.stringify(pkgJson, null, 2))
  }

  logGreen(`${template} has created succeed `)

  console.log(`  cd ${targetDir}`)
  console.log('  yarn install (or `npm install`)')
  console.log('  yarn start (or `npm start`)')
  console.log()
}

export {
  init
}
