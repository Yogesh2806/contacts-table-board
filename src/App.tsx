import { AppShell } from './components/AppShell'
import { StoreProvider } from './state/store'

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  )
}
