import { configureStore } from '@reduxjs/toolkit'
import jobApplicationsReducer from './jobApplicationsSlice'

export const store = configureStore({
  reducer: {
    jobApplications: jobApplicationsReducer
  }
})
