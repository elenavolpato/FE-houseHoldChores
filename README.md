# Household Chores App — Frontend Documentation

Welcome to the frontend documentation for the Household Chores management platform. This application is built as a highly interactive, responsive single-page application (SPA) using React, Redux Toolkit, and Bootstrap. It allows users to track tasks, organize roommates, manage household profile metrics, and sync schedules in real time.
🛠️ Tech Stack & Key Libraries

- #### Framework: React 18+ (Vite Build Tool)

- #### Styling & UI: React-Bootstrap (Bootstrap 5) / FontAwesome v6

- #### State Management: Redux Toolkit (Slice-based architecture)

- #### Data Fetching: Native JavaScript Fetch API (with Bearer Token intercept optimization)

### 🚀 Getting Started

##### 1. Environment Configuration

Create a .env file in the root directory of your project to point the application to your local Spring Boot backend resource instances:
Code snippet

`VITE_API_URL=http://localhost:8080`

##### 2. Dependency Installation

Run the following package script to download and structure the node module dependencies:
Bash

`npm install`

##### 3. Execution Launcher

Launch the local Hot-Module-Replacement (HMR) development server container:
Bash

`npm run dev`

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
````
