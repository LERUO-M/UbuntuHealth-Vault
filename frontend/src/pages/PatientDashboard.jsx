import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Link } from 'react-router-dom'
import { Upload, FileText, Users, Smartphone, Shield, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { HEALTH_VAULT_ADDRESS, HEALTH_VAULT_ABI } from '../config/contract'
import axios from 'axios'

export default function PatientDashboard() {
  const { address, isConnected } = useAccount()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneRegistered, setPhoneRegistered] = useState(false)
  const [pendingRequests, setPendingRequests] = useState([])

  // Read patient records
  const { data: records, refetch: refetchRecords } = useReadContract({
    address: HEALTH_VAULT_ADDRESS,
    abi: HEALTH_VAULT_ABI,
    functionName: 'getPatientRecords',
    args: [address],
    enabled: isConnected
  })

  // Read pending access requests
  const { data: requestIds } = useReadContract({
    address: HEALTH_VAULT_ADDRESS,
    abi: HEALTH_VAULT_ABI,
    functionName: 'getPendingRequests',
    args: [address],
    enabled: isConnected
  })

  // Grant access contract write
  const { writeContract: grantAccess, data: grantHash } = useWriteContract()
  
  const { isLoading: isGranting, isSuccess: grantSuccess } = useWaitForTransactionReceipt({
    hash: grantHash,
  })

  useEffect(() => {
    if (grantSuccess) {
      toast.success('Access granted successfully!')
      refetchRecords()
    }
  }, [grantSuccess])

  const handleRegisterPhone = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/access/register-phone', {
        address,
        phoneNumber
      })
      setPhoneRegistered(true)
      toast.success('Phone number registered successfully!')
    } catch (error) {
      toast.error('Failed to register phone number')
    }
  }

  const handleGrantAccess = async (requestId, duration) => {
    const expiryTime = duration === 'permanent' ? 0 : Math.floor(Date.now() / 1000) + duration
    
    try {
      grantAccess({
        address: HEALTH_VAULT_ADDRESS,
        abi: HEALTH_VAULT_ABI,
        functionName: 'grantAccess',
        args: [requestId, expiryTime]
      })
    } catch (error) {
      toast.error('Failed to grant access')
    }
  }

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Shield className="h-16 w-16 text-ubuntu-orange mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600">Please connect your wallet to access the patient portal</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Dashboard</h1>
        <p className="text-gray-600">Manage your medical records and access permissions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Records</p>
              <p className="text-3xl font-bold text-ubuntu-orange">
                {records?.filter(r => r.isActive).length || 0}
              </p>
            </div>
            <FileText className="h-12 w-12 text-ubuntu-orange opacity-20" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-3xl font-bold text-ubuntu-orange">
                {requestIds?.length || 0}
              </p>
            </div>
            <Users className="h-12 w-12 text-ubuntu-orange opacity-20" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">USSD Access</p>
              <p className="text-lg font-semibold text-ubuntu-orange">
                {phoneRegistered ? 'Active' : 'Not Set'}
              </p>
            </div>
            <Smartphone className="h-12 w-12 text-ubuntu-orange opacity-20" />
          </div>
        </div>
      </div>

      {/* Phone Registration */}
      {!phoneRegistered && (
        <div className="card mb-8 bg-orange-50 border-orange-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Smartphone className="h-5 w-5 mr-2 text-ubuntu-orange" />
            Register Phone for USSD/SMS
          </h3>
          <form onSubmit={handleRegisterPhone} className="flex gap-4">
            <input
              type="tel"
              placeholder="+27XXXXXXXXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input-field flex-1"
              pattern="^\+27[0-9]{9}$"
              required
            />
            <button type="submit" className="btn-primary">
              Register
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-2">
            Dial *134*HEALTH# to manage access via USSD
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link to="/upload" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <Upload className="h-8 w-8 text-ubuntu-orange mb-3" />
          <h3 className="text-xl font-semibold mb-2">Upload Medical Records</h3>
          <p className="text-gray-600">Add new medical records to your vault</p>
        </Link>

        <Link to="/access-requests" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <Users className="h-8 w-8 text-ubuntu-orange mb-3" />
          <h3 className="text-xl font-semibold mb-2">Manage Access</h3>
          <p className="text-gray-600">View and manage doctor access requests</p>
        </Link>
      </div>

      {/* Recent Records */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Your Medical Records</h3>
        {records && records.length > 0 ? (
          <div className="space-y-3">
            {records.filter(r => r.isActive).map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-ubuntu-orange" />
                  <div>
                    <p className="font-medium">Medical Record #{index + 1}</p>
                    <p className="text-sm text-gray-600">
                      IPFS: {record.ipfsHash.substring(0, 20)}...
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(Number(record.timestamp) * 1000).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No medical records yet. Upload your first record!</p>
        )}
      </div>
    </div>
  )
}

