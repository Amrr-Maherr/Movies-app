import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, TrendingUp, DollarSign, Users, FileText } from "lucide-react";

export default function InvestorRelations() {
  const financialHighlights = [
    { icon: <TrendingUp className="w-8 h-8" />, label: "Revenue Growth", value: "+12.5%" },
    { icon: <DollarSign className="w-8 h-8" />, label: "Market Cap", value: "$195B" },
    { icon: <Users className="w-8 h-8" />, label: "Global Subscribers", value: "260M+" },
    { icon: <FileText className="w-8 h-8" />, label: "Content Investment", value: "$17B" }
  ];

  const reports = [
    { title: "Q4 2025 Earnings Report", date: "January 20, 2026", type: "PDF" },
    { title: "Q3 2025 Earnings Report", date: "October 18, 2025", type: "PDF" },
    { title: "2025 Annual Report", date: "March 15, 2025", type: "PDF" },
    { title: "2024 Annual Report", date: "March 20, 2024", type: "PDF" }
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
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Investor Relations
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          Netflix financial information, reports, and investor resources
        </p>

        {/* Financial Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {financialHighlights.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6 text-center"
            >
              <div className="text-[var(--netflix-red)] flex justify-center mb-4">
                {item.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">
                {item.value}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stock Information */}
        <div className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Stock Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[var(--text-secondary)] mb-2">NASDAQ Symbol</p>
              <p className="text-2xl font-bold">NFLX</p>
            </div>
            <div>
              <p className="text-[var(--text-secondary)] mb-2">Current Price</p>
              <p className="text-2xl font-bold text-[#46d369]">$485.23 (+2.4%)</p>
            </div>
          </div>
        </div>

        {/* Financial Reports */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Financial Reports</h2>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div
                key={index}
                className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6 flex items-center justify-between hover:border-[var(--netflix-red)] transition-colors duration-300 cursor-pointer"
              >
                <div>
                  <h3 className="font-semibold mb-1">{report.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{report.date}</p>
                </div>
                <span className="text-[var(--netflix-red)] font-medium">
                  {report.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
