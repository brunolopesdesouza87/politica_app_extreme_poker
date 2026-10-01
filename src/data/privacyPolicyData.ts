export interface PolicyConfig {
  appName: string;
  developerName: string;
  contactEmail: string;
  packageName: string;
  effectiveDate: string;
  lastUpdated: string;
  includeAdMob: boolean;
  includeRewardedAds: boolean;
  includeCrashlytics: boolean;
  includePlayGames: boolean;
  includeVirtualChipsDisclaimer: boolean;
}

export const DEFAULT_POLICY_CONFIG: PolicyConfig = {
  appName: 'Extreme Poker',
  developerName: 'Desempenho Digital',
  contactEmail: 'brunolopesdesouza87@gmail.com',
  packageName: 'com.desempenhodigital.extremepoker',
  effectiveDate: '01 de outubro de 2026',
  lastUpdated: '01 de outubro de 2026',
  includeAdMob: true,
  includeRewardedAds: true,
  includeCrashlytics: true,
  includePlayGames: false,
  includeVirtualChipsDisclaimer: true,
};

export interface DataSafetyRow {
  categoryPt: string;
  categoryEn: string;
  dataTypePt: string;
  dataTypeEn: string;
  sdkSource: string;
  purposePt: string;
  purposeEn: string;
  collected: boolean;
  sharedWithThirdParty: boolean;
  encryptedInTransit: boolean;
  userCanResetOrOptOut: boolean;
}

export const DATA_SAFETY_MATRIX: DataSafetyRow[] = [
  {
    categoryPt: 'Identificadores do dispositivo ou outros',
    categoryEn: 'Device or other IDs',
    dataTypePt: 'ID de publicidade do Google (AAID / GAID)',
    dataTypeEn: 'Google Advertising ID (AAID / GAID)',
    sdkSource: 'Google AdMob (com.google.android.gms:play-services-ads)',
    purposePt: 'Publicidade ou marketing, Análise e Prevenção a fraudes',
    purposeEn: 'Advertising or marketing, Analytics & Fraud prevention',
    collected: true,
    sharedWithThirdParty: true,
    encryptedInTransit: true,
    userCanResetOrOptOut: true,
  },
  {
    categoryPt: 'Localização',
    categoryEn: 'Location',
    dataTypePt: 'Localização aproximada (inferida via endereço IP)',
    dataTypeEn: 'Approximate location (inferred via IP address)',
    sdkSource: 'Google AdMob SDK',
    purposePt: 'Seleção regional de anúncios, conformidade regulatória (LGPD/GDPR) e prevenção a fraudes',
    purposeEn: 'Regional ad selection, regulatory compliance (LGPD/GDPR) & fraud prevention',
    collected: true,
    sharedWithThirdParty: true,
    encryptedInTransit: true,
    userCanResetOrOptOut: true,
  },
  {
    categoryPt: 'Atividade no app',
    categoryEn: 'App activity',
    dataTypePt: 'Interações com o app e visualizações/cliques em anúncios',
    dataTypeEn: 'App interactions & ad impressions/clicks',
    sdkSource: 'Google AdMob SDK',
    purposePt: 'Análise de desempenho de anúncios, atribuição de recompensas e combate a cliques inválidos',
    purposeEn: 'Ad performance analytics, reward attribution & invalid traffic protection',
    collected: true,
    sharedWithThirdParty: true,
    encryptedInTransit: true,
    userCanResetOrOptOut: true,
  },
  {
    categoryPt: 'Informações e desempenho do app',
    categoryEn: 'App info and performance',
    dataTypePt: 'Registros de falhas (Crash logs) e Diagnósticos de desempenho',
    dataTypeEn: 'Crash logs & Performance diagnostics',
    sdkSource: 'Google Mobile Ads SDK / Android Vitals',
    purposePt: 'Estabilidade do aplicativo, correção de erros e otimização de latência',
    purposeEn: 'App stability, bug fixing & latency optimization',
    collected: true,
    sharedWithThirdParty: false,
    encryptedInTransit: true,
    userCanResetOrOptOut: false,
  },
];

export interface PlayConsoleGuideStep {
  id: string;
  titlePt: string;
  titleEn: string;
  questionPt: string;
  questionEn: string;
  recommendedAnswerPt: string;
  recommendedAnswerEn: string;
  detailPt: string;
  detailEn: string;
}

export const PLAY_CONSOLE_GUIDE_STEPS: PlayConsoleGuideStep[] = [
  {
    id: 'step-1',
    titlePt: '1. Coleta e Compartilhamento de Dados',
    titleEn: '1. Data Collection and Security',
    questionPt: 'Seu app coleta ou compartilha algum dos tipos de dados de usuário obrigatórios?',
    questionEn: 'Does your app collect or share any of the required user data types?',
    recommendedAnswerPt: 'Sim (Yes)',
    recommendedAnswerEn: 'Yes',
    detailPt: 'Como o aplicativo integra o SDK do Google AdMob, o AdMob coleta automaticamente o ID de publicidade (AAID), interações e diagnósticos.',
    detailEn: 'Because the app integrates the Google AdMob SDK, AdMob automatically collects the Advertising ID (AAID), interactions, and diagnostics.',
  },
  {
    id: 'step-2',
    titlePt: '2. Criptografia em Trânsito',
    titleEn: '2. Encryption in Transit',
    questionPt: 'Todos os dados do usuário coletados pelo seu app são criptografados em trânsito?',
    questionEn: 'Is all of the user data collected by your app encrypted in transit?',
    recommendedAnswerPt: 'Sim (Yes)',
    recommendedAnswerEn: 'Yes',
    detailPt: 'O SDK do Google AdMob transmite todos os dados utilizando conexões seguras HTTPS / TLS.',
    detailEn: 'The Google AdMob SDK transmits all data over secure HTTPS / TLS connections.',
  },
  {
    id: 'step-3',
    titlePt: '3. Mecanismo de Exclusão de Dados',
    titleEn: '3. Data Deletion Mechanism',
    questionPt: 'Você oferece uma forma de os usuários solicitarem a exclusão dos dados?',
    questionEn: 'Do you provide a way for users to request that their data is deleted?',
    recommendedAnswerPt: 'Não coleta dados de conta (ou Sim, via e-mail / redefinição de AAID)',
    recommendedAnswerEn: 'No account creation required (or Yes, via email / AAID reset)',
    detailPt: 'Se o seu app não exige criação de conta/login, marque que os dados coletados são vinculados apenas a identificadores temporários/dispositivo que o próprio usuário pode zerar nas configurações do Android.',
    detailEn: 'If your app does not require account creation/login, indicate that collected data is only tied to device identifiers that users can reset directly in Android settings.',
  },
  {
    id: 'step-4',
    titlePt: '4. Tipos de Dados a Marcar no Formulário',
    titleEn: '4. Data Types to Check in the Form',
    questionPt: 'Quais caixas selecionar na lista de Tipos de Dados do Google Play Console?',
    questionEn: 'Which checkboxes to select in the Google Play Console Data Types list?',
    recommendedAnswerPt: 'IDs do dispositivo + Localização aproximada + Interações no app + Falhas/Diagnósticos',
    recommendedAnswerEn: 'Device or other IDs + Approximate location + App interactions + Crash logs/Diagnostics',
    detailPt: 'Para cada um desses 4 itens, marque "Coletado" e "Compartilhado", processamento "Efêmero: Não", "Obrigatório para o app" e finalidade "Publicidade ou marketing / Análise / Funcionalidade do app".',
    detailEn: 'For each of these 4 items, select "Collected" and "Shared", "Processed ephemerally: No", "Required", and purpose "Advertising or marketing / Analytics / App functionality".',
  },
];
