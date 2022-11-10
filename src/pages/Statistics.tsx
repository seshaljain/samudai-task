import Layout from '../components/Layout'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

function Statistics() {
  const [blockHeight, setBlockHeight] = useState(0)
  const [transactions, setTransactions] = useState(
    [] as ethers.providers.TransactionResponse[]
  )

  const loadData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    await provider.send('eth_requestAccounts', [])

    const signer = provider.getSigner()
    signer.getAddress().then((address) => {
      const etherscanProvider = new ethers.providers.EtherscanProvider(
        'goerli',
        process.env.REACT_APP_ETHERSCAN_KEY
      )

      etherscanProvider
        .getHistory(address)
        .then((transactions) => {
          setTransactions(transactions)
        })
        .catch((err) => console.error(err))

      etherscanProvider
        .getBlockNumber()
        .then((data) => {
          setBlockHeight(data)
        })
        .catch((err) => console.error(err))
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Layout title="Statistics">
      <article className="grid">
        <div className="justify-end">
          <h2 className="text-lg font-bold">Recent Transactions</h2>
          <p>Last 5 transactions</p>
          <div className="my-4 space-y-4">
            {transactions.slice(0, 4).map((t) => (
              <div key={t.hash}>
                <div>
                  <h4 className="text-sm font-bold uppercase">Txn Hash</h4>
                  <a
                    href={`https://goerli.etherscan.io/tx/${t.hash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.hash}
                  </a>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase">Value</h4>
                  {ethers.utils.formatEther(t.value)}{' '}
                  {ethers.constants.EtherSymbol}
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase">Block Number</h4>
                  {t.blockNumber}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="justify-self-end">
          <h2 className="text-lg font-bold">Latest Ethereum Block</h2>
          <a
            href={`https://etherscan.io/block/${blockHeight}`}
            target="_blank"
            rel="noreferrer"
          >
            {blockHeight}
          </a>
        </div>
      </article>
    </Layout>
  )
}

export default Statistics
