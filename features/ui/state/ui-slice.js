export const uiSlice = (set, get) => ({
  // isDarkMode: initialiseIsDarkMode(),
  isDarkMode: false,

  toggleDarkMode: () => {
    set((state) => {
      const isDarkMode = !state.isDarkMode
      localStorage.setItem('isDarkMode', isDarkMode)
      return { isDarkMode }
    })
  },
})

/*

`localStorage` exists on `window`. With CSR, we were able to access LS globally since code was running in browser
now, though, all components render (execute + return) on server first and then hydrate + render again on client
when rendering on server, `window` doesn't exist
thus, attempting to use `localStorage` will produce a ReferenceError.
Used the code below to get it to work, but was 🐞. Try again to see ❗

const isServer = typeof window === 'undefined'

const initialiseIsDarkMode = () => {
  if (isServer) return false
  else {
    const initialIsDarkMode = localStorage.getItem('isDarkMode')
    return Boolean(JSON.parse(initialIsDarkMode))
  }
}


*/
