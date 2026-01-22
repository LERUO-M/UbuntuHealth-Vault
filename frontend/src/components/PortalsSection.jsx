import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { 
  User, 
  Stethoscope, 
  ArrowRight,
  History,
  Bell,
  FileText,
  UserPlus,
  Activity,
} from "lucide-react"
import { Link } from "react-router-dom"

const portals = [
  {
    id: "patient",
    title: "Patient Portal",
    subtitle: "Your Health, Your Control",
    description: "Manage your health records, control who sees your data, and track your medical history across all providers.",
    icon: User,
    color: "primary",
    features: [
      { icon: History, text: "Complete medical history timeline" },
      { icon: Bell, text: "Consent notifications & approvals" },
      { icon: FileText, text: "Download & share records" },
    ],
    cta: "Access Patient Portal",
    path: "/patient"
  },
  {
    id: "doctor",
    title: "Healthcare Provider Portal",
    subtitle: "Focus on Care, Not Admin",
    description: "Request patient access, view authorized records, and update treatment information—all in one streamlined interface.",
    icon: Stethoscope,
    color: "secondary",
    features: [
      { icon: UserPlus, text: "Request patient record access" },
      { icon: Activity, text: "View real-time patient data" },
      { icon: FileText, text: "Update treatment records" },
    ],
    cta: "Access Provider Portal",
    path: "/doctor"
  },
]

const getColorClasses = (color) => {
  switch (color) {
    case "primary":
      return {
        bg: "bg-primary/5",
        border: "border-primary/20",
        text: "text-primary",
        icon: "bg-primary text-primary-foreground"
      }
    case "secondary":
      return {
        bg: "bg-secondary/5",
        border: "border-secondary/20",
        text: "text-secondary",
        icon: "bg-secondary text-secondary-foreground"
      }
    default:
      return {
        bg: "bg-muted",
        border: "border-border",
        text: "text-foreground",
        icon: "bg-muted text-foreground"
      }
  }
}

export function PortalsSection() {
  return (
    <section id="portals" className="py-24 bg-background">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Choose Your Portal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're a patient managing your health data or a healthcare provider 
            accessing authorized records, we have a portal designed for you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {portals.map((portal, index) => {
            const colors = getColorClasses(portal.color)
            return (
              <motion.div
                key={portal.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`rounded-2xl ${colors.bg} border ${colors.border} p-8 hover:shadow-xl transition-all duration-300`}
              >
                <div className={`w-16 h-16 rounded-2xl ${colors.icon} flex items-center justify-center mb-6 shadow-lg`}>
                  <portal.icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-display font-bold mb-2">{portal.title}</h3>
                <p className={`text-sm font-medium ${colors.text} mb-4`}>{portal.subtitle}</p>
                <p className="text-muted-foreground mb-6">{portal.description}</p>

                <div className="space-y-3 mb-8">
                  {portal.features.map((feature) => (
                    <div key={feature.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center border border-border">
                        <feature.icon className={`w-4 h-4 ${colors.text}`} />
                      </div>
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <Link to={portal.path}>
                  <Button 
                    variant={portal.color === "primary" ? "hero" : "heroSecondary"} 
                    className="w-full group"
                    size="lg"
                  >
                    {portal.cta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

