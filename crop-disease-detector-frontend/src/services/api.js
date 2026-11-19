
const API_URL = "http://127.0.0.1:8000";

function getToken() {
  return localStorage.getItem("cropcare_token");
}

async function request(path, options = {}) {
  const headers = {
    ...(options.headers || {})
  };

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Something went wrong.");
  }

  return data;
}

export function registerUser(name, email, password) {
  return request("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
}

export function loginUser(email, password) {
  return request("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
}

export function getCurrentUser() {
  return request("/api/auth/me");
}

export async function predictDisease(file) {
  const formData = new FormData();
  formData.append("file", file);

  return request("/api/predict", {
    method: "POST",
    body: formData
  });
}

export async function askAssistant(message, language, file) {
  if (!file) {
    throw new Error("Please upload a crop image first.");
  }

  const formData = new FormData();
  formData.append("message", message);
  formData.append("language", language);
  formData.append("file", file);

  return request("/api/assistant", {
    method: "POST",
    body: formData
  });
}

export function getDetectionHistory() {
  return request("/api/history");
}

export function deleteDetectionHistory(id) {
  return request(`/api/history/${id}`, {
    method: "DELETE"
  });
}

export { API_URL };
