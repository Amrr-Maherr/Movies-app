import { useTranslation } from "react-i18next";
import { Tv, Smartphone, Tablet, Laptop, Gamepad2 } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";

export default function WaysToWatch() {
  const { t } = useTranslation();
  const devices = [
    {
      icon: <Tv className="w-12 h-12" />,
      title: t('infoPages.waysToWatch.smartTv'),
      description: t('infoPages.waysToWatch.smartTvDesc')
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: t('infoPages.waysToWatch.mobile'),
      description: t('infoPages.waysToWatch.mobileDesc')
    },
    {
      icon: <Tablet className="w-12 h-12" />,
      title: t('infoPages.waysToWatch.tablets'),
      description: t('infoPages.waysToWatch.tabletsDesc')
    },
    {
      icon: <Laptop className="w-12 h-12" />,
      title: t('infoPages.waysToWatch.laptops'),
      description: t('infoPages.waysToWatch.laptopsDesc')
    },
    {
      icon: <Gamepad2 className="w-12 h-12" />,
      title: t('infoPages.waysToWatch.consoles'),
      description: t('infoPages.waysToWatch.consolesDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('infoPages.waysToWatch.title')}
        description={t('infoPages.waysToWatch.description')}
      />

      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('infoPages.waysToWatch.title')}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          {t('infoPages.waysToWatch.subtitle')}
        </p>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[var(--netflix-red)] to-[var(--netflix-red-dark)] rounded-md p-8 mb-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t('infoPages.waysToWatch.heroTitle')}
          </h2>
          <p className="text-white/90 mb-6">
            {t('infoPages.waysToWatch.heroDesc')}
          </p>
          <button className="bg-white text-[var(--netflix-red)] px-8 py-3 rounded font-bold hover:bg-white/90 transition-colors duration-300">
            {t('infoPages.waysToWatch.browseDevices')}
          </button>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8 hover:border-[var(--netflix-red)] transition-colors duration-300 group"
            >
              <div className="text-[var(--netflix-red)] mb-6 group-hover:scale-110 transition-transform duration-300">
                {device.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{device.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {device.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4">{t('infoPages.waysToWatch.chromecast')}</h3>
            <p className="text-[var(--text-secondary)]">
              {t('infoPages.waysToWatch.chromecastDesc')}
            </p>
          </div>
          <div className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4">{t('infoPages.waysToWatch.vr')}</h3>
            <p className="text-[var(--text-secondary)]">
              {t('infoPages.waysToWatch.vrDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
