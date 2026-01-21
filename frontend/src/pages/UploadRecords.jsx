import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { HEALTH_VAULT_ADDRESS, HEALTH_VAULT_ABI } from '../config/contract'
import axios from 'axios'

export default function UploadRecords() {
  const { address, isConnected } = useAccount()
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [ipfsHash, setIpfsHash] = useState(null)

  // Add record to blockchain
  const { writeContract: addRecord, data: addHash } = useWriteContract()
  
  const { isLoading: isAdding, isSuccess: addSuccess } = useWaitForTransactionReceipt({
    hash: addHash,
  })

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      // Validate file type (PDF, images, etc.)
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Please upload a PDF or image file')
        return
      }
      
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB')
        return
      }
      
      setFile(selectedFile)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    
    if (!file) {
      toast.error('Please select a file')
      return
    }

    setUploading(true)

    try {
      // Upload to backend (which encrypts and stores on IPFS)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('patientAddress', address)

      const response = await axios.post('/api/records/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const hash = response.data.ipfsHash
      setIpfsHash(hash)
      
      toast.success('File uploaded to IPFS! Now adding to blockchain...')

      // Add record to blockchain
      addRecord({
        address: HEALTH_VAULT_ADDRESS,
        abi: HEALTH_VAULT_ABI,
        functionName: 'addRecord',
        args: [hash]
      })

    } catch (error) {
      console.error(error)
      toast.error('Failed to upload file')
      setUploading(false)
    }
  }

  if (addSuccess) {
    setTimeout(() => {
      setFile(null)
      setIpfsHash(null)
      setUploading(false)
      toast.success('Medical record added successfully!')
    }, 2000)
  }

  if (!isConnected) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center">
          <AlertCircle className="h-16 w-16 text-ubuntu-orange mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600">Please connect your wallet to upload medical records</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Medical Records</h1>
        <p className="text-gray-600">Securely upload and encrypt your medical records</p>
      </div>

      {/* Upload Form */}
      <div className="card">
        <form onSubmit={handleUpload} className="space-y-6">
          {/* File Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-ubuntu-orange transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              {file ? (
                <div>
                  <p className="text-lg font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-sm text-ubuntu-orange hover:underline mt-2"
                  >
                    Change file
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </div>
              )}
            </label>
          </div>

          {/* Upload Status */}
          {ipfsHash && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                <div className="flex-1">
                  <p className="font-medium text-green-900">File uploaded to IPFS</p>
                  <p className="text-sm text-green-700 mt-1 break-all">
                    Hash: {ipfsHash}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={!file || uploading || isAdding}
          >
            {uploading || isAdding ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isAdding ? 'Adding to blockchain...' : 'Uploading...'}
              </span>
            ) : (
              'Upload Medical Record'
            )}
          </button>
        </form>

        {/* Info Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="font-semibold mb-3">How it works:</h3>
          <ol className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="font-semibold text-ubuntu-orange mr-2">1.</span>
              Your file is encrypted using AES-256 encryption
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-ubuntu-orange mr-2">2.</span>
              The encrypted file is uploaded to IPFS (decentralized storage)
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-ubuntu-orange mr-2">3.</span>
              The IPFS hash is stored on the Base Sepolia blockchain
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-ubuntu-orange mr-2">4.</span>
              Only you and authorized doctors can decrypt and view the file
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

