import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Users, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { HEALTH_VAULT_ADDRESS, HEALTH_VAULT_ABI } from '../config/contract'

export default function AccessRequests() {
  const { address, isConnected } = useAccount()
  const [requests, setRequests] = useState([])

  // Read pending access requests
  const { data: requestIds, refetch } = useReadContract({
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
      refetch()
    }
  }, [grantSuccess, refetch])

  useEffect(() => {
    const fetchRequestDetails = async () => {
      if (requestIds && requestIds.length > 0) {
        // In a real app, you'd fetch details for each request
        // For now, we'll create mock data
        const mockRequests = requestIds.map((id, index) => ({
          id,
          requester: `0x${Math.random().toString(16).substr(2, 40)}`,
          doctorName: `Dr. ${['Smith', 'Jones', 'Williams', 'Brown'][index % 4]}`,
          timestamp: Date.now() - Math.random() * 86400000,
          isPending: true
        }))
        setRequests(mockRequests)
      } else {
        setRequests([])
      }
    }

    fetchRequestDetails()
  }, [requestIds])

  const handleGrantAccess = (requestId, duration) => {
    let expiryTime = 0
    
    if (duration === '24h') {
      expiryTime = Math.floor(Date.now() / 1000) + 86400
    } else if (duration === '7d') {
      expiryTime = Math.floor(Date.now() / 1000) + 604800
    } else if (duration === '30d') {
      expiryTime = Math.floor(Date.now() / 1000) + 2592000
    }

    try {
      grantAccess({
        address: HEALTH_VAULT_ADDRESS,
        abi: HEALTH_VAULT_ABI,
        functionName: 'grantAccess',
        args: [requestId, expiryTime]
      })
    } catch (error) {
      console.error(error)
      toast.error('Failed to grant access')
    }
  }

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center">
          <AlertCircle className="h-16 w-16 text-ubuntu-orange mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600">Please connect your wallet to view access requests</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Requests</h1>
        <p className="text-gray-600">Manage doctor access to your medical records</p>
      </div>

      {/* Pending Requests */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Users className="h-6 w-6 mr-2 text-ubuntu-orange" />
          Pending Requests ({requests.length})
        </h3>

        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {request.doctorName}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Wallet: {request.requester.substring(0, 10)}...{request.requester.substring(request.requester.length - 8)}
                    </p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(request.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                    Pending
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Grant access for:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                      onClick={() => handleGrantAccess(request.id, '24h')}
                      className="btn-secondary text-sm py-2"
                      disabled={isGranting}
                    >
                      24 Hours
                    </button>
                    <button
                      onClick={() => handleGrantAccess(request.id, '7d')}
                      className="btn-secondary text-sm py-2"
                      disabled={isGranting}
                    >
                      7 Days
                    </button>
                    <button
                      onClick={() => handleGrantAccess(request.id, '30d')}
                      className="btn-secondary text-sm py-2"
                      disabled={isGranting}
                    >
                      30 Days
                    </button>
                    <button
                      onClick={() => handleGrantAccess(request.id, 'permanent')}
                      className="btn-primary text-sm py-2"
                      disabled={isGranting}
                    >
                      Permanent
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No pending access requests</p>
            <p className="text-gray-500 text-sm mt-2">
              When doctors request access to your records, they will appear here
            </p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">💡 USSD Access</h4>
        <p className="text-sm text-blue-800">
          You can also manage access requests via USSD by dialing <strong>*134*HEALTH#</strong> from your registered phone number.
          You'll receive SMS notifications when doctors request access.
        </p>
      </div>
    </div>
  )
}

