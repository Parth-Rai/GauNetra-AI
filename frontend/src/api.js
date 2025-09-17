const API_URL = "http://localhost:5000";

export async function predictImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_URL}/api/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Prediction request failed");
  }

  return await response.json();
}

export async function getDashboardData() {
    const response = await fetch(`${API_URL}/api/dashboard`);
    if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
    }
    return await response.json();
}