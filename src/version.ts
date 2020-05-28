import path from 'path'
import findUp from 'find-up'
import { PluginContext } from 'rollup'

const detectVersion = async (id: string): Promise<string | null> => {
  const cwd = path.dirname(require.resolve(id))
  const pkgFile = await findUp('package.json', { cwd })

  return pkgFile
    ? require(pkgFile).version
    : null
}

const getVersion = async function (context: PluginContext, cache: Map<string, string | null>, moduleId: string): Promise<string | null> {
  if (cache.has(moduleId)) {
    return cache.get(moduleId) as string
  }

  const version = await detectVersion(moduleId)

  if (!version) {
    context.warn(`Missing version of ${moduleId}`)
  }

  const versionId = version
    ? `${moduleId}@${version}`
    : version

  cache.set(moduleId, versionId)

  return versionId
}

export { detectVersion, getVersion }
