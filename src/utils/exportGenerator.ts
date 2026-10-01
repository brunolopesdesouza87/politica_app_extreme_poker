import { PolicyConfig, DATA_SAFETY_MATRIX } from '../data/privacyPolicyData';

export function generateMarkdownPolicy(config: PolicyConfig, lang: 'pt' | 'en'): string {
  if (lang === 'en') {
    return `# Privacy Policy — ${config.appName}

**Effective Date:** ${config.effectiveDate}  
**Last Updated:** ${config.lastUpdated}  
**Developer / Data Controller:** ${config.developerName}  
**Android Package ID:** \`${config.packageName}\`  
**Support & Privacy Contact:** ${config.contactEmail}

---

## 01. Introduction & Scope

This Privacy Policy explains how **${config.developerName}** ("we", "our", or "Developer") handles information when you install, access, or play the **${config.appName}** mobile application ("Application") distributed via the Google Play Store.

We respect your privacy and are committed to complying with the Brazilian General Data Protection Law (**LGPD** — Law No. 13,709/2018), the European Union General Data Protection Regulation (**GDPR**), and the **Google Play Developer Program Policies**.

---

## 02. Data Collection & Automatically Collected Information

**${config.appName}** does not require you to submit civil identification documents, bank accounts, or sensitive personal records to play. However, to deliver advertising, maintain stability, and prevent fraud, integrated third-party Software Development Kits (SDKs) automatically collect limited technical telemetry:

- **Device & Advertising Identifiers:** Google Advertising ID (AAID / GAID), device manufacturer, hardware model, operating system version, screen resolution, and system language.
- **Network & Approximate Location:** IP address (used to infer approximate country/region for regional ad delivery, fraud protection, and privacy regulation compliance). We do **not** access precise GPS coordinates.
- **App Activity & Ad Interactions:** Session launch events, gameplay interaction metrics, ad views (impressions), ad clicks, and rewarded video completion triggers.
- **Diagnostics & Crash Telemetry:** Crash stack traces, ANR (Application Not Responding) diagnostics, memory usage, and frame rate stability metrics.

---

## 03. Google AdMob & Advertising Disclosure

${config.appName} uses **Google AdMob (Google Mobile Ads SDK)**, an advertising service provided by Google LLC, to monetize and maintain the Application free of charge.

### How Google AdMob Works in ${config.appName}:
1. **Advertising ID (AAID):** Google AdMob accesses your Android Advertising ID to limit ad frequency, measure ad effectiveness, detect invalid click traffic, and—where permitted by your consent settings—display personalized ads tailored to your interests.
2. **Cookies & Mobile Identifiers:** AdMob and its certified ad technology providers may use mobile identifiers and diagnostic signals to serve banner, interstitial${config.includeRewardedAds ? ', and rewarded video' : ''} advertisements.
3. **Opt-Out & Reset Controls:** You can reset your Advertising ID or opt out of personalized advertising at any time on your Android device via:
   \`Settings > Google > All Services > Ads > Delete advertising ID / Reset advertising ID\`.

### Official Google Privacy Resources:
- **Google Privacy Policy:** https://policies.google.com/privacy
- **How Google uses information from sites or apps that use our services:** https://policies.google.com/technologies/partner-sites
- **Google Advertising Policies & Technologies:** https://policies.google.com/technologies/ads

---

## 04. Google Play Data Safety Matrix

| Category | Specific Data Type | SDK / Source | Purpose | Encrypted in Transit | User Opt-Out / Reset |
| :--- | :--- | :--- | :--- | :--- | :--- |
${DATA_SAFETY_MATRIX.map(
  (row) =>
    `| ${row.categoryEn} | ${row.dataTypeEn} | \`${row.sdkSource}\` | ${row.purposeEn} | ${row.encryptedInTransit ? 'Yes (HTTPS/TLS)' : 'No'} | ${row.userCanResetOrOptOut ? 'Yes (Android Settings)' : 'System Diagnostic'} |`
).join('\n')}

---

${
  config.includeVirtualChipsDisclaimer
    ? `## 05. Recreational Poker & Virtual Currency Notice

**${config.appName}** is a recreational card game designed strictly for amusement and entertainment:
- The Application **does not offer "real money gambling"** or any opportunity to win real money, fiat currency, cryptocurrency, or real-world prizes based on gameplay outcomes.
- Virtual chips, points, or items earned during gameplay${config.includeRewardedAds ? ' or granted via AdMob rewarded video advertisements' : ''} have **zero monetary value** and cannot be exchanged, sold, cashed out, or transferred for real money.
- Practice or success in recreational social poker does not imply future success at real-money gambling.

---
`
    : ''
}
## 06. Data Security, Retention & Deletion

- **Encryption in Transit:** All telemetry and ad requests transmitted by the Application and its integrated SDKs are encrypted in transit using industry-standard **HTTPS / TLS 1.3** protocols.
- **Data Retention:** Technical diagnostics and advertising records managed by Google LLC follow Google's established retention schedules. Local game preferences (such as sound settings, table themes, and local chip balances) are stored directly on your device and are permanently erased when you uninstall the Application or clear app storage.
- **Data Deletion Requests:** Because ${config.appName} does not maintain a proprietary cloud database of personal user identities, you may immediately sever any advertising link by deleting or resetting your Google Advertising ID in your Android device settings, or by contacting us at **${config.contactEmail}**.

---

## 07. Children's Privacy & Age Rating

${config.appName} simulates traditional poker card mechanics and is intended strictly for audiences meeting the age classification designated on the Google Play Store (typically 18+ or mature/teen rating under IARC guidelines for simulated gambling themes). We do not knowingly collect personal data from children under the age of 13 (or under the applicable minimum legal age in your jurisdiction). If we learn that any personal information from a child has been inadvertently collected, we will promptly take steps to delete it.

---

## 08. Your Legal Rights (LGPD & GDPR)

Depending on your jurisdiction (including Brazil under the **LGPD** and the European Economic Area under the **GDPR**), you have the right to:
- Confirm the existence of data processing and understand which third-party SDKs operate within the Application;
- Revoke consent for personalized advertising at any time via the in-app consent dialog (Google UMP) or Android system settings;
- Request clarification, anonymization, or deletion of any identifiable communication sent to our support channel.

---

## 09. Contact the Developer / Data Controller

If you have any questions, concerns, or requests regarding this Privacy Policy or the data practices of **${config.appName}**, please contact us:

- **Developer / Studio:** ${config.developerName}
- **Application:** ${config.appName} (\`${config.packageName}\`)
- **Email:** ${config.contactEmail}
`;
  }

  return `# Política de Privacidade — ${config.appName}

**Data de Vigência:** ${config.effectiveDate}  
**Última Atualização:** ${config.lastUpdated}  
**Desenvolvedor / Controlador:** ${config.developerName}  
**Identificador do Pacote (Play Store):** \`${config.packageName}\`  
**E-mail de Suporte e Privacidade:** ${config.contactEmail}

---

## 01. Introdução e Escopo

Esta Política de Privacidade descreve de forma transparente como **${config.developerName}** ("nós", "nosso" ou "Desenvolvedor") trata as informações quando você instala, acessa ou utiliza o aplicativo móvel **${config.appName}** ("Aplicativo"), disponibilizado oficialmente na Google Play Store.

Respeitamos a sua privacidade e estruturamos este documento em total conformidade com a **Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018)**, o **Regulamento Geral sobre a Proteção de Dados (GDPR)** e as **Políticas do Programa para Desenvolvedores do Google Play**.

---

## 02. Dados Coletados Automaticamente

O **${config.appName}** foi projetado para que você possa jogar sem a necessidade de fornecer documentos civis (CPF/RG), endereço residencial ou dados bancários. Contudo, para viabilizar a exibição de anúncios, manter a estabilidade técnica e prevenir fraudes, bibliotecas de terceiros integradas ao Aplicativo coletam automaticamente dados técnicos limitados:

- **Identificadores do Dispositivo e de Publicidade:** ID de publicidade do Google (*Google Advertising ID* — AAID/GAID), fabricante e modelo do aparelho, versão do sistema operacional Android, idioma configurado e resolução de tela.
- **Rede e Localização Aproximada:** Endereço IP (utilizado exclusivamente para inferir a região ou país aproximado, permitindo a entrega de anúncios no idioma correto, prevenção a fraudes e aplicação de normas regionais de privacidade). **Não coletamos** localização precisa via GPS.
- **Atividade no Aplicativo e Interações com Anúncios:** Eventos de abertura de sessão, impressões de anúncios exibidos, cliques em publicidade${config.includeRewardedAds ? ' e confirmação de visualização de vídeos premiados (Rewarded Ads)' : ''}.
- **Diagnósticos e Registros de Falhas:** Relatórios técnicos de erros (*crash logs*), eventos de travamento (ANR — *Application Not Responding*) e métricas de desempenho do motor gráfico do jogo.

---

## 03. Google AdMob e Publicidade Móvel

Para manter o acesso gratuito ao **${config.appName}**, utilizamos o serviço **Google AdMob (Google Mobile Ads SDK)**, fornecido pela Google LLC, para exibição de anúncios dentro do Aplicativo.

### Como o Google AdMob atua no ${config.appName}:
1. **ID de Publicidade do Android (AAID):** O SDK do Google AdMob acessa o identificador de publicidade do seu dispositivo para limitar a repetição de um mesmo anúncio, aferir métricas de exibição, combater tráfego inválido e — mediante o seu consentimento — apresentar anúncios personalizados de acordo com seus interesses.
2. **Formatos de Anúncio:** O aplicativo pode exibir banners, anúncios de tela inteira (intersticiais)${config.includeRewardedAds ? ' e anúncios em vídeo premiados opcionais (nos quais o jogador escolhe assistir a um anúncio em troca de benefícios virtuais recreativos dentro do jogo)' : ''}.
3. **Como Desativar ou Redefinir o ID de Publicidade:** Você possui controle total sobre o identificador de anúncios no Android. A qualquer momento, você pode redefinir ou excluir o seu ID de publicidade acessando no seu aparelho:
   \`Configurações > Google > Todos os serviços > Anúncios > Redefinir ID de publicidade (ou Excluir ID de publicidade)\`.

### Documentação Oficial de Privacidade do Google:
- **Política de Privacidade do Google:** https://policies.google.com/privacy
- **Como o Google utiliza informações de sites ou apps que utilizam seus serviços:** https://policies.google.com/technologies/partner-sites
- **Tecnologias e Políticas de Publicidade do Google:** https://policies.google.com/technologies/ads

---

## 04. Matriz de Segurança dos Dados (Google Play Data Safety)

| Categoria | Tipo de Dado Específico | Origem / SDK | Finalidade do Tratamento | Criptografado em Trânsito | Controle do Usuário |
| :--- | :--- | :--- | :--- | :--- | :--- |
${DATA_SAFETY_MATRIX.map(
  (row) =>
    `| ${row.categoryPt} | ${row.dataTypePt} | \`${row.sdkSource}\` | ${row.purposePt} | ${row.encryptedInTransit ? 'Sim (HTTPS/TLS)' : 'Não'} | ${row.userCanResetOrOptOut ? 'Sim (Ajustes do Android)' : 'Diagnóstico Técnico'} |`
).join('\n')}

---

${
  config.includeVirtualChipsDisclaimer
    ? `## 05. Natureza Recreativa e Fichas Virtuais (Jogo Responsável)

O **${config.appName}** é um jogo eletrônico de entretenimento recreativo e simulação esportiva de cartas:
- O Aplicativo **não oferece apostas com dinheiro real** (*no real-money gambling*) nem oferece qualquer oportunidade de ganhar dinheiro real, transferências via PIX, criptomoedas ou prêmios físicos com base no resultado das partidas.
- Todas as fichas, moedas ou pontuações existentes no jogo${config.includeRewardedAds ? ' (incluindo fichas de bônus obtidas ao assistir anúncios premiados do AdMob)' : ''} são **estritamente virtuais**, não possuem valor monetário e não podem ser sacadas, vendidas, convertidas ou trocadas por dinheiro real ou bens fora do Aplicativo.
- O desempenho ou sucesso no ${config.appName} tem finalidade puramente recreativa e não implica sucesso futuro em jogos de apostas reais.

---
`
    : ''
}
## 06. Segurança, Retenção e Exclusão de Dados

- **Criptografia em Trânsito:** Todas as comunicações de rede realizadas pelos SDKs integrados (como o Google AdMob) ocorrem por meio de conexões seguras criptografadas via protocolo **HTTPS / TLS 1.3**.
- **Armazenamento Local e Retenção:** Preferências locais da partida (como ajustes de áudio, visual da mesa e saldo de fichas recreativas locais) ficam salvas na memória interna do seu aparelho e são removidas automaticamente caso você desinstale o Aplicativo ou limpe os dados nas configurações do Android. Os registros analíticos e publicitários coletados pela Google LLC obedecem aos prazos de retenção estabelecidos na Política de Privacidade do Google.
- **Solicitação de Exclusão:** Como não exigimos cadastro de conta pessoal nominativa em servidores próprios para jogar, você pode desvincular imediatamente qualquer histórico publicitário excluindo ou redefinindo seu ID de publicidade nas configurações do Android, ou entrando em contato pelo e-mail **${config.contactEmail}**.

---

## 07. Classificação Indicativa e Privacidade de Menores

Por simular a dinâmica tradicional de jogos de poker, o **${config.appName}** é destinado ao público que atende à classificação indicativa atribuída na Google Play Store (conforme diretrizes do sistema internacional IARC e do Ministério da Justiça para jogos de cartas simulados). Não coletamos intencionalmente informações pessoais de crianças menores de 13 anos (ou abaixo da idade mínima legal aplicável em sua jurisdição). Caso qualquer responsável identifique envio inadvertido de informações por um menor, poderá solicitar a imediata remoção através do nosso canal de contato.

---

## 08. Seus Direitos (LGPD e GDPR)

Em conformidade com o Art. 18 da **LGPD (Lei nº 13.709/2018)** e legislações internacionais equivalentes, você tem direito a:
- Confirmar a existência de tratamento de dados e consultar de maneira clara quais serviços de terceiros operam no Aplicativo;
- Revogar o consentimento para personalização de anúncios a qualquer momento por meio do diálogo de consentimento (Google UMP) ou diretamente nas configurações de privacidade do sistema Android;
- Solicitar esclarecimentos ou a exclusão de eventuais comunicações enviadas diretamente ao nosso e-mail de suporte.

---

## 09. Contato do Controlador / Suporte

Caso tenha qualquer dúvida sobre esta Política de Privacidade ou sobre as práticas de proteção de dados do **${config.appName}**, entre em contato conosco:

- **Desenvolvedor / Responsável:** ${config.developerName}
- **Aplicativo:** ${config.appName} (\`${config.packageName}\`)
- **E-mail de Contato:** ${config.contactEmail}
`;
}

export function generateStandaloneHtml(config: PolicyConfig, lang: 'pt' | 'en'): string {
  const isEn = lang === 'en';
  return `<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'pt-BR'}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${config.appName} — ${isEn ? 'Privacy Policy' : 'Política de Privacidade'}</title>
  <meta name="description" content="${isEn ? `Official Privacy Policy for ${config.appName} on Google Play Store, including Google AdMob disclosure.` : `Política de Privacidade oficial do aplicativo ${config.appName} para Google Play Store, incluindo conformidade com Google AdMob e LGPD.`}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #FBF9F5;
      --surface: #F3EFE6;
      --text: #1C1917;
      --muted: #57534E;
      --border: #E5E0D5;
      --accent: #14532D;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.75;
      font-size: 16px;
      padding: 0 1.5rem 4rem;
    }
    header {
      max-width: 960px;
      margin: 0 auto;
      padding: 2.5rem 0 2rem;
      border-bottom: 1px solid var(--border);
    }
    .meta-line {
      font-size: 0.8125rem;
      color: var(--muted);
      margin-bottom: 0.75rem;
    }
    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(2.25rem, 4vw, 3.25rem);
      line-height: 1.15;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    main {
      max-width: 960px;
      margin: 0 auto;
    }
    section {
      padding: 2.25rem 0;
      border-bottom: 1px solid var(--border);
    }
    h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.75rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text);
    }
    p { margin-bottom: 1rem; color: #292524; max-width: 72ch; }
    ul { margin: 0.75rem 0 1.25rem 1.25rem; max-width: 72ch; }
    li { margin-bottom: 0.5rem; color: #292524; }
    code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85em;
      background: var(--surface);
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
    }
    a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.25rem 0;
      font-size: 0.875rem;
    }
    th, td {
      text-align: left;
      padding: 0.75rem;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
    }
    th {
      font-weight: 600;
      background: var(--surface);
    }
    footer {
      max-width: 960px;
      margin: 2.5rem auto 0;
      font-size: 0.875rem;
      color: var(--muted);
    }
  </style>
</head>
<body>
  <header>
    <div class="meta-line">${config.appName} · ${isEn ? 'Effective Date:' : 'Vigência:'} ${config.effectiveDate} · Package: <code>${config.packageName}</code></div>
    <h1>${isEn ? `Privacy Policy — ${config.appName}` : `Política de Privacidade — ${config.appName}`}</h1>
    <p>${
      isEn
        ? `Official privacy documentation and Google AdMob data disclosure for the ${config.appName} mobile application on Google Play.`
        : `Documento oficial de privacidade, proteção de dados (LGPD/GDPR) e transparência do SDK Google AdMob para o aplicativo ${config.appName} na Google Play Store.`
    }</p>
  </header>
  <main>
    <section>
      <h2>01. ${isEn ? 'Introduction & Scope' : 'Introdução e Escopo'}</h2>
      <p>${
        isEn
          ? `This Privacy Policy governs your use of the mobile application ${config.appName}, developed and maintained by ${config.developerName}. It explains what technical information is collected automatically, how Google AdMob processes advertising data, and how you can exercise your privacy rights.`
          : `Esta Política de Privacidade rege o uso do aplicativo móvel ${config.appName}, desenvolvido e mantido por ${config.developerName}. Este documento explica quais informações técnicas são coletadas automaticamente, como o Google AdMob processa dados publicitários e como você pode exercer seus direitos de privacidade.`
      }</p>
    </section>
    <section>
      <h2>02. ${isEn ? 'Google AdMob & Advertising ID' : 'Google AdMob e Identificador de Publicidade'}</h2>
      <p>${
        isEn
          ? `${config.appName} integrates the Google AdMob (Google Mobile Ads SDK) provided by Google LLC to display advertisements. AdMob automatically collects your device's Google Advertising ID (AAID/GAID), approximate location inferred via IP address, app interaction events, and diagnostic logs to serve ads, limit ad frequency, and combat invalid traffic.`
          : `O aplicativo ${config.appName} integra o SDK Google AdMob (Google Mobile Ads), fornecido pela Google LLC, para exibição de anúncios. O AdMob coleta automaticamente o ID de publicidade do Google (AAID/GAID), localização aproximada inferida pelo endereço IP, eventos de interação com anúncios e registros de diagnóstico para exibir publicidade, limitar frequência de anúncios e prevenir fraudes.`
      }</p>
      <ul>
        <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy (https://policies.google.com/privacy)</a></li>
        <li><a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses data from partner apps (https://policies.google.com/technologies/partner-sites)</a></li>
        <li><a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google Advertising Technologies (https://policies.google.com/technologies/ads)</a></li>
      </ul>
      <p>${
        isEn
          ? `You may reset or delete your Advertising ID at any time on your Android device via Settings > Google > All Services > Ads.`
          : `Você pode redefinir ou excluir seu ID de publicidade a qualquer momento no Android acessando Configurações > Google > Todos os serviços > Anúncios.`
      }</p>
    </section>
    <section>
      <h2>03. ${isEn ? 'Google Play Data Safety Summary' : 'Matriz de Segurança dos Dados (Play Store)'}</h2>
      <table>
        <thead>
          <tr>
            <th>${isEn ? 'Category' : 'Categoria'}</th>
            <th>${isEn ? 'Data Type' : 'Tipo de Dado'}</th>
            <th>${isEn ? 'Purpose' : 'Finalidade'}</th>
            <th>${isEn ? 'Encryption' : 'Criptografia'}</th>
          </tr>
        </thead>
        <tbody>
          ${DATA_SAFETY_MATRIX.map(
            (row) => `<tr>
            <td>${isEn ? row.categoryEn : row.categoryPt}</td>
            <td>${isEn ? row.dataTypeEn : row.dataTypePt}</td>
            <td>${isEn ? row.purposeEn : row.purposePt}</td>
            <td>HTTPS / TLS 1.3</td>
          </tr>`
          ).join('')}
        </tbody>
      </table>
    </section>
    ${
      config.includeVirtualChipsDisclaimer
        ? `<section>
      <h2>04. ${isEn ? 'Recreational Poker & Virtual Currency' : 'Natureza Recreativa e Fichas Virtuais'}</h2>
      <p>${
        isEn
          ? `${config.appName} is a recreational simulation game for entertainment purposes only. It does NOT offer real-money gambling or any opportunity to win real money or real-world prizes. Virtual chips have no monetary value and cannot be exchanged or cashed out.`
          : `O ${config.appName} é um jogo recreativo voltado exclusivamente ao entretenimento. O aplicativo NÃO oferece apostas com dinheiro real nem oportunidade de ganhar prêmios em dinheiro. Todas as fichas do jogo são estritamente virtuais, sem valor monetário, e não podem ser sacadas ou convertidas em dinheiro.`
      }</p>
    </section>`
        : ''
    }
    <section>
      <h2>05. ${isEn ? 'Contact & Data Controller' : 'Contato e Controlador de Dados'}</h2>
      <p><strong>${isEn ? 'Developer:' : 'Desenvolvedor:'}</strong> ${config.developerName}</p>
      <p><strong>E-mail:</strong> <a href="mailto:${config.contactEmail}">${config.contactEmail}</a></p>
    </section>
  </main>
  <footer>
    <p>© ${new Date().getFullYear()} ${config.developerName} · ${config.appName} · ${isEn ? 'All rights reserved.' : 'Todos os direitos reservados.'}</p>
  </footer>
</body>
</html>`;
}
