const BASE_URL = "/api";

export async function fetchPatients() {
  const res = await fetch(`${BASE_URL}/patients`);
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
}

export async function fetchPatient(id) {
  const res = await fetch(`${BASE_URL}/patients/${id}`);
  if (!res.ok) throw new Error("Failed to fetch patient");
  return res.json();
}

export async function fetchEOB(patientId, eobId) {
  const res = await fetch(`${BASE_URL}/patients/${patientId}/eobs/${eobId}`);
  if (!res.ok) throw new Error("Failed to fetch EOB");
  return res.json();
}
