import { useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'

export default function ConnectButton() {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()

  return (
    <Button
      onClick={() => open()}
      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
    >
      {isConnected
        ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
        : 'Connect Wallet'}
    </Button>
  )
}

