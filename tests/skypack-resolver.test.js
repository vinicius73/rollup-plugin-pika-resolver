/* eslint-disable @typescript-eslint/no-var-requires */
const { skypackResolver } = require('../src/index')

jest.mock('package-x')

test('skypackResolver', async () => {
  const resolver = skypackResolver({ modules: ['package-x'] })

  expect(
    await resolver.resolveId('package-x')
  ).toEqual({
    id: 'https://cdn.skypack.dev/package-x@1.x.x',
    external: true
  })

  expect(
    await resolver.resolveId('package-y')
  ).toEqual(undefined)
})

test('skypackResolver (custom cdn)', async () => {
  const resolver = skypackResolver({ modules: ['package-x'], cdnHost: 'https://my.cdn' })

  expect(
    await resolver.resolveId('package-x')
  ).toEqual({
    id: 'https://my.cdn/package-x@1.x.x',
    external: true
  })

  expect(
    await resolver.resolveId('package-y')
  ).toEqual(undefined)
})
