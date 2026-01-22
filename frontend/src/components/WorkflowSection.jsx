import { motion } from "framer-motion"
import { 
  UserCheck, 
  Bell, 
  Stethoscope, 
  CheckCircle,
  ArrowDown,
  Lock,
  Smartphone
} from "lucide-react"

const steps = [
  {
    phase: "Phase 1",
    title: "Administrative Check-In",
    icon: UserCheck,
    color: "primary",
    items: [
      {
        icon: UserCheck,
        title: "Identity Verification",
        description: "Patient presents their South African ID to the Clinic Admin"
      },
      {
        icon: Smartphone,
        title: "Consent Loop",
        description: "Patient receives notification/SMS and replies 'Yes' to grant temporary access"
      }
    ]
  },
  {
    phase: "Phase 2",
    title: "Automated Clinical Routing",
    icon: Stethoscope,
    color: "secondary",
    items: [
      {
        icon: Bell,
        title: "Record Assignment",
        description: "Admin assigns patient to an available doctor"
      },
      {
        icon: Lock,
        title: "Key Hand-off",
        description: "Decryption keys automatically route to the assigned Doctor's Portal"
      }
    ]
  },
  {
    phase: "Phase 3",
    title: "Clinical Consultation & Closing",
    icon: CheckCircle,
    color: "accent",
    items: [
      {
        icon: Stethoscope,
        title: "Focused Treatment",
        description: "Doctor uses clinical-only UI with patient history already loaded"
      },
      {
        icon: CheckCircle,
        title: "One-Click Completion",
        description: "Updates DePIN record, notifies Admin, and automatically revokes access"
      }
    ]
  }
]

const getColorClasses = (color) => {
  switch (color) {
    case "primary":
      return {
        bg: "bg-primary/10",
        border: "border-primary/30",
        text: "text-primary",
        icon: "bg-primary text-primary-foreground"
      }
    case "secondary":
      return {
        bg: "bg-secondary/10",
        border: "border-secondary/30",
        text: "text-secondary",
        icon: "bg-secondary text-secondary-foreground"
      }
    case "accent":
      return {
        bg: "bg-accent/10",
        border: "border-accent/30",
        text: "text-accent",
        icon: "bg-accent text-accent-foreground"
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

export function WorkflowSection() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A seamless three-phase workflow that separates administration from clinical care,
            giving doctors more time with patients.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((step, stepIndex) => {
            const colors = getColorClasses(step.color)
            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stepIndex * 0.15 }}
              >
                {/* Phase header */}
                <div className={`rounded-2xl ${colors.bg} border ${colors.border} p-6`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center shadow-md`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`text-sm font-medium ${colors.text}`}>{step.phase}</span>
                      <h3 className="text-xl font-display font-semibold">{step.title}</h3>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {step.items.map((item) => (
                      <div
                        key={item.title}
                        className="bg-card rounded-xl p-4 border border-border"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            <item.icon className={`w-4 h-4 ${colors.text}`} />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow between phases */}
                {stepIndex < steps.length - 1 && (
                  <div className="flex justify-center py-4">
                    <ArrowDown className="w-6 h-6 text-muted-foreground/50" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

