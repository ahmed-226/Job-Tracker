import { useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'

const JobDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const application = useSelector(state => 
    state.jobApplications.applications.find(app => app.id === id)
  )

  if (!application) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Not Found</h2>
        <p className="text-gray-600 mb-4">The job application you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Back to Dashboard
        </Link>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800'
      case 'Interviewing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Offer':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Application Details</h1>
        <div className="flex space-x-4">
          <Link
            to={`/edit/${application.id}`}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Edit Application
          </Link>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {application.jobTitle} at {application.companyName}
            </h2>
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(application.status)}`}>
              {application.status}
            </span>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Application Information</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Company Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{application.companyName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Job Title</dt>
                  <dd className="mt-1 text-sm text-gray-900">{application.jobTitle}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Application Status</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Applied Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(application.appliedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-2">Notes</dt>
                <dd className="text-sm text-gray-900">
                  {application.notes ? (
                    <div className="bg-gray-50 p-4 rounded-md">
                      {application.notes.split('\n').map((line, index) => (
                        <p key={index} className="mb-2 last:mb-0">{line}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No notes available</p>
                  )}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Application ID: {application.id}
            </p>
            <div className="flex space-x-4">
              <Link
                to={`/edit/${application.id}`}
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                Edit Application
              </Link>
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetails
