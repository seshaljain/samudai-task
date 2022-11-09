import { Link } from 'react-router-dom'

const Layout = ({ children }: any) => {
  return (
    <>
      <main className="min-h-screen bg-green-50">
        <nav className="shadow-lg bg-green-400/50">
          <div className="flex items-center justify-between max-w-6xl px-4 py-6 mx-auto">
            <div className="text-2xl font-semibold text-center text-green-900 uppercase">
              Samudai
            </div>
            <ul className="flex items-center space-x-2 font-semibold text-center text-green-900 uppercase">
              <li>
                <Link
                  className="inline-block p-2 transition rounded-md hover:bg-green-300"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="inline-block p-2 transition rounded-md hover:bg-green-300"
                  to="/statistics"
                >
                  Statistics
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="max-w-6xl p-4 mx-auto mt-6 bg-white rounded shadow">
          {children}
        </div>
      </main>
    </>
  )
}

export default Layout
