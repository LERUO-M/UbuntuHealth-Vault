import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Search, UserPlus, FileText, CheckCircle, XCircle, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import { HEALTH_VAULT_ADDRESS, HEALTH_VAULT_ABI } from '../config/contract'
import axios from 'axios'

export default function DoctorDashboard() {
  const { address, isConnected } = useAccount()
  const [patientAddress, setPatientAddress] = useState('')
  const [doctorName, setDoctorName] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [hasAccess, setHasAccess] = useState(false)

  // Request access contract write
  const { writeContract: requestAccess, data: requestHash } = useWriteContract()
  
  const { isLoading: isRequesting, isSuccess: requestSuccess } = useWaitForTransactionReceipt({
    hash: requestHash,
  })

  const handleRequestAccess = async (e) => {
    e.preventDefault()
    
    if (!patientAddress || !doctorName) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      // Send request via smart contract
      requestAccess({
        address: HEALTH_VAULT_ADDRESS,
        abi: HEALTH_VAULT_ABI,
        functionName: 'requestAccess',
        args: [patientAddress]
      })

      // Notify backend to send SMS
      await axios.post('/api/access/request', {
        doctorAddress: address,
        patientAddress,
        doctorName
      })

      toast.success('Access request sent! Patient will be notified via SMS.')
    } catch (error) {
      console.error(error)
      toast.error('Failed to request access')
    }
  }

  const handleCheckAccess = async () => {
    if (!patientAddress) {
      toast.error('Please enter patient address')
      return
    }

    try {
      const response = await axios.get('/api/access/check', {
        params: {
          patientAddress,
          doctorAddress: address
        }
      })

      setHasAccess(response.data.hasAccess)

      if (response.data.hasAccess) {
        // Fetch patient records
        const recordsResponse = await axios.get(`/api/records/${patientAddress}`)
        setSearchResults(recordsResponse.data.records)
        toast.success('Access granted! Viewing patient records.')
      } else {
        toast.error('No access to this patient\'s records')
        setSearchResults(null)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to check access')
    }
  }

  const handleDownloadRecord = async (ipfsHash) => {
    try {
      const response = await axios.get(`/api/records/download/${ipfsHash}`, {
        params: {
          requesterAddress: address,
          patientAddress
        },
        responseType: 'blob'
      })

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `medical-record-${ipfsHash.substring(0, 8)}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()

      toast.success('Record downloaded successfully')
    } catch (error) {
      console.error(error)
      toast.error('Failed to download record')
    }
  }

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Shield className="h-16 w-16 text-ubuntu-orange mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600">Please connect your wallet to access the doctor portal</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
        <p className="text-gray-600">Request and view patient medical records</p>
      </div>

      {/* Request Access Form */}
      <div className="card mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <UserPlus className="h-6 w-6 mr-2 text-ubuntu-orange" />
          Request Patient Access
        </h3>
        <form onSubmit={handleRequestAccess} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Dr. John Smith"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient Wallet Address
            </label>
            <input
              type="text"
              placeholder="0x..."
              value={patientAddress}
              onChange={(e) => setPatientAddress(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn-primary w-full"
            disabled={isRequesting}
          >
            {isRequesting ? 'Requesting...' : 'Request Access'}
          </button>
        </form>
      </div>

      {/* Search Patient Records */}
      <div className="card mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Search className="h-6 w-6 mr-2 text-ubuntu-orange" />
          View Patient Records
        </h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter patient wallet address"
            value={patientAddress}
            onChange={(e) => setPatientAddress(e.target.value)}
            className="input-field flex-1"
          />
          <button onClick={handleCheckAccess} className="btn-primary">
            Search
          </button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults !== null && (
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Patient Medical Records</h3>
          {hasAccess ? (
            searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.filter(r => r.isActive).map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-ubuntu-orange" />
                      <div>
                        <p className="font-medium">Medical Record #{record.index + 1}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(record.timestamp * 1000).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadRecord(record.ipfsHash)}
                      className="btn-secondary text-sm py-1 px-4"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No medical records found for this patient</p>
            )
          ) : (
            <div className="text-center py-8">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-gray-600">You don't have access to this patient's records</p>
              <p className="text-sm text-gray-500 mt-2">Request access above and wait for patient approval</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

