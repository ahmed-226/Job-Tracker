import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  applications: JSON.parse(localStorage.getItem('jobApplications')) || []
}

const jobApplicationsSlice = createSlice({
  name: 'jobApplications',
  initialState,
  reducers: {
    addApplication: (state, action) => {
      const newApplication = {
        id: Date.now().toString(),
        ...action.payload,
        appliedDate: new Date().toISOString().split('T')[0]
      }
      state.applications.push(newApplication)
      localStorage.setItem('jobApplications', JSON.stringify(state.applications))
    },
    updateApplication: (state, action) => {
      const { id, ...updatedData } = action.payload
      const index = state.applications.findIndex(app => app.id === id)
      if (index !== -1) {
        state.applications[index] = { ...state.applications[index], ...updatedData }
        localStorage.setItem('jobApplications', JSON.stringify(state.applications))
      }
    },
    deleteApplication: (state, action) => {
      state.applications = state.applications.filter(app => app.id !== action.payload)
      localStorage.setItem('jobApplications', JSON.stringify(state.applications))
    },
    importApplications: (state, action) => {
      state.applications = action.payload
      localStorage.setItem('jobApplications', JSON.stringify(state.applications))
    },
    exportApplications: (state) => {
      const dataStr = JSON.stringify(state.applications, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      const exportFileDefaultName = `job-applications-${new Date().toISOString().split('T')[0]}.json`
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
    }
  }
})

export const { 
  addApplication, 
  updateApplication, 
  deleteApplication, 
  importApplications, 
  exportApplications 
} = jobApplicationsSlice.actions

export default jobApplicationsSlice.reducer
