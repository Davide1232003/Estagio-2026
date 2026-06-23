# Strava Dash

Dashboard de análise de desempenho desportivo que consome a API oficial do Strava. Permite visualizar estatísticas detalhadas de corrida e ciclismo com gráficos, mapas e métricas de performance.

## Tecnologias

- **React 19** + **Vite** — biblioteca de UI e bundler
- **Tailwind CSS** — estilização com design glassmorphism
- **Recharts** — gráficos e visualizações de dados
- **Framer Motion** — animações de interface
- **Express.js** + **Node.js** — servidor de autenticação OAuth2
- **Axios** — pedidos HTTP à API do Strava
- **React Router DOM v6** — navegação entre páginas
- **Lucide React** — ícones
- **dotenv** — gestão de variáveis de ambiente
- **cors** — permite comunicação entre frontend e servidor
- **Mapbox Static API** — mapas das atividades
- **FullCalendar** — calendário de atividades
- **ngrok** — túnel para expor o servidor local ao Strava durante o desenvolvimento

## Pré-requisitos

- Node.js
- Conta Strava com uma aplicação (API) criada em [strava.com/settings/api](https://www.strava.com/settings/api)
- Token do Mapbox (gratuito em [mapbox.com](https://www.mapbox.com))
- ngrok (para expor o servidor localmente ao Strava)

## Instalação

```bash
npm install
```

## Configuração

### 1. Variáveis de ambiente do Frontend

Cria um ficheiro `.env` na raiz do projeto:

```env
VITE_MAPBOX_KEY=o_teu_token_mapbox
VITE_USE_MOCK=true
```

> `VITE_USE_MOCK=true` ativa dados reais da API. Para usar dados fictícios (sem consumir quota), coloca `false`.

### 2. Variáveis de ambiente do Servidor

Cria um ficheiro `.env` dentro de `src/api/`:

```env
STRAVA_CLIENT_ID=o_teu_client_id
STRAVA_CLIENT_SECRET=o_teu_client_secret
REDIRECT_URI=https://o_teu_url_ngrok/exchange_token
```

> O `REDIRECT_URI` tem de ser o URL público do ngrok a apontar para `localhost:3000/exchange_token`. Este URL tem de estar registado na app do Strava em **Authorization Callback Domain**.

## Arrancar o projeto

O projeto precisa de **dois processos a correr em simultâneo**: o servidor de autenticação e o frontend.

### Terminal 1 — Servidor de autenticação (OAuth)

```bash
node src/api/server.js
```

Fica a correr em `http://localhost:3000`

### Terminal 2 — Frontend React

```bash
npm run dev
```

Fica a correr em `http://localhost:5173`

### Terminal 3 — ngrok (expõe o servidor ao Strava)

```bash
ngrok http 3000
```

Copia o URL HTTPS gerado (ex: `https://xxxx.ngrok-free.app`) e atualiza o `REDIRECT_URI` no `.env` do servidor.

## Fluxo de autenticação

1. Abre `http://localhost:5173`
2. Clica em **Entrar com o Strava**
3. Autoriza a aplicação na página do Strava
4. És redirecionado para o dashboard com os teus dados

> O token tem validade de ~6 horas. Após expirar, o sistema redireciona automaticamente para a página login.

## Estrutura do Projeto

```
src/
├── api/              # Servidor Express (backend OAuth)
├── assets/           # Imagens estáticas
├── components/       # Componentes React reutilizáveis
│   ├── activity/     # ActivityItem, ActivityDetail
│   ├── cards/        # StatCard, MetricsCard, ShoeCard, ...
│   ├── graphs/       # Gráficos Recharts
│   └── segments/     # FavoriteSegments, ListSegments
├── config/           # Configuração de menus
├── hooks/            # Custom hooks (lógica de dados)
├── layout/           # Layout principal com sidebar
├── pages/            # Páginas organizadas por secção
│   ├── AnaliseGeral/ # Dashboard, Atividades, Calendário
│   ├── Atleta/       # Perfil, Equipamentos, Recordes, Segmentos
│   └── Performance/  # Volume, Performance, Elevação, Estatísticas
├── routes/           # React Router + ProtectedRoute
├── styles/           # CSS customizado
└── utils/            # Utilitários (formatting, pace, stats, ...)
```

## Páginas

| Página | Descrição |

| Dashboard | Visão geral com filtros por desporto e período |
| Atividades | Lista com detalhe, mapa e estatísticas por atividade |
| Calendário | Calendário mensal com estatísticas do mês |
| Perfil | Dados do atleta e comparativo de performance |
| Equipamentos | Sapatilhas e bicicletas com métricas de uso |
| Recordes | Melhores esforços por distância standard |
| Segmentos | Segmentos realizados e favoritos |
| Volume | Gráficos de carga e evolução de volume |
| Performance | Evolução de pace e frequência cardíaca |
| Elevação | Análise de ganho de elevação |
| Estatísticas | Métricas avançadas filtráveis |
