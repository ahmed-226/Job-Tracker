import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import AddJob from './components/AddJob'
import JobDetails from './components/JobDetails'
import EditJob from './components/EditJob'

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddJob />} />
              <Route path="/details/:id" element={<JobDetails />} />
              <Route path="/edit/:id" element={<EditJob />} />
            </Routes>
          </Layout>
        </Router>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
