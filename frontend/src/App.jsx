import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import PatientDashboard from './pages/PatientDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import UploadRecords from './pages/UploadRecords'
import AccessRequests from './pages/AccessRequests'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="patient" element={<PatientDashboard />} />
        <Route path="doctor" element={<DoctorDashboard />} />
        <Route path="upload" element={<UploadRecords />} />
        <Route path="access-requests" element={<AccessRequests />} />
      </Route>
    </Routes>
  )
}

export default App

