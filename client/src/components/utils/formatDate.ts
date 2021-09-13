const formatDate = (dateToFormat: Date) => {
  let date = new Date(dateToFormat)
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  const lessThanTen = (val: number) => {
    return val >= 10 ? val + '' : '0' + val
  }

  return `${ lessThanTen(day) }/${ lessThanTen(month) }/${ year }`
}

export default formatDate
