import { Link } from 'react-router-dom'
import { Shield, Lock, Smartphone, Database, CheckCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: 'Decentralized Identity',
      description: 'Your medical records are linked to your unique blockchain identity (DID)'
    },
    {
      icon: Lock,
      title: 'Encrypted Storage',
      description: 'All records are encrypted and stored securely on IPFS'
    },
    {
      icon: Smartphone,
      title: 'USSD/SMS Control',
      description: 'Manage access to your records via simple USSD codes or SMS'
    },
    {
      icon: Database,
      title: 'Blockchain Security',
      description: 'Immutable access logs on Base Sepolia blockchain'
    }
  ]

  const steps = [
    'Connect your wallet and create your health vault',
    'Upload your medical records (encrypted automatically)',
    'Register your phone number for USSD/SMS notifications',
    'Grant or revoke doctor access anytime, anywhere'
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ubuntu-orange to-ubuntu-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Own Your Medical Data
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Ubuntu Health Vault empowers South Africans to control their medical records
              using blockchain technology and simple USSD/SMS commands
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/patient" className="btn-primary bg-white text-ubuntu-orange hover:bg-gray-100">
                Patient Portal
                <ArrowRight className="inline ml-2 h-5 w-5" />
              </Link>
              <Link to="/doctor" className="btn-secondary border-white text-white hover:bg-white/10">
                Doctor Portal
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L1440 120L1440 0C1440 0 1080 120 720 120C360 120 0 0 0 0L0 120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Ubuntu Health Vault?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for South Africa, powered by blockchain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:shadow-lg transition-shadow"
              >
                <feature.icon className="h-12 w-12 text-ubuntu-orange mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in 4 simple steps
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-ubuntu-orange text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-lg text-gray-700 pt-1">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ubuntu-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of South Africans securing their medical data with Ubuntu Health Vault
          </p>
          <Link to="/patient" className="btn-primary bg-white text-ubuntu-orange hover:bg-gray-100">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  )
}

