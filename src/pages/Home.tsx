import { Link } from 'react-router-dom'
import { ethers } from 'ethers'
import { SiweMessage } from 'siwe'
import { useAppSelector } from '../app/hooks'

const Home = () => {
  const user = useAppSelector((state) => state.auth)

  const createSiweMessage = async (address: string, statement: string) => {
    const domain = '0.0.0.0'
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
    signer.getAddress().then((address) => {
      createSiweMessage(address, 'Sign in with Ethereum to the app.').then(
        (message) => signer.signMessage(message)
      )
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
