export default function getSortingFunction(key, value) {
  if (typeof value === 'number') {
    return (a, b) => {
      return a[key] - b[key]
    }
  }

  const dateRegExp = /\d{1,2}\/\d{1,2}\/\d{1,2}/

  if (dateRegExp.test(value)) {
    return (a, b) => {
      return Date.parse(a[key]) - Date.parse(b[key])
    }
  }
}
