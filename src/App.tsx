import { useEffect, useCallback } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { ethers } from 'ethers'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { loadGapi } from './utils/gapi'

import { save } from './features/auth/authSlice'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Statistics from './pages/Statistics'

function App() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth)

  const requestAccount = useCallback(async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      const accounts = await provider.listAccounts()
      if (accounts.length > 0) {
        const signer = provider.getSigner()
        signer.getAddress().then((address) => {
          dispatch(save({ address }))
        })
      }
    } else {
      console.error('Please install Metamask.')
    }
  }, [dispatch])

  // TODO: add connect wallet modal instead of automatic connect request
  useEffect(() => {
    loadGapi()
    requestAccount()
  }, [requestAccount])

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={user.isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/statistics"
            element={user.isLoggedIn ? <Statistics /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
