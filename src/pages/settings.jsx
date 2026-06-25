import { useState } from 'react';

const initialSettings = {
  general: { companyName: 'Gestion de Stock Camions', currency: 'DH', language: 'Français' },
  appearance: { theme: 'Clair' },
  notifications: { lowStockAlerts: true, emailNotifications: true },
  stock: { defaultLowStockThreshold: 5 },
  account: { userInfo: 'Utilisateur connecté', changePassword: 'Disponible via le backend' },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings);

  const updateSection = (section, field, value) => {
    setSettings((currentSettings) => ({ ...currentSettings, [section]: { ...currentSettings[section], [field]: value } }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Paramètres</h1>
        <p className="text-slate-500">Configurez les réglages généraux, l'apparence et les préférences du compte.</p>
      </div>
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold text-slate-800">Général</h2><div className="mt-4 space-y-4"><label className="block text-sm font-medium text-slate-700">Nom de l'entreprise<input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value={settings.general.companyName} onChange={(event) => updateSection('general', 'companyName', event.target.value)} /></label><label className="block text-sm font-medium text-slate-700">Devise<input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value={settings.general.currency} onChange={(event) => updateSection('general', 'currency', event.target.value)} /></label><label className="block text-sm font-medium text-slate-700">Langue<input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value={settings.general.language} onChange={(event) => updateSection('general', 'language', event.target.value)} /></label></div></article>
        <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold text-slate-800">Apparence</h2><div className="mt-4 space-y-3"><button type="button" className={`w-full rounded-lg border px-4 py-3 text-left ${settings.appearance.theme === 'Clair' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200'}`} onClick={() => updateSection('appearance', 'theme', 'Clair')}>Mode clair</button><button type="button" className={`w-full rounded-lg border px-4 py-3 text-left ${settings.appearance.theme === 'Sombre' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200'}`} onClick={() => updateSection('appearance', 'theme', 'Sombre')}>Mode sombre</button></div></article>
        <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold text-slate-800">Notifications</h2><div className="mt-4 space-y-3"><label className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3"><span className="text-sm font-medium text-slate-700">Alertes de stock faible</span><input type="checkbox" checked={settings.notifications.lowStockAlerts} onChange={(event) => updateSection('notifications', 'lowStockAlerts', event.target.checked)} /></label><label className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3"><span className="text-sm font-medium text-slate-700">Notifications email</span><input type="checkbox" checked={settings.notifications.emailNotifications} onChange={(event) => updateSection('notifications', 'emailNotifications', event.target.checked)} /></label></div></article>
        <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold text-slate-800">Stock</h2><div className="mt-4"><label className="block text-sm font-medium text-slate-700">Seuil de stock faible par défaut<input type="number" min="0" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value={settings.stock.defaultLowStockThreshold} onChange={(event) => updateSection('stock', 'defaultLowStockThreshold', Number(event.target.value))} /></label></div></article>
        <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold text-slate-800">Données</h2><div className="mt-4 flex flex-wrap gap-3"><button type="button" className="rounded-lg bg-blue-600 px-4 py-2 text-white">Exporter les données</button><button type="button" className="rounded-lg bg-slate-200 px-4 py-2 text-slate-800">Importer les données</button></div></article>
        <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold text-slate-800">Compte</h2><div className="mt-4 space-y-3 text-sm text-slate-600"><p>{settings.account.userInfo}</p><p>{settings.account.changePassword}</p></div></article>
      </section>
    </div>
  );
}