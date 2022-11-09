import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Statistics from './pages/Statistics'

function App() {
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
