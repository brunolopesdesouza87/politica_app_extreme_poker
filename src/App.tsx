import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Printer,
  Copy,
  Check,
  Sliders,
  ShieldCheck,
  Mail,
  FileCode2,
} from 'lucide-react';
import {
  PolicyConfig,
  DEFAULT_POLICY_CONFIG,
  DATA_SAFETY_MATRIX,
} from './data/privacyPolicyData';
import { DeveloperToolkitModal } from './components/DeveloperToolkitModal';
import { generateStandaloneHtml } from './utils/exportGenerator';

const STORAGE_KEY = 'extreme_poker_privacy_config_v2';

export default function App() {
  const [config, setConfig] = useState<PolicyConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_POLICY_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore storage errors
    }
    return DEFAULT_POLICY_CONFIG;
  });

  const [lang, setLang] = useState<'pt' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('lang') === 'en') return 'en';
    }
    return 'pt';
  });

  const [isToolkitOpen, setIsToolkitOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHtmlQuick, setCopiedHtmlQuick] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('introducao');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage errors
    }
  }, [config]);

  useEffect(() => {
    const sectionIds = [
      'introducao',
      'dados-coletados',
      'google-admob',
      'seguranca-play-store',
      'natureza-recreativa',
      'retencao-exclusao',
      'classificacao-menores',
      'direitos-lgpd',
      'contato',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isEn = lang === 'en';

  const handleCopyPageUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleQuickCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(generateStandaloneHtml(config, lang));
      setCopiedHtmlQuick(true);
      setTimeout(() => setCopiedHtmlQuick(false), 2200);
    } catch {
      // Fallback
    }
  };

  const chapters = [
    {
      id: 'introducao',
      num: '01',
      labelPt: 'Introdução e Escopo',
      labelEn: 'Introduction & Scope',
    },
    {
      id: 'dados-coletados',
      num: '02',
      labelPt: 'Dados Coletados',
      labelEn: 'Collected Data',
    },
    {
      id: 'google-admob',
      num: '03',
      labelPt: 'Google AdMob e Anúncios',
      labelEn: 'Google AdMob & Ads',
    },
    {
      id: 'seguranca-play-store',
      num: '04',
      labelPt: 'Matriz Google Play',
      labelEn: 'Play Store Data Matrix',
    },
    ...(config.includeVirtualChipsDisclaimer
      ? [
          {
            id: 'natureza-recreativa',
            num: '05',
            labelPt: 'Jogo Recreativo e Fichas',
            labelEn: 'Recreational Poker Notice',
          },
        ]
      : []),
    {
      id: 'retencao-exclusao',
      num: '06',
      labelPt: 'Retenção e Exclusão',
      labelEn: 'Retention & Deletion',
    },
    {
      id: 'classificacao-menores',
      num: '07',
      labelPt: 'Público e Menores',
      labelEn: 'Age Rating & Minors',
    },
    {
      id: 'direitos-lgpd',
      num: '08',
      labelPt: 'Direitos (LGPD / GDPR)',
      labelEn: 'Legal Rights (LGPD / GDPR)',
    },
    {
      id: 'contato',
      num: '09',
      labelPt: 'Contato do Controlador',
      labelEn: 'Controller Contact',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col">
      {/* Top Bar Contract: Strictly 3 Zones */}
      <header className="sticky top-0 z-30 bg-[#FBF9F5]/95 backdrop-blur-xs border-b border-[#E5E0D5] no-print">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-serif text-2xl font-bold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0"
          >
            {config.appName}
          </a>

          {/* Zone 2: 4-5 clean text navigation links */}
          <nav
            aria-label={isEn ? 'Document sections' : 'Seções do documento'}
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#57534E]"
          >
            <a
              href="#dados-coletados"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              {isEn ? 'Data Collection' : 'Coleta de Dados'}
            </a>
            <a
              href="#google-admob"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Google AdMob
            </a>
            <a
              href="#seguranca-play-store"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              {isEn ? 'Play Store Safety' : 'Segurança Play Store'}
            </a>
            {config.includeVirtualChipsDisclaimer && (
              <a
                href="#natureza-recreativa"
                className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
              >
                {isEn ? 'Virtual Chips' : 'Jogo Recreativo'}
              </a>
            )}
            <a
              href="#contato"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              {isEn ? 'Rights & Contact' : 'Direitos e Contato'}
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div
              className="flex items-center p-0.5 bg-[#EBE6DF] rounded-lg"
              role="group"
              aria-label="Language selector"
            >
              <button
                onClick={() => setLang('pt')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  lang === 'pt'
                    ? 'bg-[#FBF9F5] text-[#1C1917] shadow-2xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                PT-BR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  lang === 'en'
                    ? 'bg-[#FBF9F5] text-[#1C1917] shadow-2xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setIsToolkitOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-[#14532D] text-white rounded-lg hover:bg-[#14532D]/90 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isEn ? 'Customize & Play Store Guide' : 'Personalizar & Guia Play Store'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Editorial Hero Header */}
      <div id="top" className="border-b border-[#E5E0D5] bg-[#F7F4EE]/60">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          {/* Unboxed Metadata with Typographic Separators (Zero-Pill Rule) */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#57534E] mb-4">
            <span>{isEn ? 'Official Legal Document' : 'Documento Jurídico Oficial'}</span>
            <span aria-hidden="true">·</span>
            <span>
              {isEn ? 'Effective Date:' : 'Vigência:'} {config.effectiveDate}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px]">{config.packageName}</span>
            <span aria-hidden="true">·</span>
            <span>Google Play Store &amp; Google AdMob Compliant</span>
            <span aria-hidden="true">·</span>
            <span>LGPD (Lei nº 13.709/2018) &amp; GDPR</span>
          </div>

          <h1
            className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-semibold tracking-tight text-[#1C1917] leading-[1.1] max-w-3xl"
            style={{ textWrap: 'balance' }}
          >
            {isEn
              ? `Privacy Policy & Data Transparency — ${config.appName}`
              : `Política de Privacidade e Proteção de Dados — ${config.appName}`}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#44403C] max-w-2xl leading-relaxed">
            {isEn
              ? `This document establishes how ${config.developerName} processes technical telemetry, mobile advertising identifiers via Google AdMob, and user privacy rights in the ${config.appName} application on Google Play.`
              : `Este instrumento estabelece de forma clara e auditável como ${config.developerName} realiza o tratamento de dados técnicos, identificadores publicitários via Google AdMob e direitos de privacidade dos jogadores no aplicativo ${config.appName} para Android.`}
          </p>

          {/* Operational Utility Strip */}
          <div className="mt-8 pt-5 border-t border-[#E5E0D5] flex flex-wrap items-center justify-between gap-4 text-xs text-[#57534E]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>
                <strong className="text-[#1C1917] font-medium">
                  {isEn ? 'Data Controller:' : 'Controlador:'}
                </strong>{' '}
                {config.developerName}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                <strong className="text-[#1C1917] font-medium">
                  {isEn ? 'Advertising SDK:' : 'SDK de Anúncios:'}
                </strong>{' '}
                Google AdMob (Google LLC)
              </span>
              <span aria-hidden="true">·</span>
              <span>
                <strong className="text-[#1C1917] font-medium">
                  {isEn ? 'Privacy Contact:' : 'E-mail de Privacidade:'}
                </strong>{' '}
                <a
                  href={`mailto:${config.contactEmail}`}
                  className="text-[#14532D] hover:underline underline-offset-2"
                >
                  {config.contactEmail}
                </a>
              </span>
            </div>

            <div className="flex items-center gap-3 no-print">
              <button
                onClick={handleCopyPageUrl}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C1917] hover:text-[#14532D] transition-colors cursor-pointer whitespace-nowrap"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#14532D]" />
                    <span>{isEn ? 'URL Copied' : 'URL Copiada'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Copy Policy URL' : 'Copiar URL da Política'}</span>
                  </>
                )}
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={handleQuickCopyHtml}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C1917] hover:text-[#14532D] transition-colors cursor-pointer whitespace-nowrap"
              >
                {copiedHtmlQuick ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#14532D]" />
                    <span>{isEn ? 'HTML Copied!' : 'HTML Único Copiado!'}</span>
                  </>
                ) : (
                  <>
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Copy Static HTML' : 'Copiar HTML Estático'}</span>
                  </>
                )}
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C1917] hover:text-[#14532D] transition-colors cursor-pointer whitespace-nowrap"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isEn ? 'Print / PDF' : 'Imprimir / Salvar PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Asymmetric Editorial Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Sticky Chapter Navigation Rail (3 cols on desktop) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-6 no-print">
            <div>
              <div className="text-xs font-semibold text-[#57534E] pb-3 border-b border-[#E5E0D5]">
                {isEn ? 'Table of Chapters' : 'Índice de Capítulos'}
              </div>
              <nav aria-label="Chapters" className="mt-3 space-y-1">
                {chapters.map((chap) => {
                  const isActive = activeSection === chap.id;
                  return (
                    <a
                      key={chap.id}
                      href={`#${chap.id}`}
                      className={`flex items-baseline gap-2.5 py-1.5 text-xs transition-colors ${
                        isActive
                          ? 'font-semibold text-[#14532D]'
                          : 'text-[#57534E] hover:text-[#1C1917]'
                      }`}
                    >
                      <span className="font-mono text-[11px] tabular-nums opacity-75">
                        {chap.num} /
                      </span>
                      <span className="truncate">{isEn ? chap.labelEn : chap.labelPt}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Developer Helper Card in Sidebar */}
            <div className="p-4 bg-[#F7F4EE] border border-[#E5E0D5] rounded-lg space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
                <ShieldCheck className="w-4 h-4 text-[#14532D] shrink-0" />
                <span>{isEn ? 'Play Console Ready' : 'Pronto para a Play Store'}</span>
              </div>
              <p className="text-xs text-[#57534E] leading-relaxed">
                {isEn
                  ? 'Need help filling out the Google Play Data Safety questionnaire for AdMob? Open the guide.'
                  : 'Vai preencher a seção "Segurança dos Dados" no Google Play Console por causa do AdMob? Veja o gabarito.'}
              </p>
              <button
                onClick={() => setIsToolkitOpen(true)}
                className="w-full py-2 px-3 text-xs font-medium bg-white border border-[#D6CEBE] text-[#1C1917] rounded-md hover:bg-[#EBE6DF]/50 transition-colors cursor-pointer whitespace-nowrap"
              >
                {isEn ? 'Open Play Store Guide' : 'Abrir Gabarito Play Store'}
              </button>
            </div>
          </aside>

          {/* Center & Right Columns: Editorial Prose & Margin Callouts (9 cols) */}
          <div className="lg:col-span-9 space-y-14">
            {/* 01. Introduction */}
            <section id="introducao" className="scroll-mt-24 pb-12 border-b border-[#E5E0D5]">
              <div className="text-xs font-mono text-[#57534E] mb-2">
                01 / {isEn ? 'INTRODUCTION & GENERAL SCOPE' : 'INTRODUÇÃO E ESCOPO GERAL'}
              </div>
              <h2 className="font-serif text-3xl font-semibold text-[#1C1917] mb-5">
                {isEn
                  ? '01. Commitment to User Privacy and Transparency'
                  : '01. Compromisso com a Privacidade e Transparência'}
              </h2>
              <div className="prose-container space-y-4 text-[16px] leading-[1.8] text-[#292524] max-w-2xl">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-[#1C1917]">
                  {isEn ? (
                    <>
                      This Privacy Policy describes how <strong>{config.developerName}</strong>{' '}
                      (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;Developer&rdquo;) collects,
                      uses, processes, and safeguards information when you download, install, or play
                      the mobile application <strong>{config.appName}</strong> (package identifier{' '}
                      <code className="font-mono text-xs bg-[#F3EFE6] px-1.5 py-0.5 rounded">
                        {config.packageName}
                      </code>
                      ), officially distributed through the Google Play Store.
                    </>
                  ) : (
                    <>
                      Esta Política de Privacidade descreve de maneira clara, objetiva e acessível
                      como <strong>{config.developerName}</strong> (&ldquo;nós&rdquo;,
                      &ldquo;nosso&rdquo; ou &ldquo;Desenvolvedor&rdquo;) coleta, utiliza, armazena e
                      protege informações quando você baixa, instala ou joga o aplicativo móvel{' '}
                      <strong>{config.appName}</strong> (identificado pelo pacote{' '}
                      <code className="font-mono text-xs bg-[#F3EFE6] px-1.5 py-0.5 rounded">
                        {config.packageName}
                      </code>
                      ), distribuído oficialmente na Google Play Store.
                    </>
                  )}
                </p>
                <p>
                  {isEn
                    ? `Our privacy governance is strictly aligned with the Brazilian General Data Protection Law (Lei Geral de Proteção de Dados Pessoais — LGPD, Law No. 13,709/2018), the European Union General Data Protection Regulation (GDPR — Regulation EU 2016/679), the Children's Online Privacy Protection Act (COPPA), and the Google Play Developer Program Policies.`
                    : `Nossas práticas de governança e proteção de dados foram estruturadas em estrita conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei Federal nº 13.709/2018), o Marco Civil da Internet (Lei nº 12.965/2014), o Regulamento Geral sobre a Proteção de Dados da União Europeia (GDPR) e os requisitos de Segurança dos Dados do Programa para Desenvolvedores do Google Play.`}
                </p>
                <p>
                  {isEn
                    ? `By installing or using ${config.appName}, you acknowledge the practices detailed in this Policy. Whenever required by applicable law, we request your explicit consent before activating personalized advertising features.`
                    : `Ao instalar ou utilizar o ${config.appName}, você declara estar ciente das regras detalhadas neste documento. Sempre que exigido pela legislação aplicável, solicitaremos seu consentimento prévio e expresso para funcionalidades de personalização publicitária.`}
                </p>
              </div>
            </section>

            {/* 02. Data Collected Automatically */}
            <section id="dados-coletados" className="scroll-mt-24 pb-12 border-b border-[#E5E0D5]">
              <div className="text-xs font-mono text-[#57534E] mb-2">
                02 / {isEn ? 'TECHNICAL TELEMETRY & DATA CATEGORIES' : 'TELEMETRIA TÉCNICA E CATEGORIAS DE DADOS'}
              </div>
              <h2 className="font-serif text-3xl font-semibold text-[#1C1917] mb-5">
                {isEn
                  ? '02. Information We Collect Automatically and Why'
                  : '02. Dados Coletados Automaticamente e Finalidades'}
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                <div className="xl:col-span-8 space-y-4 text-[16px] leading-[1.8] text-[#292524] max-w-2xl">
                  <p>
                    {isEn ? (
                      <>
                        <strong>{config.appName}</strong> is designed with a data-minimization
                        architecture: we do <strong>not</strong> require you to register civil
                        documents (such as national ID or tax numbers), residential addresses, phone
                        numbers, or banking credentials to play.
                      </>
                    ) : (
                      <>
                        O <strong>{config.appName}</strong> foi construído sob o princípio da
                        minimização de dados: <strong>não exigimos</strong> o preenchimento de
                        cadastro com CPF, RG, endereço residencial, número de telefone ou dados
                        bancários/cartões de crédito para que você possa acessar e jogar.
                      </>
                    )}
                  </p>
                  <p>
                    {isEn
                      ? `However, to display advertisements that keep the Application free, ensure graphic stability across Android devices, and protect against automated fraud, third-party Software Development Kits (specifically Google AdMob) automatically collect the following categories of technical data:`
                      : `Entretanto, para viabilizar a exibição de anúncios que mantêm o aplicativo gratuito, garantir a estabilidade gráfica em diferentes aparelhos Android e prevenir fraudes, bibliotecas de terceiros integradas ao aplicativo (especificamente o SDK do Google AdMob) coletam automaticamente as seguintes categorias técnicas:`}
                  </p>

                  <ul className="space-y-3 pl-5 list-disc marker:text-[#14532D]">
                    <li>
                      <strong>
                        {isEn
                          ? 'Device & Advertising Identifiers:'
                          : 'Identificadores do Dispositivo e de Publicidade:'}
                      </strong>{' '}
                      {isEn
                        ? 'Your Google Advertising ID (AAID / GAID), hardware model, manufacturer, Android OS version, screen dimensions, carrier name, and system language.'
                        : 'O ID de publicidade do Google (Google Advertising ID — AAID/GAID), fabricante e modelo do aparelho celular, versão do sistema operacional Android, idioma do sistema e resolução de tela.'}
                    </li>
                    <li>
                      <strong>
                        {isEn
                          ? 'Network & Approximate Location (via IP):'
                          : 'Rede e Localização Aproximada (via Endereço IP):'}
                      </strong>{' '}
                      {isEn
                        ? 'Your Internet Protocol (IP) address is processed to estimate your approximate country or state/region so ads can be served in the proper language and regional privacy laws (LGPD/GDPR) can be enforced. The Application does NOT request or access precise GPS location.'
                        : 'Seu endereço IP é utilizado de forma automatizada para estimar apenas a região, estado ou país aproximado, garantindo que os anúncios sejam exibidos no idioma correto e que as normas locais de privacidade (como LGPD e GDPR) sejam aplicadas. O aplicativo NÃO solicita permissão de GPS nem coleta localização geográfica exata.'}
                    </li>
                    <li>
                      <strong>
                        {isEn
                          ? 'App Activity & Advertising Events:'
                          : 'Atividade no App e Interações Publicitárias:'}
                      </strong>{' '}
                      {isEn
                        ? 'Session launch timestamps, banner/interstitial impressions, ad clicks, and completion confirmation for optional rewarded video advertisements.'
                        : 'Registros de inicialização do aplicativo, visualizações (impressões) de banners ou anúncios intersticiais, cliques em anúncios e confirmação de conclusão de vídeos premiados opcionais (Rewarded Ads).'}
                    </li>
                    {config.includeCrashlytics && (
                      <li>
                        <strong>
                          {isEn
                            ? 'Crash Logs & Performance Diagnostics:'
                            : 'Registros de Falhas (Crash Logs) e Diagnósticos:'}
                        </strong>{' '}
                        {isEn
                          ? 'Anonymous diagnostic reports when a crash or Application Not Responding (ANR) event occurs, memory allocation metrics, and rendering latency.'
                          : 'Relatórios técnicos anônimos gerados caso o aplicativo apresente fechamento inesperado (crash) ou lentidão (ANR), permitindo a rápida correção de erros em atualizações futuras.'}
                      </li>
                    )}
                  </ul>
                </div>

                {/* Archival Margin Note */}
                <div className="xl:col-span-4 p-5 bg-[#F7F4EE] border-l-2 border-[#14532D] text-xs text-[#44403C] space-y-2">
                  <div className="font-semibold text-[#1C1917]">
                    {isEn ? 'Zero Sensitive Permissions' : 'Zero Permissões Sensíveis'}
                  </div>
                  <p className="leading-relaxed">
                    {isEn
                      ? `${config.appName} never requests access to your device camera, microphone, contact list, SMS messages, photo gallery, or precise GPS coordinates.`
                      : `O ${config.appName} jamais solicita acesso à câmera, microfone, agenda de contatos, mensagens SMS, galeria de fotos ou localização GPS precisa do seu telefone.`}
                  </p>
                </div>
              </div>
            </section>

            {/* 03. Google AdMob & Mobile Advertising */}
            <section id="google-admob" className="scroll-mt-24 pb-12 border-b border-[#E5E0D5]">
              <div className="text-xs font-mono text-[#57534E] mb-2">
                03 / {isEn ? 'GOOGLE ADMOB SDK DISCLOSURE' : 'DIVULGAÇÃO DO SDK GOOGLE ADMOB'}
              </div>
              <h2 className="font-serif text-3xl font-semibold text-[#1C1917] mb-5">
                {isEn
                  ? '03. Google AdMob & Advertising Technologies'
                  : '03. Integração com Google AdMob e Publicidade Móvel'}
              </h2>

              <div className="space-y-4 text-[16px] leading-[1.8] text-[#292524] max-w-2xl">
                <p>
                  {isEn ? (
                    <>
                      To keep <strong>{config.appName}</strong> free for all players, we integrate{' '}
                      <strong>Google AdMob (Google Mobile Ads SDK)</strong>, an advertising platform
                      operated by <strong>Google LLC</strong>.
                    </>
                  ) : (
                    <>
                      Para manter o <strong>{config.appName}</strong> gratuito para todos os
                      usuários, utilizamos o <strong>Google AdMob (Google Mobile Ads SDK)</strong>,
                      plataforma de publicidade móvel operada pela <strong>Google LLC</strong>.
                    </>
                  )}
                </p>

                <p>
                  {isEn
                    ? `Google AdMob uses your device's Google Advertising ID (AAID) and technical diagnostic signals to serve advertisements within the Application. Depending on your region and the consent choices you make in the in-app privacy prompt (Google User Messaging Platform — UMP), advertisements may fall into two categories:`
                    : `O SDK do Google AdMob utiliza o ID de publicidade do Android (AAID) e sinais técnicos de rede para veicular anúncios dentro do aplicativo. Dependendo da sua localização e da sua escolha no banner de consentimento de privacidade (Google User Messaging Platform — UMP), os anúncios podem operar em duas modalidades:`}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="p-4 bg-[#F7F4EE] border border-[#E5E0D5] rounded-lg">
                    <h3 className="text-sm font-semibold text-[#1C1917] mb-1.5">
                      {isEn ? 'Personalized Advertising' : 'Anúncios Personalizados'}
                    </h3>
                    <p className="text-xs text-[#44403C] leading-relaxed">
                      {isEn
                        ? 'When you grant consent, Google AdMob may use your Advertising ID and demographic/interest signals to show ads that are more relevant to your profile.'
                        : 'Mediante seu consentimento, o AdMob utiliza o identificador de publicidade para exibir anúncios mais relevantes ao seu perfil, medir conversões e evitar anúncios repetitivos.'}
                    </p>
                  </div>

                  <div className="p-4 bg-[#F7F4EE] border border-[#E5E0D5] rounded-lg">
                    <h3 className="text-sm font-semibold text-[#1C1917] mb-1.5">
                      {isEn ? 'Non-Personalized Advertising' : 'Anúncios Não Personalizados'}
                    </h3>
                    <p className="text-xs text-[#44403C] leading-relaxed">
                      {isEn
                        ? 'If you decline personalization, AdMob serves contextual ads based only on the app topic (card games) and coarse region, while still using device IDs for frequency capping and fraud prevention.'
                        : 'Caso você opte por não personalizar, os anúncios serão exibidos apenas com base no contexto do jogo e no idioma/país aproximado, usando o identificador apenas para limite de frequência e combate a fraudes.'}
                    </p>
                  </div>
                </div>

                {config.includeRewardedAds && (
                  <p>
                    <strong>
                      {isEn
                        ? 'Rewarded Video Advertisements (Rewarded Ads):'
                        : 'Anúncios em Vídeo Premiados (Rewarded Ads):'}
                    </strong>{' '}
                    {isEn
                      ? `Within ${config.appName}, players may optionally choose to watch a short video advertisement provided by Google AdMob in exchange for in-game virtual chips or recreational bonuses. Watching rewarded ads is always voluntary, and completion callbacks only verify that the video finished playing to grant the virtual item.`
                      : `No ${config.appName}, o jogador pode optar voluntariamente por assistir a um vídeo publicitário do Google AdMob para receber fichas virtuais de bônus ou recargas recreativas na mesa. A visualização é 100% opcional e o retorno técnico do SDK serve exclusivamente para confirmar a conclusão do vídeo e liberar a recompensa virtual.`}
                  </p>
                )}

                {/* Step-by-step Android Opt-Out Box */}
                <div className="p-5 bg-white border border-[#E5E0D5] rounded-lg space-y-3 my-6">
                  <div className="text-sm font-semibold text-[#1C1917]">
                    {isEn
                      ? 'How to Reset or Delete Your Advertising ID on Android'
                      : 'Como Redefinir ou Excluir seu ID de Publicidade no Android'}
                  </div>
                  <p className="text-xs text-[#44403C] leading-relaxed">
                    {isEn
                      ? 'You can revoke personalized ads or permanently delete your Advertising ID (AAID) at any time directly through your Android operating system settings:'
                      : 'Você possui controle direto no sistema operacional Android para zerar ou excluir definitivamente o seu identificador de publicidade (AAID) a qualquer momento:'}
                  </p>
                  <div className="font-mono text-xs bg-[#F7F4EE] p-3 rounded border border-[#E5E0D5] text-[#1C1917]">
                    {isEn
                      ? 'Settings > Google > All Services > Ads > Reset advertising ID / Delete advertising ID'
                      : 'Configurações do Android > Google > Todos os serviços > Anúncios > Redefinir ID de publicidade (ou Excluir ID de publicidade)'}
                  </div>
                </div>

                {/* Official Google Links Required by Play Store Review */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-[#1C1917]">
                    {isEn
                      ? 'Official Google LLC Privacy & AdMob Documentation:'
                      : 'Links Oficiais da Política de Privacidade da Google LLC e AdMob:'}
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#14532D] hover:underline underline-offset-4 font-medium"
                      >
                        <span>
                          {isEn
                            ? 'Google Privacy Policy (https://policies.google.com/privacy)'
                            : 'Política de Privacidade do Google (https://policies.google.com/privacy)'}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://policies.google.com/technologies/partner-sites"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#14532D] hover:underline underline-offset-4 font-medium"
                      >
                        <span>
                          {isEn
                            ? 'How Google uses information from sites or apps that use our services'
                            : 'Como o Google utiliza dados de aplicativos e sites parceiros'}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://policies.google.com/technologies/ads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#14532D] hover:underline underline-offset-4 font-medium"
                      >
                        <span>
                          {isEn
                            ? 'Google Advertising Technologies & Partner Providers'
                            : 'Tecnologias de Publicidade do Google e Provedores de Anúncios'}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 04. Google Play Data Safety Matrix */}
            <section
              id="seguranca-play-store"
              className="scroll-mt-24 pb-12 border-b border-[#E5E0D5]"
            >
              <div className="text-xs font-mono text-[#57534E] mb-2">
                04 / {isEn ? 'GOOGLE PLAY DATA SAFETY MATRIX' : 'MATRIZ DE SEGURANÇA DOS DADOS (PLAY STORE)'}
              </div>
              <h2 className="font-serif text-3xl font-semibold text-[#1C1917] mb-3">
                {isEn
                  ? '04. Google Play Store Data Safety Summary'
                  : '04. Quadro de Transparência — Segurança dos Dados (Google Play)'}
              </h2>
              <p className="text-sm text-[#44403C] max-w-2xl mb-6 leading-relaxed">
                {isEn
                  ? `In accordance with Google Play Store Data Safety transparency guidelines, the table below details every technical data element handled by ${config.appName} and its integrated Google AdMob SDK:`
                  : `Em cumprimento às diretrizes de transparência da seção "Segurança dos Dados" (Data Safety) da Google Play Store, apresentamos abaixo o mapeamento exato dos dados tratados pelo ${config.appName} e pelo SDK Google AdMob:`}
              </p>

              <div className="overflow-x-auto border border-[#E5E0D5] rounded-lg bg-white">
                <table className="w-full text-left border-collapse text-xs sm:text-sm tabular-nums">
                  <thead>
                    <tr className="bg-[#F7F4EE] border-b border-[#E5E0D5] text-[#1C1917]">
                      <th className="py-3.5 px-4 font-semibold">
                        {isEn ? 'Data Category' : 'Categoria de Dados'}
                      </th>
                      <th className="py-3.5 px-4 font-semibold">
                        {isEn ? 'Specific Data Type' : 'Tipo de Dado'}
                      </th>
                      <th className="py-3.5 px-4 font-semibold">
                        {isEn ? 'SDK / Origin' : 'SDK / Origem'}
                      </th>
                      <th className="py-3.5 px-4 font-semibold">
                        {isEn ? 'Purpose' : 'Finalidade'}
                      </th>
                      <th className="py-3.5 px-4 font-semibold">
                        {isEn ? 'Security & Control' : 'Segurança e Controle'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E0D5] text-[#292524]">
                    {DATA_SAFETY_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#FBF9F5] transition-colors">
                        <td className="py-3.5 px-4 font-medium text-[#1C1917]">
                          {isEn ? row.categoryEn : row.categoryPt}
                        </td>
                        <td className="py-3.5 px-4">
                          {isEn ? row.dataTypeEn : row.dataTypePt}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-[#57534E]">
                          {row.sdkSource}
                        </td>
                        <td className="py-3.5 px-4 text-xs leading-relaxed">
                          {isEn ? row.purposeEn : row.purposePt}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-[#44403C]">
                          <div>
                            {row.encryptedInTransit
                              ? isEn
                                ? 'Encrypted (HTTPS / TLS 1.3)'
                                : 'Criptografado (HTTPS / TLS 1.3)'
                              : '—'}
                          </div>
                          <div className="text-[#57534E] mt-0.5">
                            {row.userCanResetOrOptOut
                              ? isEn
                                ? 'Resettable in Android Settings'
                                : 'Redefinível nos Ajustes do Android'
                              : isEn
                              ? 'Essential stability telemetry'
                              : 'Telemetria essencial de estabilidade'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 05. Recreational Nature & Virtual Chips Disclaimer */}
            {config.includeVirtualChipsDisclaimer && (
              <section
                id="natureza-recreativa"
                className="scroll-mt-24 pb-12 border-b border-[#E5E0D5]"
              >
                <div className="text-xs font-mono text-[#57534E] mb-2">
                  05 /{' '}
                  {isEn
                    ? 'RECREATIONAL SIMULATION & VIRTUAL CURRENCY'
                    : 'NATUREZA RECREATIVA E MOEDAS VIRTUAIS'}
                </div>
                <h2 className="font-serif text-3xl font-semibold text-[#1C1917] mb-5">
                  {isEn
                    ? '05. Recreational Poker Simulation & Virtual Chips Policy'
                    : '05. Natureza Recreativa, Fichas Virtuais e Ausência de Apostas Reais'}
                </h2>
                <div className="space-y-4 text-[16px] leading-[1.8] text-[#292524] max-w-2xl">
                  <p>
                    {isEn ? (
                      <>
                        <strong>{config.appName}</strong> is a recreational card game simulation
                        created strictly for casual entertainment and sport-of-the-mind enjoyment.
                      </>
                    ) : (
                      <>
                        O <strong>{config.appName}</strong> é um jogo eletrônico de simulação de
                        poker voltado exclusivamente ao entretenimento recreativo e passatempo.
                      </>
                    )}
                  </p>
                  <ul className="space-y-2.5 pl-5 list-disc marker:text-[#14532D]">
                    <li>
                      <strong>
                        {isEn
                          ? 'No Real-Money Gambling:'
                          : 'Ausência de Apostas com Dinheiro Real:'}
                      </strong>{' '}
                      {isEn
                        ? 'The Application does NOT offer real-money gambling, wagering, sports betting, or any mechanism to win real money, fiat currency, cryptocurrency, or tangible prizes.'
                        : 'O Aplicativo NÃO realiza, intermedia nem permite apostas em dinheiro real (no real-money gambling), tampouco oferece prêmios em moeda corrente, transferências via PIX, criptoativos ou bens materiais com base no resultado das partidas.'}
                    </li>
                    <li>
                      <strong>
                        {isEn
                          ? 'Non-Transferable Virtual Chips:'
                          : 'Fichas Estritamente Virtuais e Intransferíveis:'}
                      </strong>{' '}
                      {isEn
                        ? 'All chips, points, table balances, or tournament trophies inside the Application—including bonus chips earned by watching Google AdMob rewarded ads—are purely fictional and hold zero real-world monetary value. They cannot be cashed out, redeemed, sold, or transferred.'
                        : 'Todas as fichas, pontuações, saldos de mesa ou troféus exibidos no Aplicativo — incluindo fichas de bônus recebidas ao assistir anúncios premiados do Google AdMob — possuem caráter meramente lúdico, não têm valor financeiro e não podem ser sacados, convertidos, vendidos ou trocados por dinheiro real.'}
                    </li>
                    <li>
                      <strong>
                        {isEn
                          ? 'Responsible Entertainment:'
                          : 'Entretenimento Responsável:'}
                      </strong>{' '}
                      {isEn
                        ? 'Practice or success within a recreational poker video game does not imply future success at real-money gambling activities.'
                        : 'A prática ou o bom desempenho em jogos recreativos de poker simulado não garante nem sugere sucesso futuro em atividades de apostas com dinheiro real.'}
                    </li>
                  </ul>
                </div>
              </section>
            )}

            {/* 06. Data Security, Retention & Deletion */}
            <section id="retencao-exclusao" className="scroll-mt-24 pb-12 border-b border-[#E5E0D5]">
              <div className="text-xs font-mono text-[#57534E] mb-2">
                06 / {isEn ? 'SECURITY, RETENTION & DELETION' : 'SEGURANÇA, RETENÇÃO E EXCLUSÃO DE DADOS'}
              </div>
              <h2 className="font-serif text-3xl font-semibold text-[#1C1917] mb-5">
                {isEn
                  ? '06. Information Security, Storage & Data Deletion'
                  : '06. Segurança da Informação, Retenção e Exclusão de Dados'}
              </h2>
              <div className="space-y-4 text-[16px] leading-[1.8] text-[#292524] max-w-2xl">
                <p>
                  <strong>
                    {isEn ? 'Encryption in Transit:' : 'Criptografia em Trânsito:'}
                  </strong>{' '}
                  {isEn
                    ? 'All communication between the Application, Google AdMob servers, and diagnostic endpoints is encrypted in transit using Transport Layer Security (HTTPS / TLS 1.3).'
                    : 'Toda a transmissão de telemetria e requisições de anúncios entre o Aplicativo e os servidores do Google AdMob ocorre de forma criptografada em trânsito via protocolo seguro HTTPS / TLS 1.3.'}
                </p>
                <p>
                  <strong>
                    {isEn ? 'Local Game Progress:' : 'Armazenamento Local de Progresso:'}
                  </strong>{' '}
                  {isEn
                    ? 'Your local game preferences (such as audio volume, visual deck styles, and local recreational chip count) are stored on your device. Uninstalling the Application or clearing application storage in Android Settings permanently erases all local game data.'
                    : 'Preferências locais de jogo (como volume de efeitos sonoros, tema visual do baralho e saldo local de fichas recreativas) são salvas diretamente no armazenamento interno do seu dispositivo. Ao desinstalar o aplicativo ou clicar em "Limpar Dados" nas configurações do Android, esses registros locais são apagados de forma imediata e definitiva.'}
                </p>
                <p>
                  <strong>
                    {isEn
                      ? 'How to Delete Advertising & Telemetry Data:'
                      : 'Como Excluir Dados de Publicidade e Telemetria:'}
                  </strong>{' '}
                  {isEn
                    ? `Because ${config.appName} does not maintain a proprietary database of personal accounts, you can immediately sever any association with your device's advertising profile by selecting "Delete advertising ID" in your Android system settings (Settings > Google > Ads). If you have contacted our support team via email and wish to have your correspondence erased, simply send a deletion request to ${config.contactEmail}.`
                    : `Como o ${config.appName} não armazena contas pessoais nominativas em banco de dados próprio, você pode desvincular e excluir imediatamente o identificador publicitário associado ao seu aparelho acessando "Configurações > Google > Anúncios > Excluir ID de publicidade" no seu Android. Caso tenha entrado em contato conosco por e-mail e deseje a exclusão do histórico de mensagens, basta solicitar diretamente através de ${config.contactEmail}.`}
                </p>
              </div>
            </section>

            {/* 07. Age Rating & Children's Privacy */}
            <section
              id="classificacao-menores"
              className="scroll-mt-24 pb-12 border-b border-[#E5E0D5]"
            >
              <div className="text-xs font-mono text-[#57534E] mb-2">
                07 / {isEn ? 'AGE RATING & MINORS PROTECTION' : 'CLASSIFICAÇÃO INDICATIVA E PROTEÇÃO DE MENORES'}
              </div>
              <h2 className="font-serif text-3xl font-semibold text-[#1C1917] mb-5">
                {isEn
                  ? "07. Age Classification & Children's Privacy"
                  : '07. Classificação Indicativa e Privacidade de Crianças e Adolescentes'}
              </h2>
              <div className="space-y-4 text-[16px] leading-[1.8] text-[#292524] max-w-2xl">
                <p>
                  {isEn
                    ? `Because ${config.appName} simulates traditional poker card rules, the Application is aimed strictly at audiences meeting the official age rating displayed on its Google Play Store listing (evaluated via the International Age Rating Coalition — IARC).`
                    : `Por simular a dinâmica tradicional de partidas de poker, o ${config.appName} é destinado exclusivamente ao público que atende à classificação indicativa oficial exibida na página do aplicativo na Google Play Store (definida conforme os critérios do sistema internacional IARC e do Ministério da Justiça).`}
                </p>
                <p>
                  {isEn
                    ? `We do not knowingly target, solicit, or collect personal information from children under the age of 13 (or under the applicable statutory age limit in your country). In addition, Google AdMob is configured to respect age-appropriate ad serving policies. If a parent or legal guardian becomes aware that a minor has sent personal information to our support channel, please contact us at ${config.contactEmail} so we can immediately delete such records.`
                    : `Não direcionamos o aplicativo a crianças nem coletamos intencionalmente dados pessoais de menores de 13 anos (ou idade mínima equivalente na jurisdição do usuário). Caso qualquer pai ou responsável legal identifique o envio inadvertido de informações por uma criança ao nosso canal de suporte, deverá entrar em contato pelo e-mail ${config.contactEmail} para providenciarmos a exclusão imediata.`}
                </p>
              </div>
            </section>

            {/* 08. User Legal Rights (LGPD & GDPR) */}
            <section id="direitos-lgpd" className="scroll-mt-24 pb-12 border-b border-[#E5E0D5]">
              <div className="text-xs font-mono text-[#57534E] mb-2">
                08 / {isEn ? 'YOUR PRIVACY RIGHTS (LGPD & GDPR)' : 'DIREITOS DO TITULAR (LGPD E GDPR)'}
              </div>
              <h2 className="font-serif text-3xl font-semibold text-[#1C1917] mb-5">
                {isEn
                  ? '08. Your Data Protection Rights (LGPD & GDPR)'
                  : '08. Seus Direitos Previstos na LGPD (Art. 18) e no GDPR'}
              </h2>
              <div className="space-y-4 text-[16px] leading-[1.8] text-[#292524] max-w-2xl">
                <p>
                  {isEn
                    ? 'Under the Brazilian General Data Protection Law (LGPD — Article 18) and the European GDPR, you hold the following rights regarding your data:'
                    : 'Nos termos do Artigo 18 da Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD) e do Regulamento Europeu (GDPR), são assegurados a você os seguintes direitos:'}
                </p>
                <ul className="space-y-2.5 pl-5 list-disc marker:text-[#14532D]">
                  <li>
                    <strong>
                      {isEn
                        ? 'Right to Information & Transparency:'
                        : 'Direito de Confirmação e Transparência:'}
                    </strong>{' '}
                    {isEn
                      ? 'Clear, accessible information about which third-party SDKs (Google AdMob) process device identifiers and for what purpose.'
                      : 'Acesso claro e transparente sobre quais bibliotecas de terceiros (Google AdMob) operam no aplicativo e quais categorias de identificadores são tratadas.'}
                  </li>
                  <li>
                    <strong>
                      {isEn
                        ? 'Right to Revoke Consent (Opt-Out):'
                        : 'Direito de Revogação do Consentimento (Opt-Out):'}
                    </strong>{' '}
                    {isEn
                      ? 'Freedom to withdraw consent for personalized advertising at any moment via the in-app privacy settings or Android system settings without losing access to the game.'
                      : 'Liberdade para retirar o consentimento de anúncios personalizados a qualquer momento nas configurações de privacidade ou nos ajustes do sistema Android, sem qualquer bloqueio ao uso recreativo do jogo.'}
                  </li>
                  <li>
                    <strong>
                      {isEn
                        ? 'Right to Deletion & Anonymization:'
                        : 'Direito de Eliminação e Anonimização:'}
                    </strong>{' '}
                    {isEn
                      ? 'Ability to reset or permanently delete your Advertising ID on your device and request deletion of any support correspondence.'
                      : 'Possibilidade de redefinir ou excluir o ID de publicidade diretamente no seu aparelho e solicitar a eliminação de qualquer comunicação enviada ao suporte.'}
                  </li>
                </ul>
              </div>
            </section>

            {/* 09. Contact the Controller */}
            <section id="contato" className="scroll-mt-24 pb-6">
              <div className="text-xs font-mono text-[#57534E] mb-2">
                09 / {isEn ? 'DATA CONTROLLER & DPO CONTACT' : 'CONTATO DO CONTROLADOR E ENCARREGADO'}
              </div>
              <h2 className="font-serif text-3xl font-semibold text-[#1C1917] mb-5">
                {isEn
                  ? '09. Updates to This Policy & Contact Information'
                  : '09. Atualizações desta Política e Canal de Contato'}
              </h2>
              <div className="space-y-4 text-[16px] leading-[1.8] text-[#292524] max-w-2xl">
                <p>
                  {isEn
                    ? `We may update this Privacy Policy periodically to reflect changes in ${config.appName}, updates to the Google AdMob SDK, or new legal requirements from Google Play. Whenever a material update occurs, the "Last Updated" date at the top of this page will be revised.`
                    : `Esta Política de Privacidade poderá ser atualizada periodicamente para refletir melhorias no ${config.appName}, atualizações técnicas do SDK Google AdMob ou novas exigências regulatórias da Google Play Store. Sempre que houver atualização relevante, a data de revisão no topo desta página será atualizada.`}
                </p>
                <p>
                  {isEn
                    ? 'If you have any questions, requests, or inquiries regarding this Privacy Policy or data protection in Extreme Poker, please contact the responsible controller directly:'
                    : 'Em caso de dúvidas, solicitações ou exercício de direitos relacionados a esta Política de Privacidade ou ao aplicativo Extreme Poker, entre em contato diretamente com o responsável pelo tratamento de dados:'}
                </p>

                <div className="p-6 bg-[#F7F4EE] border border-[#E5E0D5] rounded-lg space-y-3 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-[#57534E]">
                        {isEn ? 'Application Name' : 'Aplicativo'}
                      </div>
                      <div className="font-semibold text-[#1C1917] mt-0.5">{config.appName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#57534E]">
                        {isEn ? 'Developer / Controller' : 'Desenvolvedor / Controlador'}
                      </div>
                      <div className="font-semibold text-[#1C1917] mt-0.5">
                        {config.developerName}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#57534E]">
                        {isEn ? 'Package Identifier' : 'Identificador do Pacote'}
                      </div>
                      <div className="font-mono text-xs text-[#1C1917] mt-0.5">
                        {config.packageName}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#57534E]">
                        {isEn ? 'Official Contact Email' : 'E-mail Oficial de Contato'}
                      </div>
                      <a
                        href={`mailto:${config.contactEmail}`}
                        className="inline-flex items-center gap-1.5 font-medium text-[#14532D] hover:underline underline-offset-4 mt-0.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{config.contactEmail}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E5E0D5] bg-[#F7F4EE] py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#57534E]">
          <div>
            © {new Date().getFullYear()} {config.developerName} · {config.appName} (
            <code className="font-mono">{config.packageName}</code>).{' '}
            {isEn ? 'All rights reserved.' : 'Todos os direitos reservados.'}
          </div>
          <div className="flex flex-wrap items-center gap-4 no-print">
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1C1917] hover:underline underline-offset-4"
            >
              Google Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1C1917] hover:underline underline-offset-4"
            >
              Google AdMob Terms
            </a>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsToolkitOpen(true)}
              className="text-[#14532D] font-medium hover:underline underline-offset-4 cursor-pointer"
            >
              {isEn ? 'Customize / Export for Vercel' : 'Personalizar / Exportar para Vercel'}
            </button>
          </div>
        </div>
      </footer>

      {/* Customization & Play Store Guide Drawer */}
      <DeveloperToolkitModal
        isOpen={isToolkitOpen}
        onClose={() => setIsToolkitOpen(false)}
        config={config}
        onChangeConfig={setConfig}
        lang={lang}
      />
    </div>
  );
}
