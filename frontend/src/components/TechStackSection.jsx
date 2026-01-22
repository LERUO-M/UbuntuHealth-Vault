import { motion } from "framer-motion"
import { Database, Lock, Server, MessageSquare, Cpu, Shield } from "lucide-react"

const techItems = [
  {
    icon: Database,
    title: "Base L2",
    description: "Low-fee, high-scalability blockchain for consent management"
  },
  {
    icon: Lock,
    title: "DIDs",
    description: "Decentralized Identifiers for sovereign identity control"
  },
  {
    icon: Server,
    title: "IPFS Storage",
    description: "Distributed storage for encrypted medical records"
  },
  {
    icon: MessageSquare,
    title: "Africa's Talking",
    description: "USSD/SMS gateway for inclusive consent verification"
  },
  {
    icon: Cpu,
    title: "Node.js Relayer",
    description: "Gasless transactions via meta-transaction relay service"
  },
  {
    icon: Shield,
    title: "Zero-Knowledge",
    description: "Only encrypted hashes stored on-chain, full POPIA compliance"
  }
]

export function TechStackSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Built on Resilient Infrastructure
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A decentralized physical infrastructure network (DePIN) designed for 
            South Africa's unique challenges, including load-shedding resilience.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {techItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

