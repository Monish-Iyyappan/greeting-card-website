Vite + React + Tailwind Homepage

Short description:
A simple Vite + React + Tailwind CSS project containing a homepage with two stacked form fields: "Name" and "Password".

Key files:
- src/App.jsx        : Main React component (name + password form)
- src/main.jsx       : React entry point that mounts the App
- src/index.css      : Tailwind imports and base styles
- index.html         : Vite HTML entry
- package.json       : npm scripts and dependencies
- vite.config.js     : Vite configuration
- tailwind.config.js : Tailwind configuration

How to run locally:
1) Open a terminal in this folder: C:\Users\Monish I\OneDrive\Desktop\program\project
2) Install dependencies: npm install
3) Start dev server: npm run dev -- --host 127.0.0.1 --port 3000 --strictPort
4) Open in browser: http://localhost:3000/

Build for production:
- npm run build
- npm run preview (or serve the generated dist/ folder with a static server)

Backend setup:
- Copy .env.example to .env and update DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, and PORT.
- Install dependencies: npm install
- Start the backend server: npm run server

Notes:
- Do NOT use VS Code Live Server (Go Live) for this project; it requires the Vite dev server to compile JSX and Tailwind.
- If port 3000 is in use, change the --port value or omit --strictPort to let Vite pick a free port.

Created by Copilot CLI agent: a small demo homepage for testing.
