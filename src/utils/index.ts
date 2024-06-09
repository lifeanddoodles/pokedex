import { type PokemonDetailsData } from "../features/currentPokemon/currentPokemonSlice"

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formatLabel = (label: string) =>
  label.replace(" ", "-").toLowerCase()

export const removeDashes = (label: string) => label.replace(/[-_]/, " ")

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
