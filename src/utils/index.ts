import { type PokemonDetailsData } from "../features/currentPokemon/currentPokemonSlice"

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formatLabel = (label: string) =>
  label.replace(" ", "-").toLowerCase()

export const removeDashes = (label: string) => label.replace(/[-_]/, " ")

/**
 * Retrieves the value from a given path in a nested object.
 *
 * @param {string} path - The path to the desired value, separated by dots.
 * @param {any} resource - The nested object from which to retrieve the value.
 * @return {string} The value at the specified path, capitalized and with dashes and underscores removed.
 */
const getValueFromPath = (path: string, resource: any) => {
  let currentStepValue = resource
  if (path) {
    const splitPath = path.split(".")
    for (let i = 0; i < splitPath.length; i++) {
      currentStepValue = currentStepValue[splitPath[i]]
    }
  }
  return capitalize(removeDashes(currentStepValue.toString()))
}

/**
 * Retrieves the value from a given key in a resource object.
 *
 * @param {string} key - The key to retrieve the value from.
 * @param {any} resource - The resource object.
 * @param {string | string[]} [pathToValue] - The path to the desired value, separated by dots.
 * @return {any} The value at the specified key.
 */
export const getValue = (
  key: string,
  resource: any,
  pathToValue?: string | string[],
) => {
  if (!key || !resource) return
  if (Array.isArray(resource[key])) {
    return resource[key].map((item: any) => {
      if (Array.isArray(pathToValue)) {
        let currentStepTuple: string[] = []
        pathToValue.forEach((path: string, index: number) => {
          currentStepTuple[index] = getValueFromPath(path, item)
        })
        return currentStepTuple
      }
      return getValueFromPath(pathToValue as string, item)
    })
  }
  if (typeof resource[key] === "object") {
    return Object.entries(resource[key]).map(([key, value]: [string, any]) => ({
      label: key,
      value,
    }))
  }
  return resource[key] as string
}

/**
 * Formats the meta content based on the provided resource and labels.
 *
 * @param {PokemonDetailsData} resource - The PokemonDetailsData object.
 * @param {Array<{ label: string; pathToValue?: string }>} labels - The array of labels and their corresponding pathToValue.
 * @return {Array<{ label: string; value: any }>} The formatted meta content.
 */
export const formatMetaContent = (
  resource: PokemonDetailsData,
  labels: { label: string; pathToValue?: string }[],
) => {
  return labels.map(
    ({ label, pathToValue }: { label: string; pathToValue?: string }) => {
      const value = getValue(label, resource, pathToValue)
      return { label, value }
    },
  )
}
