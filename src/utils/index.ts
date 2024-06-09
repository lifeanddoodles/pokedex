export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const getValueFromPath = (path: string, resource: any) => {
  let currentStepValue = resource
  if (path) {
    const splitPath = path.split(".")
    for (let i = 0; i < splitPath.length; i++) {
      currentStepValue = currentStepValue[splitPath[i]]
    }
  }
  return capitalize(currentStepValue.toString().replace(/[-_]/, " "))
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
