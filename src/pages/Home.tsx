import React from 'react'

function Home() {
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
          <button className="px-6 py-4 mt-8 text-xl text-white transition bg-black rounded-full shadow-sm hover:shadow-lg">
            Sign in with Ethereum
          </button>
        </div>
      </div>
    </main>
  )
}

export default Home
