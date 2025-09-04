import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <nav className="bg-white shadow-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <div className="flex space-x-7">
                            <div>
                                <Link to="/" className="flex items-center py-4 px-2">
                                    {/* Simple briefcase icon */}
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg mr-3 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                                            <path d="M8 7V5a4 4 0 018 0v2" stroke="currentColor" strokeWidth="2" fill="none" />
                                        </svg>
                                    </div>
                                    <span className="font-bold text-gray-800 text-xl">Job Tracker</span>
                                </Link>
                            </div>
                            <div className="hidden md:flex items-center space-x-1">
                                <Link
                                    to="/"
                                    className={`py-4 px-6 text-gray-600 font-semibold hover:text-blue-600 transition duration-300 relative ${location.pathname === '/' ? 'text-blue-600' : ''
                                        }`}
                                >
                                    Dashboard
                                    {location.pathname === '/' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                                    )}
                                </Link>
                                <Link
                                    to="/add"
                                    className={`py-4 px-6 text-gray-600 font-semibold hover:text-blue-600 transition duration-300 relative ${location.pathname === '/add' ? 'text-blue-600' : ''
                                        }`}
                                >
                                    Add Job
                                    {location.pathname === '/add' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                                    )}
                                </Link>
                            </div>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button 
                                className="outline-none mobile-menu-button p-2" 
                                onClick={toggleMobileMenu}
                                aria-label="Toggle mobile menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <svg className="w-6 h-6 text-gray-600 hover:text-blue-600"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="md:hidden mobile-menu bg-white border-t border-gray-100" role="navigation" aria-label="Mobile navigation">
                        <ul className="py-2">
                            <li>
                                <Link
                                    to="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block text-sm px-6 py-4 text-gray-600 font-semibold hover:bg-blue-50 hover:text-blue-600 transition duration-300 ${location.pathname === '/' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                                        }`}
                                    aria-current={location.pathname === '/' ? 'page' : undefined}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/add"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block text-sm px-6 py-4 text-gray-600 font-semibold hover:bg-blue-50 hover:text-blue-600 transition duration-300 ${location.pathname === '/add' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                                        }`}
                                    aria-current={location.pathname === '/add' ? 'page' : undefined}
                                >
                                    Add Job
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    )
}

export default Layout