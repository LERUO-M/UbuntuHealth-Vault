import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { baseSepolia } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com (formerly WalletConnect)
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID'

// Metadata for your app
export const metadata = {
  name: 'Ubuntu Health Vault',
  description: 'Empowering South Africans to own and control their medical data through blockchain technology',
  url: 'https://ubuntuhealthvault.co.za', // Update with your actual domain
  icons: ['https://ubuntuhealthvault.co.za/icon.png'] // Update with your actual icon
}

// Networks configuration
export const networks = [baseSepolia]

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false
})

// Export the wagmi config for use in hooks
export const config = wagmiAdapter.wagmiConfig

