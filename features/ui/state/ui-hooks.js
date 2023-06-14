import { useSelector } from '@/state' // *** uiSlice imported into @/state... surely now have a circular dependency?

export const useIsDarkMode = () => useSelector((state) => state.isDarkMode)
export const useToggleDarkMode = () => useSelector((state) => state.toggleDarkMode)
