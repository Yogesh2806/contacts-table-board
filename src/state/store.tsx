import { createContext, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from 'react'
import { INITIAL_CONTACTS } from '../data/contacts'
import type { Contact } from '../types'
import { createInitialState, reducer, type Action, type State } from './reducer'

interface Store {
  state: State
  dispatch: Dispatch<Action>
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children, contacts = INITIAL_CONTACTS }: { children: ReactNode; contacts?: Contact[] }) {
  const [state, dispatch] = useReducer(reducer, contacts, createInitialState)
  const value = useMemo(() => ({ state, dispatch }), [state])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore must be used inside <StoreProvider>')
  return store
}
