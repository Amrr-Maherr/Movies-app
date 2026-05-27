import { useTranslation } from "react-i18next";
import { TrendingUp, DollarSign, Users, FileText } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";

export default function InvestorRelations() {
  const { t } = useTranslation();
  const financialHighlights = [
    { icon: <TrendingUp className="w-8 h-8" />, label: t('infoPages.investor.revenueGrowth'), value: "+12.5%" },
    { icon: <DollarSign className="w-8 h-8" />, label: t('infoPages.investor.marketCap'), value: "$195B" },
    { icon: <Users className="w-8 h-8" />, label: t('infoPages.investor.globalSubscribers'), value: "260M+" },
    { icon: <FileText className="w-8 h-8" />, label: t('infoPages.investor.contentInvestment'), value: "$17B" }
  ];

  const reports = [
    { title: t('infoPages.investor.report1'), date: t('infoPages.investor.report1Date'), type: "PDF" },
    { title: t('infoPages.investor.report2'), date: t('infoPages.investor.report2Date'), type: "PDF" },
    { title: t('infoPages.investor.report3'), date: t('infoPages.investor.report3Date'), type: "PDF" },
    { title: t('infoPages.investor.report4'), date: t('infoPages.investor.report4Date'), type: "PDF" }
  ];

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('infoPages.investor.title')}
        description={t('infoPages.investor.description')}
      />

      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('infoPages.investor.title')}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          {t('infoPages.investor.subtitle')}
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
          <h2 className="text-2xl font-bold mb-6">{t('infoPages.investor.stockInfo')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[var(--text-secondary)] mb-2">{t('infoPages.investor.nasdaqSymbol')}</p>
              <p className="text-2xl font-bold">NFLX</p>
            </div>
            <div>
              <p className="text-[var(--text-secondary)] mb-2">{t('infoPages.investor.currentPrice')}</p>
              <p className="text-2xl font-bold text-[#46d369]">$485.23 (+2.4%)</p>
            </div>
          </div>
        </div>

        {/* Financial Reports */}
        <div>
          <h2 className="text-2xl font-bold mb-6">{t('infoPages.investor.financialReports')}</h2>
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
    </div>
  );
}
