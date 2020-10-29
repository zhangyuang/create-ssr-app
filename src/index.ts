#!/usr/bin/env node

import { init } from './init'

init().catch((e) => {
  console.error(e)
})
