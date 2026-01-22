import { motion } from "framer-motion"

const nodes = [
  { id: "1", x: 50, y: 30, status: "active", label: "Soweto Clinic" },
  { id: "2", x: 20, y: 50, status: "active", label: "Alexandra Hub" },
  { id: "3", x: 80, y: 45, status: "active", label: "Sandton Medical" },
  { id: "4", x: 35, y: 70, status: "pending", label: "Orange Farm" },
  { id: "5", x: 65, y: 75, status: "active", label: "Diepsloot Node" },
  { id: "6", x: 50, y: 55, status: "active", label: "Central Hub" },
]

const connections = [
  ["1", "6"],
  ["2", "6"],
  ["3", "6"],
  ["4", "6"],
  ["5", "6"],
  ["1", "3"],
  ["2", "4"],
  ["4", "5"],
]

const getNodeColor = (status) => {
  switch (status) {
    case "active":
      return "fill-success"
    case "pending":
      return "fill-warning"
    case "offline":
      return "fill-muted-foreground"
    default:
      return "fill-muted-foreground"
  }
}

export function NetworkVisualization() {
  return (
    <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[400px] overflow-hidden rounded-2xl bg-card border border-border">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Connection Lines */}
        {connections.map(([from, to], i) => {
          const fromNode = nodes.find((n) => n.id === from)
          const toNode = nodes.find((n) => n.id === to)
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              className="stroke-node-line"
              strokeWidth="0.3"
              strokeDasharray="2 1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          )
        })}

        {/* Data Flow Animation */}
        {connections.slice(0, 3).map(([from, to], i) => {
          const fromNode = nodes.find((n) => n.id === from)
          const toNode = nodes.find((n) => n.id === to)
          return (
            <motion.circle
              key={`flow-${from}-${to}`}
              r="0.8"
              className="fill-accent"
              initial={{ cx: fromNode.x, cy: fromNode.y }}
              animate={{
                cx: [fromNode.x, toNode.x, fromNode.x],
                cy: [fromNode.y, toNode.y, fromNode.y],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeInOut",
              }}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
          >
            {/* Outer glow */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="4"
              className={`${getNodeColor(node.status)} opacity-20`}
              animate={node.status === "active" ? { r: [4, 5, 4] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Main node */}
            <circle
              cx={node.x}
              cy={node.y}
              r="2.5"
              className={`${getNodeColor(node.status)} stroke-card`}
              strokeWidth="0.5"
            />
            {/* Inner highlight */}
            <circle
              cx={node.x - 0.5}
              cy={node.y - 0.5}
              r="0.8"
              className="fill-card opacity-30"
            />
          </motion.g>
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-success" />
          <span className="text-muted-foreground">Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-warning" />
          <span className="text-muted-foreground">Syncing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground" />
          <span className="text-muted-foreground">Offline</span>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-card/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-border">
        <div className="text-2xl font-display font-bold text-primary">
          {nodes.filter((n) => n.status === "active").length}
        </div>
        <div className="text-xs text-muted-foreground">Active Nodes</div>
      </div>
    </div>
  )
}

