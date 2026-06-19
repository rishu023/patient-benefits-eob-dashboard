# Patient EOB Dashboard

A lightweight web app to view patient insurance benefits and Explanation of Benefits (EOB) claim details.

## Tech Stack

- **Backend**: Node.js + Express (REST API, port 3001)
- **Frontend**: React + Vite + React Router (port 5173)

## Project Structure

```
patient-eob-dashboard/
├── backend/
│   ├── data.js       # Mock patient/EOB data
│   ├── server.js     # Express API server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/           # API fetch helpers
│   │   ├── components/    # PatientCard, BenefitCard, EOBCard, StatusBadge
│   │   ├── pages/         # PatientList, PatientDetail, EOBAnalysis
│   │   ├── styles/        # app.css
│   │   ├── App.jsx        # Router setup
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js     # Proxies /api → localhost:3001
│   └── package.json
└── README.md
```

## Running Locally

### 1. Start the Backend

```bash
cd backend
npm install
npm start
# → http://localhost:3001
```

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

Open **http://localhost:5173** in your browser.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/patients` | All patients (summary) |
| GET | `/api/patients/:id` | Single patient with benefits + EOBs |
| GET | `/api/patients/:patientId/eobs/:eobId` | Single EOB with analysis |

## Pages

1. **Patient List** (`/`) — Card grid of all patients with search filter
2. **Patient Detail** (`/patients/:id`) — Benefits summary + EOB cards side by side
3. **EOB Analysis** (`/patients/:patientId/eobs/:eobId`) — Financial breakdown, split bar, and AI-style claim analysis

## What I'd Improve With More Time

###  AI Integration (High Impact)


- **Denial Appeal Letter Generator** — For denied claims (like Michael Patel's), add a "Generate Appeal Letter" button. The AI takes the denial reason, procedure, and patient info and drafts a formal appeal letter ready to send to the insurer. Huge time-saver for front desk staff.

- **Benefits Q&A Chatbot** — A small chat widget on the Patient Detail page where staff or patients can ask natural language questions like *"Is ortho covered?"* or *"How much deductible is left?"* — the AI answers using the patient's actual benefits data as context.

- **Claim Risk Flagging** — Before submitting a claim, run it through an AI model trained on denial patterns. It flags likely rejections (e.g. missing documentation, procedure not covered) with a risk score and suggested fix — reducing denials proactively rather than reactively.

- **Auto-populate Analysis** — Currently the `analysis` field (reason, issue, suggestion) is hardcoded per EOB. In production, this could be generated dynamically by an AI model that reads the EOB financials and payer rules, so every new claim gets an instant analysis without manual entry.

### 🛠️ General Improvements

- **Loading skeletons** instead of a plain spinner
- **Pagination / filtering** on the patient list for large datasets
- **Error boundary** component for graceful failures
- **Unit tests** for the API routes (Jest + Supertest)
- **Accessible** keyboard navigation and ARIA labels
- **Dark mode** support via CSS custom properties
- **Export to PDF** for EOB analysis view
- **Real backend** with a database (PostgreSQL) instead of hardcoded data
