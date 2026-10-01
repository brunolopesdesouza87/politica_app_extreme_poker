import React, { useState } from 'react';
import { X, Copy, Check, Download, Sliders, ShieldCheck, Code2, RotateCcw } from 'lucide-react';
import { PolicyConfig, DEFAULT_POLICY_CONFIG, PLAY_CONSOLE_GUIDE_STEPS } from '../data/privacyPolicyData';
import { generateMarkdownPolicy, generateStandaloneHtml } from '../utils/exportGenerator';

interface DeveloperToolkitModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PolicyConfig;
  onChangeConfig: (newConfig: PolicyConfig) => void;
  lang: 'pt' | 'en';
}

export const DeveloperToolkitModal: React.FC<DeveloperToolkitModalProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'customize' | 'playstore' | 'export'>('customize');
  const [copiedType, setCopiedType] = useState<'html' | 'md' | 'url' | null>(null);

  if (!isOpen) return null;

  const isEn = lang === 'en';

  const handleCopy = async (content: string, type: 'html' | 'md' | 'url') => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2200);
    } catch {
      // Fallback
    }
  };

  const handleDownloadHtml = () => {
    const htmlContent = generateStandaloneHtml(config, lang);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'privacidade-extreme-poker.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    onChangeConfig(DEFAULT_POLICY_CONFIG);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1C1917]/40 backdrop-blur-[2px] transition-opacity no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="toolkit-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] border-l border-[#E5E0D5] h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E0D5] bg-[#F7F4EE]">
          <div>
            <h2 id="toolkit-modal-title" className="font-serif text-2xl font-semibold text-[#1C1917]">
              {isEn ? 'Play Store & Vercel Configuration' : 'Configuração Play Store & Vercel'}
            </h2>
            <p className="text-xs text-[#57534E] mt-0.5">
              {isEn
                ? 'Customize controller details, inspect AdMob Data Safety answers, or export static files.'
                : 'Personalize os dados do desenvolvedor, veja o gabarito do AdMob na Play Store ou exporte o código.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#57534E] hover:text-[#1C1917] rounded-lg hover:bg-[#EBE6DF] transition-colors cursor-pointer"
            aria-label={isEn ? 'Close panel' : 'Fechar painel'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Control Tabs */}
        <div className="px-6 pt-4 pb-3 border-b border-[#E5E0D5] bg-[#FBF9F5]">
          <div className="flex items-center gap-1 p-1 bg-[#EBE6DF] rounded-lg">
            <button
              onClick={() => setActiveTab('customize')}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'customize'
                  ? 'bg-[#FBF9F5] text-[#1C1917] shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isEn ? '1. Customize Data' : '1. Personalizar Dados'}</span>
            </button>
            <button
              onClick={() => setActiveTab('playstore')}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'playstore'
                  ? 'bg-[#FBF9F5] text-[#1C1917] shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isEn ? '2. Play Console Guide' : '2. Gabarito Play Store'}</span>
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'export'
                  ? 'bg-[#FBF9F5] text-[#1C1917] shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{isEn ? '3. Export & Vercel' : '3. Exportar & Vercel'}</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'customize' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#57534E]">
                  {isEn
                    ? 'Changes update the live Privacy Policy document immediately.'
                    : 'As alterações abaixo atualizam o texto oficial da Política de Privacidade em tempo real.'}
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#57534E] hover:text-[#1C1917] cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Reset defaults' : 'Restaurar padrão'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                    {isEn ? 'Application Name' : 'Nome do Aplicativo'}
                  </label>
                  <input
                    type="text"
                    value={config.appName}
                    onChange={(e) => onChangeConfig({ ...config, appName: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#D6CEBE] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#14532D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                    {isEn ? 'Developer / Studio Name' : 'Nome do Desenvolvedor / Estúdio'}
                  </label>
                  <input
                    type="text"
                    value={config.developerName}
                    onChange={(e) => onChangeConfig({ ...config, developerName: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#D6CEBE] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#14532D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                    {isEn ? 'Support & Privacy Email' : 'E-mail de Suporte (Play Console)'}
                  </label>
                  <input
                    type="email"
                    value={config.contactEmail}
                    onChange={(e) => onChangeConfig({ ...config, contactEmail: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#D6CEBE] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#14532D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                    {isEn ? 'Android Package ID' : 'Package ID (Application ID)'}
                  </label>
                  <input
                    type="text"
                    value={config.packageName}
                    onChange={(e) => onChangeConfig({ ...config, packageName: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-mono bg-white border border-[#D6CEBE] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#14532D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                    {isEn ? 'Effective Date' : 'Data de Entrada em Vigor'}
                  </label>
                  <input
                    type="text"
                    value={config.effectiveDate}
                    onChange={(e) =>
                      onChangeConfig({
                        ...config,
                        effectiveDate: e.target.value,
                        lastUpdated: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#D6CEBE] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#14532D]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E0D5] space-y-3">
                <h3 className="text-xs font-semibold text-[#1C1917]">
                  {isEn ? 'Active Compliance Clauses' : 'Cláusulas de Conformidade Ativas'}
                </h3>

                <label className="flex items-start gap-3 p-3 bg-[#F7F4EE] border border-[#E5E0D5] rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.includeRewardedAds}
                    onChange={(e) =>
                      onChangeConfig({ ...config, includeRewardedAds: e.target.checked })
                    }
                    className="mt-1 accent-[#14532D]"
                  />
                  <div>
                    <div className="text-sm font-medium text-[#1C1917]">
                      {isEn
                        ? 'Google AdMob Rewarded Video Ads'
                        : 'Anúncios Premiados (Rewarded Ads) do Google AdMob'}
                    </div>
                    <p className="text-xs text-[#57534E] mt-0.5">
                      {isEn
                        ? 'Includes disclosure for optional video ads that grant virtual poker chips.'
                        : 'Detalha o funcionamento de vídeos premiados opcionais em troca de fichas virtuais.'}
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-[#F7F4EE] border border-[#E5E0D5] rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.includeVirtualChipsDisclaimer}
                    onChange={(e) =>
                      onChangeConfig({
                        ...config,
                        includeVirtualChipsDisclaimer: e.target.checked,
                      })
                    }
                    className="mt-1 accent-[#14532D]"
                  />
                  <div>
                    <div className="text-sm font-medium text-[#1C1917]">
                      {isEn
                        ? 'No Real-Money Gambling Disclaimer (Essential for Poker Apps)'
                        : 'Cláusula de Jogo Recreativo Sem Apostas em Dinheiro Real (Essencial na Play Store)'}
                    </div>
                    <p className="text-xs text-[#57534E] mt-0.5">
                      {isEn
                        ? 'Prevents Play Store rejection by explicitly stating chips have zero monetary value.'
                        : 'Evita rejeição na revisão do Google Play ao declarar que as fichas são 100% recreativas e sem saque real.'}
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-[#F7F4EE] border border-[#E5E0D5] rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.includeCrashlytics}
                    onChange={(e) =>
                      onChangeConfig({ ...config, includeCrashlytics: e.target.checked })
                    }
                    className="mt-1 accent-[#14532D]"
                  />
                  <div>
                    <div className="text-sm font-medium text-[#1C1917]">
                      {isEn
                        ? 'Crash Logs & Performance Diagnostics (Android Vitals / Crashlytics)'
                        : 'Relatórios de Falhas e Diagnósticos (Android Vitals / Crashlytics)'}
                    </div>
                    <p className="text-xs text-[#57534E] mt-0.5">
                      {isEn
                        ? 'Covers automatic crash logs and ANR telemetry required by Google Play Data Safety.'
                        : 'Cobre a coleta automática de logs de erro e estabilidade exigida na Segurança dos Dados.'}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'playstore' && (
            <div className="space-y-5">
              <div className="p-4 bg-[#F7F4EE] border border-[#E5E0D5] rounded-lg">
                <h3 className="text-sm font-semibold text-[#1C1917]">
                  {isEn
                    ? 'How to fill out the "Data Safety" section in Google Play Console'
                    : 'Como preencher a seção "Segurança dos Dados" no Google Play Console'}
                </h3>
                <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                  {isEn
                    ? 'Because Extreme Poker includes the Google AdMob SDK, Google Play requires your Data Safety form to match your Privacy Policy. Use this exact checklist when submitting your app:'
                    : 'Como o Extreme Poker possui o SDK do Google AdMob, o Google Play exige que o formulário "Segurança dos Dados" coincida com esta Política de Privacidade. Use o gabarito abaixo:'}
                </p>
              </div>

              <div className="space-y-4">
                {PLAY_CONSOLE_GUIDE_STEPS.map((step) => (
                  <div
                    key={step.id}
                    className="p-4 bg-white border border-[#E5E0D5] rounded-lg space-y-2"
                  >
                    <div className="text-xs font-semibold text-[#14532D]">
                      {isEn ? step.titleEn : step.titlePt}
                    </div>
                    <p className="text-sm font-medium text-[#1C1917]">
                      {isEn ? step.questionEn : step.questionPt}
                    </p>
                    <div className="text-xs font-mono bg-[#F7F4EE] px-3 py-2 rounded border border-[#E5E0D5] text-[#1C1917]">
                      <strong>{isEn ? 'Answer to select:' : 'Resposta para marcar:'}</strong>{' '}
                      {isEn ? step.recommendedAnswerEn : step.recommendedAnswerPt}
                    </div>
                    <p className="text-xs text-[#57534E] leading-relaxed">
                      {isEn ? step.detailEn : step.detailPt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#F7F4EE] border border-[#E5E0D5] rounded-lg space-y-2">
                <h3 className="text-sm font-semibold text-[#1C1917]">
                  {isEn
                    ? 'Deploying to GitHub & Vercel (Ready Out-of-the-Box)'
                    : 'Subindo para o GitHub e Vercel (Pronto para Deploy)'}
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {isEn
                    ? 'This project is already structured for instant deployment on Vercel. Once pushed to GitHub and imported into Vercel, your root URL (e.g. https://extreme-poker-privacy.vercel.app) can be pasted directly into Google Play Console > App Content > Privacy Policy.'
                    : 'Este projeto já está 100% configurado para a Vercel. Basta enviar este repositório para o seu GitHub, importar na Vercel e colar a URL gerada (ex: https://extreme-poker-privacy.vercel.app) em Google Play Console > Conteúdo do App > Política de Privacidade.'}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-[#1C1917]">
                  {isEn
                    ? 'Alternative: Export Standalone Single-File HTML or Markdown'
                    : 'Alternativa: Exportar HTML Único Estático ou Markdown'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      handleCopy(generateStandaloneHtml(config, lang), 'html')
                    }
                    className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium bg-[#1C1917] text-[#FBF9F5] rounded-lg hover:bg-[#292524] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copiedType === 'html' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>{isEn ? 'HTML Copied!' : 'HTML Copiado!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>{isEn ? 'Copy Standalone HTML' : 'Copiar HTML Único'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownloadHtml}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium bg-white border border-[#D6CEBE] text-[#1C1917] rounded-lg hover:bg-[#F7F4EE] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isEn ? 'Download .HTML File' : 'Baixar Arquivo .HTML'}</span>
                  </button>
                </div>

                <button
                  onClick={() =>
                    handleCopy(generateMarkdownPolicy(config, lang), 'md')
                  }
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium bg-white border border-[#D6CEBE] text-[#1C1917] rounded-lg hover:bg-[#F7F4EE] transition-colors cursor-pointer whitespace-nowrap"
                >
                  {copiedType === 'md' ? (
                    <>
                      <Check className="w-4 h-4 text-[#14532D]" />
                      <span>{isEn ? 'Markdown Copied!' : 'Markdown Copiado para o GitHub!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>
                        {isEn
                          ? 'Copy Markdown (PRIVACY.md for GitHub)'
                          : 'Copiar em Markdown (PRIVACY.md para GitHub)'}
                      </span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-[#57534E]">
                  {isEn ? 'Markdown Preview:' : 'Pré-visualização em Markdown:'}
                </div>
                <pre className="p-4 bg-white border border-[#E5E0D5] rounded-lg text-[11px] font-mono text-[#292524] overflow-x-auto max-h-64 leading-relaxed">
                  {generateMarkdownPolicy(config, lang)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E5E0D5] bg-[#F7F4EE] flex items-center justify-between">
          <span className="text-xs text-[#57534E]">
            {config.appName} · <code className="font-mono">{config.packageName}</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium bg-[#14532D] text-white rounded-lg hover:bg-[#14532D]/90 transition-colors cursor-pointer whitespace-nowrap"
          >
            {isEn ? 'Done & View Policy' : 'Concluir e Ver Página'}
          </button>
        </div>
      </div>
    </div>
  );
};
