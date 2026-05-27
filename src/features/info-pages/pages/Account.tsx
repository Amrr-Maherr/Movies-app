import { useTranslation } from "react-i18next";
import HelmetMeta from "@/components/shared/HelmetMeta";

export default function Account() {
  const { t } = useTranslation();
  const accountSections = [
    {
      title: t('infoPages.account.membershipBilling'),
      items: [
        { label: t('infoPages.account.email'), value: "user@example.com" },
        { label: t('infoPages.account.password'), value: "••••••••" },
        { label: t('infoPages.account.plan'), value: "Premium - $19.99/month" }
      ]
    },
    {
      title: t('infoPages.account.profileSettings'),
      items: [
        { label: t('infoPages.account.profiles'), value: t('infoPages.account.manageProfiles') },
        { label: t('infoPages.account.parentalControls'), value: t('infoPages.account.setRestrictions') },
        { label: t('infoPages.account.profileLock'), value: t('infoPages.account.addPin') }
      ]
    },
    {
      title: t('infoPages.account.playbackSettings'),
      items: [
        { label: t('infoPages.account.videoQuality'), value: t('infoPages.account.autoQuality') },
        { label: t('infoPages.account.dataUsage'), value: t('infoPages.account.high') },
        { label: t('infoPages.account.autoplay'), value: t('infoPages.account.enabled') }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('infoPages.account.title')}
        description={t('infoPages.account.description')}
      />

      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('infoPages.account.title')}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          {t('infoPages.account.subtitle')}
        </p>

        {/* Account Sections */}
        <div className="max-w-4xl space-y-8">
          {accountSections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md overflow-hidden"
            >
              <div className="bg-[var(--background-tertiary)] px-6 py-4 border-b border-[var(--card-border)]">
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>
              <div className="divide-y divide-[var(--card-border)]">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between px-6 py-4 hover:bg-[var(--hover-overlay)] transition-colors duration-300 cursor-pointer"
                  >
                    <span className="text-[var(--text-secondary)]">
                      {item.label}
                    </span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mt-8 flex flex-wrap gap-4">
          <button className="bg-[var(--netflix-red)] text-white px-6 py-3 rounded font-medium hover:bg-[var(--netflix-red-hover)] transition-colors duration-300">
            {t('infoPages.account.saveChanges')}
          </button>
          <button className="bg-transparent border border-[var(--text-secondary)] text-[var(--text-primary)] px-6 py-3 rounded font-medium hover:border-[var(--netflix-red)] hover:text-[var(--netflix-red)] transition-colors duration-300">
            {t('infoPages.account.cancelMembership')}
          </button>
        </div>
      </div>
    </div>
  );
}
