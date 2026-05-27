import { useTranslation } from "react-i18next";
import { Gauge, Wifi, Download, Server } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";

export default function SpeedTest() {
  const { t } = useTranslation();
  const speedFactors = [
    {
      icon: <Wifi className="w-8 h-8" />,
      title: t('infoPages.speedTest.connection'),
      description: t('infoPages.speedTest.connectionDesc')
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: t('infoPages.speedTest.congestion'),
      description: t('infoPages.speedTest.congestionDesc')
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: t('infoPages.speedTest.devicePerformance'),
      description: t('infoPages.speedTest.devicePerformanceDesc')
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: t('infoPages.speedTest.downloadSpeed'),
      description: t('infoPages.speedTest.downloadSpeedDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('infoPages.speedTest.title')}
        description={t('infoPages.speedTest.description')}
      />

      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('infoPages.speedTest.title')}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          {t('infoPages.speedTest.subtitle')}
        </p>

        {/* Speed Test Tool */}
        <div className="max-w-2xl bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8 mb-12">
          <div className="text-center">
            <Gauge className="w-24 h-24 text-[var(--netflix-red)] mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">{t('infoPages.speedTest.testConnection')}</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              {t('infoPages.speedTest.testConnectionDesc')}
            </p>
            <button className="bg-[var(--netflix-red)] text-white px-12 py-4 rounded font-bold text-lg hover:bg-[var(--netflix-red-hover)] transition-colors duration-300">
              {t('infoPages.speedTest.startTest')}
            </button>
          </div>
        </div>

        {/* Recommended Speeds */}
        <div className="max-w-4xl mb-12">
          <h2 className="text-2xl font-bold mb-6">{t('infoPages.speedTest.recommendedSpeeds')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6">
              <div className="text-3xl font-bold text-[var(--netflix-red)] mb-2">3 Mbps</div>
              <div className="font-semibold mb-2">{t('infoPages.speedTest.sdQuality')}</div>
              <div className="text-sm text-[var(--text-secondary)]">
                {t('infoPages.speedTest.sdDesc')}
              </div>
            </div>
            <div className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6">
              <div className="text-3xl font-bold text-[var(--netflix-red)] mb-2">5 Mbps</div>
              <div className="font-semibold mb-2">{t('infoPages.speedTest.hdQuality')}</div>
              <div className="text-sm text-[var(--text-secondary)]">
                {t('infoPages.speedTest.hdDesc')}
              </div>
            </div>
            <div className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6">
              <div className="text-3xl font-bold text-[var(--netflix-red)] mb-2">25 Mbps</div>
              <div className="font-semibold mb-2">{t('infoPages.speedTest.ultraHdQuality')}</div>
              <div className="text-sm text-[var(--text-secondary)]">
                {t('infoPages.speedTest.ultraHdDesc')}
              </div>
            </div>
          </div>
        </div>

        {/* Factors Affecting Speed */}
        <div className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-bold mb-6">{t('infoPages.speedTest.factorsTitle')}</h2>
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
          <h2 className="text-2xl font-bold mb-6">{t('infoPages.speedTest.tipsTitle')}</h2>
          <ul className="space-y-3">
            {[
              t('infoPages.speedTest.tip1'),
              t('infoPages.speedTest.tip2'),
              t('infoPages.speedTest.tip3'),
              t('infoPages.speedTest.tip4'),
              t('infoPages.speedTest.tip5')
            ].map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-[var(--netflix-red)] font-bold">{index + 1}.</span>
                <span className="text-[var(--text-secondary)]">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
