const formatDateHours = (dateToFormat: Date) => {
  let date = new Date(dateToFormat)
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hour = date.getHours();

  const lessThanTen = (val: number) => {
    return val >= 10 ? val + '' : '0' + val
  }

  return `${ lessThanTen(day) }/${ lessThanTen(month) }/${ year } ${lessThanTen(hour)}:${lessThanTen(minutes)}:${lessThanTen(seconds)}`
}

export default formatDateHours
