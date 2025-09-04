import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addApplication, importApplications } from '../store/jobApplicationsSlice'

const AddJob = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    status: 'Applied',
    notes: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.companyName && formData.jobTitle) {
      dispatch(addApplication(formData))
      navigate('/')
    }
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/json') {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result)
          if (Array.isArray(data)) {
            dispatch(importApplications(data))
            alert('Applications imported successfully!')
            navigate('/')
          } else {
            alert('Invalid file format. Please select a valid JSON file.')
          }
        } catch {
          alert('Error reading file. Please select a valid JSON file.')
        }
      }
      reader.readAsText(file)
    } else {
      alert('Please select a JSON file.')
    }
    e.target.value = ''
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Job Application</h1>
          <p className="text-gray-600">Fill in the details for your new job application</p>
        </div>
        <div className="flex space-x-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="btn-secondary flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            <span>Import Applications</span>
          </button>
        </div>
      </div>

      <div className="bg-white card-shadow rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-3">
                Company Name *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="e.g. Google, Microsoft, Apple"
              />
            </div>

            <div>
              <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700 mb-3">
                Job Title *
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="e.g. Frontend Developer, Software Engineer"
              />
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-3">
              Application Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input-field w-full"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-3">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="5"
              className="input-field w-full resize-none"
              placeholder="Add any notes about this application, interview details, requirements, etc..."
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Add Application
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddJob