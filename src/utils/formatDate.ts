export const formatDate = (value: string) => {
  if (!/\d{4}-\d{2}-\d{2}/.test(value)) {
    return "-"
  }

  return value.split('-').reverse().join("/")
}