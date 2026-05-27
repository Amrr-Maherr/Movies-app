import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Film, Tv, Newspaper, Video, ChevronLeft } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";

export default function MediaCenter() {
  const { t } = useTranslation();
  const news = [
    {
      icon: <Newspaper className="w-6 h-6" />,
      title: t('infoPages.mediaCenter.news1'),
      date: t('infoPages.mediaCenter.news1Date'),
      description: t('infoPages.mediaCenter.news1Desc')
    },
    {
      icon: <Film className="w-6 h-6" />,
      title: t('infoPages.mediaCenter.news2'),
      date: t('infoPages.mediaCenter.news2Date'),
      description: t('infoPages.mediaCenter.news2Desc')
    },
    {
      icon: <Tv className="w-6 h-6" />,
      title: t('infoPages.mediaCenter.news3'),
      date: t('infoPages.mediaCenter.news3Date'),
      description: t('infoPages.mediaCenter.news3Desc')
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: t('infoPages.mediaCenter.news4'),
      date: t('infoPages.mediaCenter.news4Date'),
      description: t('infoPages.mediaCenter.news4Desc')
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('infoPages.mediaCenter.title')}
        description={t('infoPages.mediaCenter.description')}
      />

      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('infoPages.mediaCenter.title')}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          {t('infoPages.mediaCenter.subtitle')}
        </p>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item, index) => (
            <article
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6 hover:border-[var(--netflix-red)] transition-colors duration-300 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="text-[var(--netflix-red)] mt-1 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <span className="text-sm text-[var(--text-muted)]">
                    {item.date}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-3 group-hover:text-[var(--netflix-red)] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                  <Link
                    to="#"
                    className="inline-flex items-center gap-2 text-[var(--netflix-red)] font-medium mt-4 hover:underline"
                  >
                    {t('infoPages.mediaCenter.readMore')}
                    <ChevronLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Press Contact */}
        <div className="mt-12 bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8">
          <h2 className="text-2xl font-bold mb-4">{t('infoPages.mediaCenter.pressContact')}</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            {t('infoPages.mediaCenter.pressContactDesc')}
          </p>
          <a
            href="mailto:press@netflix.com"
            className="text-[var(--netflix-red)] hover:underline text-lg"
          >
            press@netflix.com
          </a>
        </div>
      </div>
    </div>
  );
}
