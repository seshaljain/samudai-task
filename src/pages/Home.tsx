import { Link } from 'react-router-dom'
import { ethers } from 'ethers'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../app/store'
import { save } from '../features/auth/authSlice'

const Home = () => {
  const user = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const requestAccount = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      dispatch(
        save({
          address,
        })
      )
    } else {
      alert('Please install MetaMask')
    }
  }

  return (
    <main
      className="h-screen"
      style={{
        background: `linear-gradient(to bottom, #FFFFFF, #D8D8D8)`,
      }}
    >
      <div className="container grid items-center h-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="flex-1 text-5xl font-light text-center">Samudai</h1>
          {!user.isLoggedIn ? (
            <button
              onClick={requestAccount}
              className="inline-block px-6 py-4 mt-8 text-xl text-white transition bg-black rounded-full shadow-sm hover:shadow-lg"
            >
              Sign in with Ethereum
            </button>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="inline-block px-6 py-4 mt-8 text-xl text-white transition bg-black rounded-full shadow-sm hover:shadow-lg"
              >
                Launch Dashboard
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default Home
