export const debounce = (fn, delay) => {
  let timeoutId

  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(fn, delay, ...args)
  }
}

export const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000))

export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const genRandomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
