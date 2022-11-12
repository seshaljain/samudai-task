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
          <div className="w-full max-w-full my-4 overflow-x-auto">
            <table className="w-full overflow-x-auto">
              <thead className="font-bold bg-gray-200">
                <tr className="text-left">
                  <th className="p-2">Transaction Hash</th>
                  <th className="p-2">Value</th>
                  <th className="p-2">Block Number</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 4).map((t) => (
                  <tr key={t.hash}>
                    <td className="p-2 overflow-auto break-all text-ellipses">
                      <a
                        href={`https://goerli.etherscan.io/tx/${t.hash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400"
                      >
                        {t.hash}
                      </a>
                    </td>
                    <td className="p-2 overflow-auto break-all text-ellipses">
                      {ethers.utils.formatEther(t.value)}{' '}
                      {ethers.constants.EtherSymbol}
                    </td>
                    <td className="p-2">{t.blockNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
