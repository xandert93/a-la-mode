import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { uiSlice } from '../features/ui/state/ui-slice'

const store = (set, get) => ({
  ...uiSlice(set, get),
})

export const useSelector = create(devtools(store))
