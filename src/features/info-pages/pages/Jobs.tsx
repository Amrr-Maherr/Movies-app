import { useTranslation } from "react-i18next";
import { Briefcase, Globe, Award, Heart } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";

export default function Jobs() {
  const { t } = useTranslation();
  const departments = [
    { icon: <Globe className="w-6 h-6" />, name: t('infoPages.jobs.engineering'), openings: 45 },
    { icon: <Award className="w-6 h-6" />, name: t('infoPages.jobs.contentCreative'), openings: 28 },
    { icon: <Briefcase className="w-6 h-6" />, name: t('infoPages.jobs.marketing'), openings: 19 },
    { icon: <Heart className="w-6 h-6" />, name: t('infoPages.jobs.customerService'), openings: 67 }
  ];

  const featuredJobs = [
    { title: t('infoPages.jobs.job1'), location: t('infoPages.jobs.job1Location'), type: t('infoPages.jobs.fullTime') },
    { title: t('infoPages.jobs.job2'), location: t('infoPages.jobs.job2Location'), type: t('infoPages.jobs.fullTime') },
    { title: t('infoPages.jobs.job3'), location: t('infoPages.jobs.remote'), type: t('infoPages.jobs.fullTime') },
    { title: t('infoPages.jobs.job4'), location: t('infoPages.jobs.job4Location'), type: t('infoPages.jobs.fullTime') },
    { title: t('infoPages.jobs.job5'), location: t('infoPages.jobs.job5Location'), type: t('infoPages.jobs.fullTime') },
    { title: t('infoPages.jobs.job6'), location: t('infoPages.jobs.remote'), type: t('infoPages.jobs.partTime') }
  ];

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('infoPages.jobs.title')}
        description={t('infoPages.jobs.description')}
      />

      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('infoPages.jobs.title')}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          {t('infoPages.jobs.subtitle')}
        </p>

        {/* Hero Section */}
        <div className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {t('infoPages.jobs.whyWork')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-[var(--netflix-red)]">{t('infoPages.jobs.freedom')}</h3>
              <p className="text-[var(--text-secondary)]">
                {t('infoPages.jobs.freedomDesc')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-[var(--netflix-red)]">{t('infoPages.jobs.pay')}</h3>
              <p className="text-[var(--text-secondary)]">
                {t('infoPages.jobs.payDesc')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-[var(--netflix-red)]">{t('infoPages.jobs.culture')}</h3>
              <p className="text-[var(--text-secondary)]">
                {t('infoPages.jobs.cultureDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Departments */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t('infoPages.jobs.departments')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6 hover:border-[var(--netflix-red)] transition-colors duration-300 cursor-pointer"
              >
                <div className="text-[var(--netflix-red)] mb-4">{dept.icon}</div>
                <h3 className="font-semibold mb-2">{dept.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {t('infoPages.jobs.openings', { count: dept.openings })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Jobs */}
        <div>
          <h2 className="text-2xl font-bold mb-6">{t('infoPages.jobs.featuredPositions')}</h2>
          <div className="space-y-4">
            {featuredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6 flex flex-col md:flex-row md:items-center justify-between hover:border-[var(--netflix-red)] transition-colors duration-300 cursor-pointer"
              >
                <div>
                  <h3 className="font-semibold mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 bg-[var(--netflix-red)] text-white px-6 py-2 rounded font-medium hover:bg-[var(--netflix-red-hover)] transition-colors duration-300">
                  {t('infoPages.jobs.applyNow')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
