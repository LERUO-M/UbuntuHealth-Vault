import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Shield, 
  UserPlus,
  Search,
  Send,
  Users,
  Clock,
  CheckCircle,
  ArrowLeft,
  User,
  Stethoscope,
  Loader2,
  AlertCircle
} from "lucide-react"
import { Link } from "react-router-dom"
import { submitCheckIn } from "@/api/checkinService"

/**
 * Initial mock data for patients waiting in the queue
 * Each patient has a unique ID, personal details, check-in time, status, and reason for visit
 */
const initialWaitingPatients = [
  {
    id: 1,
    name: "Thabo Molefe",
    idNumber: "8501015800083",
    checkInTime: "09:15",
    status: "awaiting_consent",
    reason: "General check-up"
  },
  {
    id: 2,
    name: "Nomzamo Dlamini",
    idNumber: "9203124800082",
    checkInTime: "09:30",
    status: "consent_granted",
    reason: "Follow-up"
  },
  {
    id: 3,
    name: "Sipho Ndlovu",
    idNumber: "7809085800087",
    checkInTime: "09:45",
    status: "with_doctor",
    doctor: "Dr. Mbeki",
    reason: "Lab results review"
  }
]

const availableDoctors = [
  { id: 1, name: "Dr. Thandiwe Mbeki", specialty: "General Practice", available: true, currentPatients: 1 },
  { id: 2, name: "Dr. John Smith", specialty: "Internal Medicine", available: true, currentPatients: 0 },
  { id: 3, name: "Dr. Priya Naidoo", specialty: "Pediatrics", available: false, currentPatients: 2 },
]

/**
 * Generates a status badge component based on patient's current status
 * @param {string} status - The patient's current status in the queue
 * @returns {JSX.Element | null} A styled badge component or null if status is unknown
 */
const getStatusBadge = (status) => {
  switch (status) {
    case "awaiting_consent":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-warning/20 text-warning rounded-full">
          <Clock className="w-3 h-3" />
          Awaiting Consent
        </span>
      )
    case "consent_granted":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-success/20 text-success rounded-full">
          <CheckCircle className="w-3 h-3" />
          Ready to Assign
        </span>
      )
    case "with_doctor":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
          <Stethoscope className="w-3 h-3" />
          With Doctor
        </span>
      )
    default:
      return null
  }
}

const AdminDashboard = () => {
  // Search query state for filtering patients
  const [searchQuery, setSearchQuery] = useState("")
  
  // Track which patient is currently selected in the queue
  const [selectedPatient, setSelectedPatient] = useState(null)
  
  // Dialog open/close state for New Check-In form
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // Loading state while submitting check-in request
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Dynamic patient queue state - starts with initial mock data
  const [waitingPatients, setWaitingPatients] = useState(initialWaitingPatients)
  const [completedPatients, setCompletedPatients] = useState([])
  
  // Form data for new check-in request
  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    idNumber: "",
  })

  // Check for completed patients from localStorage
  React.useEffect(() => {
    const checkCompletedPatients = () => {
      const completed = JSON.parse(localStorage.getItem('completedPatients') || '[]')
      if (completed.length > completedPatients.length) {
        const newCompleted = completed.slice(completedPatients.length)
        setCompletedPatients(completed)
        
        // Remove completed patients from waiting queue
        newCompleted.forEach((completedPatient) => {
          setWaitingPatients(prev => prev.filter(p => p.id !== completedPatient.id))
        })
      }
    }
    
    const interval = setInterval(checkCompletedPatients, 1000)
    return () => clearInterval(interval)
  }, [completedPatients.length])

  // Error message state for form validation
  const [errorMessage, setErrorMessage] = useState(null)

  /**
   * Handles input field changes in the check-in form
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /**
   * Submits the check-in request to the backend API
   * - Validates required fields (patient name and phone number)
   * - Calls backend API to send SMS access request via Africa's Talking
   * - Adds a new patient to the waiting queue with "awaiting_consent" status
   * - Resets the form and closes the dialog on success
   * - Displays error messages if validation or API call fails
   * @param {React.FormEvent} e - The form submission event
   */
  const handleSubmitCheckIn = async (e) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!formData.patientName || !formData.phoneNumber) {
      setErrorMessage("Please fill in patient name and phone number")
      return
    }

    setIsSubmitting(true)
    try {
      // Call backend API to send SMS and validate phone number
      const response = await submitCheckIn({
        patientName: formData.patientName,
        phoneNumber: formData.phoneNumber,
        idNumber: formData.idNumber || undefined,
      })

      if (!response.success) {
        setErrorMessage(response.error || "Failed to send access request")
        return
      }

      // Get current timestamp for check-in time
      const now = new Date()
      const checkInTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

      // Create new patient object with check-in details
      const newPatient = {
        id: Math.max(...waitingPatients.map(p => p.id), 0) + 1,
        name: formData.patientName,
        idNumber: formData.idNumber || "Not provided",
        checkInTime: checkInTime,
        status: "awaiting_consent",
        reason: "New check-in"
      }

      console.log("Check-in successful:", response)

      // Add new patient to the queue
      setWaitingPatients(prev => [newPatient, ...prev])

      // Reset form and close dialog
      setFormData({
        patientName: "",
        phoneNumber: "",
        idNumber: "",
      })
      setIsDialogOpen(false)

      // Show success message with formatted phone number
      alert(`Access request sent to ${formData.patientName} at ${response.phoneNumber}. Patient added to queue.`)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to send access request. Please check your backend server is running."
      setErrorMessage(errorMsg)
      console.error("Check-in error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 sm:py-0 sm:h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </Link>
              <div className="w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-warning flex items-center justify-center">
                  <Users className="w-4 h-4 text-secondary-foreground" />
                </div>
                <span className="font-display font-bold">Admin Portal</span>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-sm text-muted-foreground truncate">Soweto General Clinic</span>
              <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 mx-auto py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Patient Queue */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ID number..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="heroSecondary" className="shrink-0">
                    <UserPlus className="w-4 h-4" />
                    New Check-In
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>New Patient Check-In</DialogTitle>
                    <DialogDescription>
                      Enter patient details to send an access request via SMS
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmitCheckIn} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="patientName" className="text-sm font-medium">
                        Patient Name *
                      </label>
                      <Input
                        id="patientName"
                        name="patientName"
                        placeholder="Full name"
                        value={formData.patientName}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phoneNumber" className="text-sm font-medium">
                        Phone Number *
                      </label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="+27 XX XXX XXXX"
                        value={formData.phoneNumber}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="idNumber" className="text-sm font-medium">
                        ID Number (Optional)
                      </label>
                      <Input
                        id="idNumber"
                        name="idNumber"
                        placeholder="13 digits"
                        value={formData.idNumber}
                        onChange={handleFormChange}
                      />
                    </div>

                    {errorMessage && (
                      <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        <p className="text-sm text-destructive">{errorMessage}</p>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsDialogOpen(false)
                          setErrorMessage(null)
                          setFormData({ patientName: "", phoneNumber: "", idNumber: "" })
                        }}
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="hero"
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Request
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </motion.div>

            {/* Patient Queue */}
            <motion.div
              className="bg-card rounded-lg border border-border overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="p-4 border-b border-border">
                <h2 className="font-display font-semibold">Patient Queue</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {waitingPatients.length} patient{waitingPatients.length !== 1 ? 's' : ''} waiting
                </p>
              </div>
              <div className="divide-y divide-border">
                {waitingPatients
                  .filter(patient =>
                    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    patient.idNumber.includes(searchQuery)
                  )
                  .map((patient, index) => (
                    <motion.div
                      key={patient.id}
                      className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                        selectedPatient?.id === patient.id ? 'bg-muted/50' : ''
                      }`}
                      onClick={() => setSelectedPatient(patient)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium truncate">{patient.name}</h3>
                            {getStatusBadge(patient.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">ID: {patient.idNumber}</p>
                          <p className="text-sm text-muted-foreground mt-1">{patient.reason}</p>
                          {patient.doctor && (
                            <p className="text-sm text-primary mt-1 flex items-center gap-1">
                              <Stethoscope className="w-3 h-3" />
                              {patient.doctor}
                            </p>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-medium">{patient.checkInTime}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                {waitingPatients.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No patients in queue</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right column - Stats & Doctors */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              className="bg-card rounded-lg border border-border p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="font-display font-semibold mb-4">Today's Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-warning" />
                    </div>
                    <span className="text-sm">Waiting</span>
                  </div>
                  <span className="text-2xl font-bold">
                    {waitingPatients.filter(p => p.status === "awaiting_consent").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-sm">Ready</span>
                  </div>
                  <span className="text-2xl font-bold">
                    {waitingPatients.filter(p => p.status === "consent_granted").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Stethoscope className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">In Progress</span>
                  </div>
                  <span className="text-2xl font-bold">
                    {waitingPatients.filter(p => p.status === "with_doctor").length}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <Users className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-sm">Completed</span>
                  </div>
                  <span className="text-2xl font-bold">{completedPatients.length}</span>
                </div>
              </div>
            </motion.div>

            {/* Available Doctors */}
            <motion.div
              className="bg-card rounded-lg border border-border p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="font-display font-semibold mb-4">Available Doctors</h2>
              <div className="space-y-3">
                {availableDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`p-3 rounded-lg border ${
                      doctor.available
                        ? 'border-success/20 bg-success/5'
                        : 'border-border bg-muted/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{doctor.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{doctor.specialty}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        doctor.available ? 'bg-success' : 'bg-muted-foreground'
                      }`} />
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {doctor.currentPatients} patient{doctor.currentPatients !== 1 ? 's' : ''}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard

