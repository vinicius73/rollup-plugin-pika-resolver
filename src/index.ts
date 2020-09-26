/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Plugin } from 'rollup'
import { getVersion, detectVersion } from './version'

const SKYPACK_CDN_HOST = 'https://cdn.skypack.dev'

function skypackResolver ({ modules, cdnHost = SKYPACK_CDN_HOST }: { modules: string[], cdnHost?: string }) {
  const cache = new Map<string, string>()

  return {
    name: 'skypack-resolver',
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

export { skypackResolver, detectVersion }
export default skypackResolver
