import { existsSync } from 'fs'
import { resolve } from 'path'
import * as Shell from 'shelljs'
import { init } from '../src/init'

const testPath = resolve(process.cwd(), './temporary')

// jest.mock('process', () => {
//   return {
//     argv: ['node', 'index.js', '.', '--template=serverless-spa'],
//     cwd: () => testPath
//   }
// })

process.cwd = () => testPath // 这里不使用 jest.mock 因为 jest.mock 无法在第三方模块如 dclone 中生效

describe('test create', () => {
  beforeAll(() => {
    Shell.mv('./.git', './.git_backup') // 备份 .git 防止 dclone 误删
  })
  beforeEach(() => {
    Shell.mkdir(testPath)
  })
  test('serverless-spa program can be init', async () => {
    process.argv = ['node', 'index.js', '.']
    await init()
    expect(existsSync(resolve(testPath, './spa/f.yml')))
  }, 100000)
  test('serverless-spa program can be init', async () => {
    process.argv = ['node', 'index.js', '.', '--template=serverless-spa']
    await init()
    expect(existsSync(resolve(testPath, './spa/f.yml')))
  }, 100000)
  test('ssr-with-js program can be init', async () => {
    process.argv = ['node', 'index.js', '.', '--template=ssr-with-js']
    await init()
    expect(require(resolve(testPath, './ssr-with-js/package.json')).name === 'ssr-with-js')
  }, 100000)
  test('ssr-with-ts program can be init', async () => {
    process.argv = ['node', 'index.js', '.', '--template=ssr-with-ts']
    await init()
    expect(require(resolve(testPath, './ssr-with-js/package.json')).name === 'ssr-with-ts')
  }, 100000)
  test('ssr-with-dva program can be init', async () => {
    process.argv = ['node', 'index.js', '.', '--template=ssr-with-dva']
    await init()
    expect(require(resolve(testPath, './ssr-with-js/package.json')).name === 'ssr-with-dva')
  }, 100000)
  test('ssr-with-antd program can be init', async () => {
    process.argv = ['node', 'index.js', '.', '--template=ssr-with-antd']
    await init()
    expect(require(resolve(testPath, './ssr-with-js/package.json')).name === 'ssr-with-antd')
  }, 100000)
  afterEach(() => {
    Shell.rm('-rf', testPath)
  })
  afterAll(() => {
    Shell.mv('./.git_backup', './.git') // 恢复 .git
  })
})
