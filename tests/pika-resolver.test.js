/* eslint-disable @typescript-eslint/no-var-requires */
const { pikaResolver } = require('../src/index')

jest.mock('package-x')

test('pikaResolver', async () => {
  const resolver = pikaResolver({ modules: ['package-x'] })

  expect(
    await resolver.resolveId('package-x')
  ).toEqual({
    id: 'https://cdn.pika.dev/package-x@1.x.x',
    external: true
  })

  expect(
    await resolver.resolveId('package-y')
  ).toEqual(undefined)
})

test('pikaResolver (custom cdn)', async () => {
  const resolver = pikaResolver({ modules: ['package-x'], cdnHost: 'https://my.cdn' })

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
