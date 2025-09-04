import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteApplication, exportApplications } from '../store/jobApplicationsSlice'
import SearchAndFilter from './SearchAndFilter'

const Dashboard = () => {
    const applications = useSelector(state => state.jobApplications.applications)
    const [filteredApplications, setFilteredApplications] = useState(applications)
    const dispatch = useDispatch()

    useState(() => {
        setFilteredApplications(applications)
    }, [applications])

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            dispatch(deleteApplication(id))
        }
    }

    const handleExport = () => {
        dispatch(exportApplications())
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Applied':
                return 'bg-blue-100 text-blue-700 border border-blue-200'
            case 'Interviewing':
                return 'bg-yellow-100 text-yellow-700 border border-yellow-200'
            case 'Offer':
                return 'bg-green-100 text-green-700 border border-green-200'
            case 'Rejected':
                return 'bg-red-100 text-red-700 border border-red-200'
            default:
                return 'bg-gray-100 text-gray-700 border border-gray-200'
        }
    }

    const getStatusCounts = () => {
        const counts = {
            Applied: 0,
            Interviewing: 0,
            Offer: 0,
            Rejected: 0
        }
        applications.forEach(app => {
            counts[app.status]++
        })
        return counts
    }

    const statusCounts = getStatusCounts()

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Application Dashboard</h1>
                    <p className="text-gray-600">Track and manage your job applications</p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={handleExport}
                        className="btn-secondary flex items-center space-x-2"
                        disabled={applications.length === 0}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Export Applications</span>
                    </button>
                    <Link
                        to="/add"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-200 flex items-center space-x-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add New Application</span>
                    </Link>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="stats-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-bold text-blue-600">{statusCounts.Applied}</div>
                            <div className="text-gray-600 font-medium">Applied</div>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-bold text-yellow-600">{statusCounts.Interviewing}</div>
                            <div className="text-gray-600 font-medium">Interviewing</div>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-bold text-green-600">{statusCounts.Offer}</div>
                            <div className="text-gray-600 font-medium">Offers</div>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-bold text-red-600">{statusCounts.Rejected}</div>
                            <div className="text-gray-600 font-medium">Rejected</div>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Component */}
            {applications.length > 0 && (
                <SearchAndFilter
                    applications={applications}
                    onFilteredResults={setFilteredApplications}
                />
            )}

            {applications.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No job applications yet</h3>
                    <p className="text-gray-600 mb-6">Start tracking your job applications by adding your first one</p>
                    <Link
                        to="/add"
                        className="btn-primary inline-flex items-center space-x-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add Your First Application</span>
                    </Link>
                </div>
            ) : filteredApplications.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
                </div>
            ) : (
                <div className="bg-white card-shadow rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Company
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Job Title
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Applied Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredApplications.map((application, index) => (
                                    <tr key={application.id} className={`hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-900">
                                                {application.companyName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-800 font-medium">{application.jobTitle}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`status-badge ${getStatusColor(application.status)}`}>
                                                {application.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                                            {new Date(application.appliedDate).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-3">
                                                <Link
                                                    to={`/details/${application.id}`}
                                                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    to={`/edit/${application.id}`}
                                                    className="text-green-600 hover:text-green-800 font-semibold transition-colors duration-200"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(application.id)}
                                                    className="text-red-600 hover:text-red-800 font-semibold transition-colors duration-200"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Results Summary */}
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Showing {filteredApplications.length} of {applications.length} applications
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard