import { Outlet, Link, useLocation } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Layout() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Patient Portal', href: '/patient' },
    { name: 'Doctor Portal', href: '/doctor' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-ubuntu-orange" />
              <span className="text-xl font-bold text-gray-900">
                Ubuntu Health Vault
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-ubuntu-orange'
                      : 'text-gray-700 hover:text-ubuntu-orange'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <ConnectButton />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-ubuntu-orange"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm font-medium ${
                    location.pathname === item.href
                      ? 'text-ubuntu-orange'
                      : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <ConnectButton />
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-ubuntu-orange" />
                <span className="text-lg font-bold">Ubuntu Health Vault</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering South Africans to own and control their medical data
                through blockchain technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/patient" className="hover:text-white">Patient Portal</Link></li>
                <li><Link to="/doctor" className="hover:text-white">Doctor Portal</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: support@ubuntuhealthvault.co.za</li>
                <li>USSD: *134*HEALTH#</li>
                <li>Location: South Africa</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Ubuntu Health Vault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

