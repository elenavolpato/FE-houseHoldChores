# Household Chores App — Frontend Documentation

[backend Repo](https://github.com/elenavolpato/BE-houseHoldChores)
(Italiano sotto)

Welcome to the frontend documentation for the Household Chores management platform. This application is built as an interactive, responsive single-page application (SPA) using React, Redux Toolkit, and Bootstrap. It allows users to track tasks, create tasks, invite roommates and assign tasks to yourself or other in your group. The app was planned for mobile as the primary use, but the interface is also responsive and easily usable in desktop resolutions.
🛠️ Tech Stack & Key Libraries

- #### Framework: React 18+ (Vite Build Tool)

- #### Styling & UI: React-Bootstrap (Bootstrap 5) / FontAwesome v6

- #### State Management: Redux Toolkit (Slice-based architecture)

- #### Data Fetching: Native JavaScript Fetch API (with Bearer Token intercept optimization)

# Version planning

- **Version 1.0:** create tasks, assign tasks, invite users, assign tasks to users, delete account.
- **Version 1.1:** create a groceries list, create new categories, translation to italian(i18next)
- **Version 1.2:** create multiple groceries list (archives lists), save pattern groceries list - the items that repeat often (more than 3 times) will automatically be suggested as standard list to the user, i.e.: for 3 weeks a user buys 2l milk, 10 eggs and 1 loaf of bread. Then the app will suggest these 3 items as basic standard item in his next groceries list.

### 🚀 Getting Started

##### 1. Environment Configuration

Create a .env file in the root directory of your project to point the application to your local Spring Boot backend resource instances:
Code snippet

```env
VITE_API_URL=http://localhost:8080
```

##### 2. Dependency Installation

Run the following package script to download and structure the node module dependencies:

```bash
npm install
```

##### 3. Execution Launcher

Launch the local Hot-Module-Replacement (HMR) development server container:

```bash
npm run dev
```

### 📂 Architecture & Directory Layout

```Plaintext
 src/
├── assets/             # Static files, global design imagery, fallback profile icons
├── components/         # Shared presentation elements (Modals, Form inputs, Wrappers)
│   ├── UserProfileDetails.jsx   # Interactive inline-profile edit dashboard
│   ├── GroupNameChanger.jsx     # Header widget utility for instant rename tracking
│   └── ConfirmationModal.jsx    # Standard reuse popup framework
     ...
├── features/              # Redux Toolkit global store slices
│   ├── auth/        # Global Redux central nexus configuration
│   ├── chores/   # Session management, authorization state, user profile caching
│   └── groups/
     ...
├── redux/              # Redux Toolkit global store slices
│   ├── store.js        # Global Redux central nexus configuration
│   ├── authSlice.js    # Session management, authorization state, user profile caching
│   └── groupSlice.js   # Household group identities, roommates array tracking
    ...
├── services/           # Network abstraction boundaries (Native Fetch logic handles)
│   ├── authApi.js      # Session access workers (Login, Logout, Signup queries)
│   ├── userApi.js      # Core User mutations (Username changes, Profile updates)
│   └── groupApi.js     # Enterprise Group mutations (Group renaming thunks)
└── App.jsx             # Main router core and layout structure definitions
└── index.css           # main css file with a few shared classes
```

### 🧠 Application State Management Architecture

The frontend uses a dual-sync architecture to guarantee zero UI latency during data modification events.

- Async Actions (Thunks): Talk directly to the database layer over the network (e.g., updateGroupNameApi).

- Synchronous Actions (Reducers): Force instant in-memory mutations across cached store branches (authSlice and groupSlice), updating multiple unrelated layout screens at the exact same time without forcing a manual window reload.

#### Unified Global State Subscriptions Lookups

Components must extract data from their dedicated slice domains to maintain clean rendering dependencies:
JavaScript

- ✅ Target the dedicated auth domain module context
  const currentUser = useSelector((state) => state.auth.user);

- ✅ Target the dedicated household grid layout parameters context
  const groupName = useSelector((state) => state.group.groupName);

### 🎨 Component Implementation Design Patterns

Inline Editing Workflows (No-Modal UX Strategy)

To optimize data entry workflows, form sections (like changing a username or group name) utilize inline edit states. Clicking the view text toggles the UI branch directly into an HTML input form container.

```Javascript
const executeUpdate = async (e) => {
 e.preventDefault(); // 💡 Prevents layout refresh cycles
 if (!input.trim() || input === originalValue) {
 setIsEditing(false);
 return;
 }

 setIsSaving(true);
 try {
 // 1. Commit network change across the server database
 await dispatch(updateThunkWorkerAction({ payload })).unwrap();

     // 2. Reflect change immediately inside local cache layers
     dispatch(localSyncAction(input.trim()));
     setIsEditing(false);

 } catch (err) {
 // 3. Gracefully handle errors and revert the visual input
 setLocalInput(originalValue);
 } finally {
 setIsSaving(false);
 }
};
```

### 🔒 Security & Authorization

#### All data-mutating network operations route through security utility loops to automatically forward authentication data headers securely:

```JavaScript

const token = localStorage.getItem("token");
const headers = {
"Authorization": `Bearer ${token}`,
"Content-Type": "application/json"
};
```

- JSON Payloads: Plain payload parameters are serialized through standard JSON.stringify structures.

- Multipart Payloads: Image file buffer streams (such as user avatar updates) utilize native FormData streams. For these, the "Content-Type" header is intentionally left empty so the browser can calculate the correct multi-part request boundaries natively.

---

# Documentazione Frontend — App Household Chores

Benvenuto nella documentazione frontend della piattaforma di gestione delle faccende domestiche. Questa applicazione è sviluppata come una Single-Page Application (SPA) altamente interattiva e responsive utilizzando React, Redux Toolkit e Bootstrap. Consente agli utenti di monitorare le attività, organizzare i coinquilini, gestire le metriche del profilo domestico e sincronizzare i programmi in tempo reale. L'app è stata progettata principalmente per l'uso su dispositivi mobili, ma l'interfaccia è anche reattiva e facilmente utilizzabile con le risoluzioni dei computer desktop.

## 🛠️ Stack Tecnologico e Librerie Principali

- **Framework:** React 18+ (Vite Build Tool)
- **Styling & UI:** React-Bootstrap (Bootstrap 5) / FontAwesome v6
- **Gestione dello Stato:** Redux Toolkit (architettura basata su Slice)
- **Recupero Dati:** API Fetch nativa di JavaScript (con ottimizzazione degli interceptor Bearer Token)

# Pianificazione delle versioni

- **Versione 1.0:** creare attività, assegnare attività, invitare utenti, assegnare attività agli utenti, eliminare account.
- **Versione 1.1:** creare una lista della spesa, creare nuove categorie, traduzione in italiano(i18next).
- **Versione 1.2:** creare più liste della spesa (liste archiviate), salvare modelli di lista della spesa - gli articoli che si ripetono spesso (più di 3 volte) verranno automaticamente suggeriti all'utente come lista standard, ad esempio: per 3 settimane un utente acquista 2 litri di latte, 10 uova e 1 pagnotta di pane. Quindi l'app suggerirà questi 3 articoli come articoli standard di base nella sua prossima lista della spesa.

Tradotto con DeepL.com (versione gratuita)

# 🚀 Per Iniziare

## 1. Configurazione dell'Ambiente

Crea un file `.env` nella directory principale del progetto per collegare l'applicazione alle istanze locali del backend Spring Boot:

```env
VITE_API_URL=http://localhost:8080
```

## 2. Installazione delle Dipendenze

Esegui il seguente comando per scaricare e configurare le dipendenze Node:

```bash
npm install
```

## 3. Avvio dell'Applicazione

Avvia il server di sviluppo locale con Hot Module Replacement (HMR):

```bash
npm run dev
```

# 📂 Architettura e Struttura delle Directory

```text
src/
├── assets/             # File statici, immagini globali del design, icone profilo di fallback
├── components/         # Elementi di presentazione condivisi (Modali, Input Form, Wrapper)
│   ├── UserProfileDetails.jsx   # Dashboard interattiva per la modifica inline del profilo
│   ├── GroupNameChanger.jsx     # Widget dell'intestazione per il tracciamento immediato della rinomina
│   └── ConfirmationModal.jsx    # Framework standard riutilizzabile per popup di conferma
│   ...
├── features/           # Slice del global store Redux Toolkit
│   ├── auth/           # Configurazione centrale globale Redux
│   ├── chores/         # Gestione della sessione, stato di autorizzazione, cache del profilo utente
│   └── groups/
│   ...
├── redux/              # Slice del global store Redux Toolkit
│   ├── store.js        # Configurazione centrale globale Redux
│   ├── authSlice.js    # Gestione della sessione, stato di autorizzazione, cache del profilo utente
│   └── groupSlice.js   # Identità dei gruppi domestici, tracciamento dell'array dei coinquilini
│   ...
├── services/           # Livelli di astrazione della rete (gestione logica Fetch nativa)
│   ├── authApi.js      # Operazioni di accesso alla sessione (Login, Logout, Registrazione)
│   ├── userApi.js      # Mutazioni principali dell'utente (Cambio username, aggiornamenti profilo)
│   └── groupApi.js     # Mutazioni dei gruppi (Thunk per rinomina del gruppo)
└── App.jsx             # Router principale e definizioni della struttura del layout
└── index.css           # File CSS principale con alcune classi condivise
```

# 🧠 Architettura della Gestione dello Stato

Il frontend utilizza un'architettura a doppia sincronizzazione per garantire latenza zero nell'interfaccia durante gli eventi di modifica dei dati.

### Azioni Asincrone (Thunk)

Comunicano direttamente con il livello database attraverso la rete (ad esempio `updateGroupNameApi`).

### Azioni Sincrone (Reducer)

Forzano mutazioni immediate in memoria nei rami della cache dello store (`authSlice` e `groupSlice`), aggiornando simultaneamente più schermate del layout senza richiedere un aggiornamento manuale della pagina.

## Accesso Unificato allo Stato Globale

I componenti devono estrarre i dati dai rispettivi domini Slice per mantenere dipendenze di rendering pulite:

```javascript
// ✅ Utilizza il dominio dedicato auth
const currentUser = useSelector((state) => state.auth.user)

// ✅ Utilizza il dominio dedicato ai parametri del gruppo domestico
const groupName = useSelector((state) => state.group.groupName)
```

# 🎨 Pattern di Progettazione dei Componenti

## Flussi di Modifica Inline (Strategia UX Senza Modali)

Per ottimizzare i flussi di inserimento dati, le sezioni dei moduli (come il cambio del nome utente o del nome del gruppo) utilizzano stati di modifica inline. Facendo clic sul testo visualizzato, l'interfaccia passa direttamente a un campo di input HTML. Ci cono un modale per conferma di

```javascript
const executeUpdate = async (e) => {
  e.preventDefault() // 💡 Impedisce cicli di refresh del layout

  if (!input.trim() || input === originalValue) {
    setIsEditing(false)
    return
  }

  setIsSaving(true)

  try {
    // 1. Salva la modifica sul database del server
    await dispatch(updateThunkWorkerAction({ payload })).unwrap()

    // 2. Riflette immediatamente la modifica nei livelli di cache locali
    dispatch(localSyncAction(input.trim()))
    setIsEditing(false)
  } catch (err) {
    // 3. Gestisce gli errori e ripristina il valore visualizzato
    setLocalInput(originalValue)
  } finally {
    setIsSaving(false)
  }
}
```

# 🔒 Sicurezza e Autorizzazione

Tutte le operazioni di rete che modificano dati passano attraverso utility di sicurezza che inoltrano automaticamente gli header di autenticazione:

```javascript
const token = localStorage.getItem("token")

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
}
```

- Payload JSON: I parametri vengono serializzati utilizzando le strutture standard `JSON.stringify`.

- Payload Multipart: I flussi di file immagine (come l'aggiornamento dell'avatar utente) utilizzano oggetti `FormData` nativi. In questi casi, l'header `"Content-Type"` viene intenzionalmente lasciato vuoto affinché il browser possa calcolare automaticamente i corretti confini della richiesta multipart.
