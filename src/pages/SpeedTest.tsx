import { motion } from "framer-motion";
import { Gauge, Wifi, Download, Server } from "lucide-react";

export default function SpeedTest() {
  const speedFactors = [
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Internet Connection",
      description: "Your internet speed and bandwidth affect streaming quality. Netflix recommends at least 3 Mbps for SD, 5 Mbps for HD, and 25 Mbps for Ultra HD."
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Network Congestion",
      description: "During peak hours, network congestion can affect your streaming quality. Try watching during off-peak times for better performance."
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: "Device Performance",
      description: "Older devices may not support the latest streaming technologies. Consider updating your device or using a compatible streaming device."
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Download Speed",
      description: "Run a speed test to check your current internet speed. If it's below the recommended levels, contact your internet service provider."
    }
  ];

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Speed Test
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          Check your internet speed and optimize your Netflix experience
        </p>

        {/* Speed Test Tool */}
        <div className="max-w-2xl bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8 mb-12">
          <div className="text-center">
            <Gauge className="w-24 h-24 text-[var(--netflix-red)] mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Test Your Connection</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Click the button below to test your current internet speed
            </p>
            <button className="bg-[var(--netflix-red)] text-white px-12 py-4 rounded font-bold text-lg hover:bg-[var(--netflix-red-hover)] transition-colors duration-300">
              Start Speed Test
            </button>
          </div>
        </div>

        {/* Recommended Speeds */}
        <div className="max-w-4xl mb-12">
          <h2 className="text-2xl font-bold mb-6">Recommended Speeds</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6">
              <div className="text-3xl font-bold text-[var(--netflix-red)] mb-2">3 Mbps</div>
              <div className="font-semibold mb-2">SD Quality</div>
              <div className="text-sm text-[var(--text-secondary)]">
                Standard Definition (480p)
              </div>
            </div>
            <div className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6">
              <div className="text-3xl font-bold text-[var(--netflix-red)] mb-2">5 Mbps</div>
              <div className="font-semibold mb-2">HD Quality</div>
              <div className="text-sm text-[var(--text-secondary)]">
                High Definition (720p - 1080p)
              </div>
            </div>
            <div className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6">
              <div className="text-3xl font-bold text-[var(--netflix-red)] mb-2">25 Mbps</div>
              <div className="font-semibold mb-2">Ultra HD Quality</div>
              <div className="text-sm text-[var(--text-secondary)]">
                4K Ultra HD (2160p)
              </div>
            </div>
          </div>
        </div>

        {/* Factors Affecting Speed */}
        <div className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-bold mb-6">Factors Affecting Streaming Speed</h2>
          {speedFactors.map((factor, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-[var(--netflix-red)] mt-1">
                  {factor.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{factor.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="max-w-4xl mt-12 bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8">
          <h2 className="text-2xl font-bold mb-6">Tips for Better Streaming</h2>
          <ul className="space-y-3">
            {[
              "Connect your device directly to your router using an Ethernet cable",
              "Close other applications that may be using bandwidth",
              "Reduce the number of devices connected to your network",
              "Move closer to your Wi-Fi router or use a Wi-Fi extender",
              "Upgrade your internet plan if speeds are consistently low"
            ].map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-[var(--netflix-red)] font-bold">{index + 1}.</span>
                <span className="text-[var(--text-secondary)]">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
