import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ethers } from 'ethers'
import { save } from './features/auth/authSlice'
import { useAppDispatch } from './app/hooks'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Statistics from './pages/Statistics'

function App() {
  const dispatch = useAppDispatch()

  const requestAccount = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      signer.getAddress().then((address) => {
        dispatch(save({ address }))
      })
    } else {
      console.error('Please install Metamask.')
    }
  }

  // TODO: add connect wallet modal instead of automatic connect request
  useEffect(() => {
    requestAccount()
  }, [])

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
