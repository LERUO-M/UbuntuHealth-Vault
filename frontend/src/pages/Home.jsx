import { HeroSection } from '../components/HeroSection'
import { WorkflowSection } from '../components/WorkflowSection'
import { PortalsSection } from '../components/PortalsSection'
import { TechStackSection } from '../components/TechStackSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WorkflowSection />
      <PortalsSection />
      <TechStackSection />
    </div>
  )
}

