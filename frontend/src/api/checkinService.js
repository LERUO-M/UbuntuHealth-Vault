/**
 * Check-in API Service - Frontend Client
 * Communicates with the backend API to send patient access requests
 */

/**
 * Sends a check-in request to the backend API
 * Initiates SMS sending to the patient's phone number
 * @param {Object} data - Check-in form data
 * @param {string} data.patientName - Patient's full name
 * @param {string} data.phoneNumber - Patient's phone number (any format)
 * @param {string} data.idNumber - Patient's ID number (optional)
 * @returns {Promise<Object>} - API response containing status and details
 * @throws {Error} - If the API request fails
 */
export const submitCheckIn = async (data) => {
  const response = await fetch("http://localhost:5000/api/checkin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to submit check-in")
  }

  return response.json()
}

