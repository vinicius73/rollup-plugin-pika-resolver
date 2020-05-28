/* eslint-disable @typescript-eslint/no-var-requires */
const { detectVersion, getVersion } = require('../src/version')

jest.mock('package-x')
jest.mock('package-z')

test('detectVersion', async () => {
  expect(
    await detectVersion('package-x')
  ).toBe('1.x.x')
})

test('getVersion', async () => {
  const context = {
    warn: jest.fn()
  }

  let cache = {
    has: jest.fn(() => false),
    set: jest.fn()
  }

  expect(
    await getVersion(context, cache, 'package-x')
  )
    .toBe('package-x@1.x.x')

  expect(cache.has).toHaveBeenCalled()
  expect(cache.set).toHaveBeenCalledWith('package-x', 'package-x@1.x.x')
  expect(context.warn).toHaveBeenCalledTimes(0)

  cache = {
    has: jest.fn(() => true),
    get: jest.fn(() => 'foo'),
    set: jest.fn()
  }

  expect(
    await getVersion(context, cache, 'package-y')
  )
    .toBe('foo')

  expect(cache.has).toHaveBeenCalled()
  expect(cache.set).toHaveBeenCalledTimes(0)
  expect(context.warn).toHaveBeenCalledTimes(0)

  cache = {
    has: jest.fn(() => false),
    set: jest.fn()
  }

  expect(
    await getVersion(context, cache, 'package-z')
  )
    .toBe(undefined)

  expect(cache.has).toHaveBeenCalled()
  expect(cache.set).toHaveBeenCalledWith('package-z', undefined)
  expect(context.warn).toHaveBeenCalledTimes(1)
})
