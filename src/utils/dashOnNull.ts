export const dashOnNull = (value: string | number) => {
  return value == null || value == undefined || value === ""  ? "-" : value
}