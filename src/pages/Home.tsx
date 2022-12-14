import { Link } from 'react-router-dom'
import { ethers } from 'ethers'
import { SiweMessage } from 'siwe'
import { useAppDispatch, useAppSelector } from '../app/hooks'

import { save } from '../features/auth/authSlice'

const Home = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth)

  const createSiweMessage = async (address: string, statement: string) => {
    const domain = process.env.REACT_APP_DOMAIN_ADDRESS || '0.0.0.0'
    const origin = window.location.origin
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: 3,
      nonce: 'aoeuhtns',
    })
    return message.prepareMessage()
  }

  const signInWithEthereum = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    await provider.send('eth_requestAccounts', [])

    const signer = provider.getSigner()
    signer.getAddress().then(async (address) => {
      await createSiweMessage(
        address,
        'Sign in with Ethereum to the app.'
      ).then((message) => signer.signMessage(message))

      dispatch(save({ address }))

      await fetch('https://dev-gcn.samudai.xyz/api/member/demo/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          walletAddress: address,
          chainId: 10,
          member: {
            did: 'aoeuhtns',
          },
        }),
      })
    })
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
              onClick={signInWithEthereum}
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
