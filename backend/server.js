const express = require("express");
const cors = require("cors");
const { patients } = require("./data");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET all patients
app.get("/api/patients", (req, res) => {
  const summary = patients.map(({ id, name, dob, payer, status }) => ({
    id,
    name,
    dob,
    payer,
    status,
  }));
  res.json(summary);
});

// GET single patient by ID
app.get("/api/patients/:id", (req, res) => {
  const patient = patients.find((p) => p.id === parseInt(req.params.id));
  if (!patient) return res.status(404).json({ error: "Patient not found" });
  res.json(patient);
});

// GET single EOB by patient ID and EOB ID
app.get("/api/patients/:patientId/eobs/:eobId", (req, res) => {
  const patient = patients.find(
    (p) => p.id === parseInt(req.params.patientId)
  );
  if (!patient) return res.status(404).json({ error: "Patient not found" });

  const eob = patient.eobs.find((e) => e.id === req.params.eobId);
  if (!eob) return res.status(404).json({ error: "EOB not found" });

  res.json({ eob, patient: { id: patient.id, name: patient.name } });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
