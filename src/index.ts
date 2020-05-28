/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import path from 'path'
import { Plugin, PluginContext } from 'rollup'
import findUp from 'find-up'

const PIKA_CDN_HOST = 'https://cdn.pika.dev'

const detectVersion = async (id: string): Promise<string | null> => {
  const cwd = path.dirname(require.resolve(id))
  const pkgFile = await findUp('package.json', { cwd })

  return pkgFile
    ? require(pkgFile).version
    : null
}

function pikaResolver ({ modules, cdnHost = PIKA_CDN_HOST }: { modules: string[], cdnHost: string }) {
  const cache = new Map<string, string>()

  const getVersion = async function (this: PluginContext, id: string): Promise<string | null> {
    if (cache.has(id)) {
      return cache.get(id) as string
    }

    const version = await detectVersion(id)

    if (!version) {
      this.warn(`Missing version of ${id}`)
      return id
    }

    return `${id}@${version}`
  }

  return {
    name: 'pika-resolver',
    async resolveId (id: string) {
      if (!modules.includes(id)) {
        return id
      }

      const version = await getVersion.call(this, id)

      return {
        id: `${cdnHost}/${version}`,
        external: true
      }
    }
  } as Plugin
}

export { pikaResolver }
export default pikaResolver
