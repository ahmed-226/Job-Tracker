import { useState } from 'react'

const SearchAndFilter = ({ applications, onFilteredResults }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [dateFilter, setDateFilter] = useState('All')

    const handleSearch = (term, status, date) => {
        let filtered = applications

        if (term) {
            filtered = filtered.filter(app =>
                app.companyName.toLowerCase().includes(term.toLowerCase()) ||
                app.jobTitle.toLowerCase().includes(term.toLowerCase())
            )
        }

        if (status !== 'All') {
            filtered = filtered.filter(app => app.status === status)
        }

        if (date !== 'All') {
            const now = new Date()
            let filterDate = new Date()

            switch (date) {
                case 'Last7Days':
                    filterDate.setDate(now.getDate() - 7)
                    break
                case 'Last30Days':
                    filterDate.setDate(now.getDate() - 30)
                    break
                case 'Last3Months':
                    filterDate.setMonth(now.getMonth() - 3)
                    break
                default:
                    filterDate = null
            }

            if (filterDate) {
                filtered = filtered.filter(app => new Date(app.appliedDate) >= filterDate)
            }
        }

        onFilteredResults(filtered)
    }

    const handleSearchChange = (e) => {
        const term = e.target.value
        setSearchTerm(term)
        handleSearch(term, statusFilter, dateFilter)
    }

    const handleStatusChange = (e) => {
        const status = e.target.value
        setStatusFilter(status)
        handleSearch(searchTerm, status, dateFilter)
    }

    const handleDateChange = (e) => {
        const date = e.target.value
        setDateFilter(date)
        handleSearch(searchTerm, statusFilter, date)
    }

    const clearFilters = () => {
        setSearchTerm('')
        setStatusFilter('All')
        setDateFilter('All')
        onFilteredResults(applications)
    }

    return (
        <div className="bg-white card-shadow rounded-xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-end">
                {/* Search Input */}
                <div className="flex-1">
                    <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
                        Search Applications
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search by company name or job title..."
                            className="input-field w-full pl-16"
                        />
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Status Filter */}
                <div className="w-full lg:w-48">
                    <label htmlFor="statusFilter" className="block text-sm font-semibold text-gray-700 mb-2">
                        Filter by Status
                    </label>
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={handleStatusChange}
                        className="input-field w-full"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                {/* Date Filter */}
                <div className="w-full lg:w-48">
                    <label htmlFor="dateFilter" className="block text-sm font-semibold text-gray-700 mb-2">
                        Filter by Date
                    </label>
                    <select
                        id="dateFilter"
                        value={dateFilter}
                        onChange={handleDateChange}
                        className="input-field w-full"
                    >
                        <option value="All">All Time</option>
                        <option value="Last7Days">Last 7 Days</option>
                        <option value="Last30Days">Last 30 Days</option>
                        <option value="Last3Months">Last 3 Months</option>
                    </select>
                </div>

                {/* Clear Filters Button */}
                <div className="w-full lg:w-auto">
                    <button
                        onClick={clearFilters}
                        className="btn-secondary w-full lg:w-auto flex items-center justify-center space-x-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Clear Filters</span>
                    </button>
                </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || statusFilter !== 'All' || dateFilter !== 'All') && (
                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-700">Active filters:</span>
                    {searchTerm && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Search: "{searchTerm}"
                        </span>
                    )}
                    {statusFilter !== 'All' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Status: {statusFilter}
                        </span>
                    )}
                    {dateFilter !== 'All' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Date: {dateFilter.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchAndFilter