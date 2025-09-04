# Job Application Tracker

A full-featured, responsive web application built with React, Vite, Redux Toolkit, and Tailwind CSS that allows users to track their job applications.

## Features

### Core Functionality
- **Dashboard**: Display a list of saved job applications with company name, job title, application status, and applied date
- **Add Job Page**: Form for entering new job applications with fields for:
  - Company name
  - Job title
  - Status (Applied, Interviewing, Offer, Rejected)
  - Application date (auto-generated)
  - Notes
- **Job Details Page**: View full details of any job application including the ability to edit or delete
- **Edit Job Page**: Update existing job applications

### Additional Features
- **Statistics Dashboard**: Visual overview of application counts by status
- **Export/Import**: Download job applications as JSON file and import from JSON file
- **Responsive Design**: Optimized for both mobile and desktop views
- **Local Storage**: All data is stored locally in the browser
- **React Router**: Navigation between pages
- **Redux State Management**: Global state management for applications

### Technologies Used
- **React 19**: Frontend framework
- **Vite**: Build tool and development server
- **Redux Toolkit**: State management
- **React Router**: Client-side routing
- **Tailwind CSS**: Styling and responsive design
- **LocalStorage**: Data persistence

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd task_8
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

### Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Adding a Job Application
1. Click "Add Job" in the navigation or "Add New Application" button
2. Fill in the required fields (Company Name and Job Title)
3. Select the application status
4. Add any relevant notes
5. Click "Add Application"

### Viewing Job Details
1. From the dashboard, click "View" next to any application
2. See all details including notes and application information
3. Use "Edit Application" to modify the entry

### Editing Applications
1. Click "Edit" from the dashboard or "Edit Application" from the details page
2. Modify any fields as needed
3. Click "Update Application" to save changes

### Exporting/Importing Data
- **Export**: Click "Export Applications" from the dashboard to download a JSON file
- **Import**: Click "Import Applications" from the Add Job page and select a JSON file

### Data Persistence
All data is automatically saved to your browser's local storage. Your job applications will persist between browser sessions.

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx          # Main layout with navigation
│   ├── Dashboard.jsx       # Main dashboard with application list
│   ├── AddJob.jsx         # Add new job application form
│   ├── JobDetails.jsx     # View job application details
│   └── EditJob.jsx        # Edit job application form
├── store/
│   ├── store.js           # Redux store configuration
│   └── jobApplicationsSlice.js  # Redux slice for job applications
├── App.jsx                # Main app component with routing
├── main.jsx              # React app entry point
└── index.css             # Tailwind CSS imports
```

## Status Options

The application supports four status types:
- **Applied**: Initial application submitted
- **Interviewing**: In the interview process
- **Offer**: Received a job offer
- **Rejected**: Application was rejected

## Browser Compatibility

This application works in all modern browsers that support:
- ES6+ features
- CSS Grid and Flexbox
- Local Storage API

## Future Enhancements

Potential features for future versions:
- Search and filter functionality
- Sort applications by different criteria
- Application deadline tracking
- Interview scheduling
- Document attachments
- Application analytics and insights

## License

This project is for educational purposes.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
