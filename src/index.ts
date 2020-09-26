/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Plugin } from 'rollup'
import { getVersion, detectVersion } from './version'

const PIKA_CDN_HOST = 'https://cdn.skypack.dev'

function pikaResolver ({ modules, cdnHost = PIKA_CDN_HOST }: { modules: string[], cdnHost?: string }) {
  const cache = new Map<string, string>()

  return {
    name: 'pika-resolver',
    async resolveId (id: string) {
      if (modules.includes(id)) {
        const version = await getVersion(this, cache, id)

        return {
          id: `${cdnHost}/${version}`,
          external: true
        }
      }
    }
  } as Plugin
}

export { pikaResolver, detectVersion }
export default pikaResolver
