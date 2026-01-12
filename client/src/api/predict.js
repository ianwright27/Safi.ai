export async function predictSmoke(data) {
  const LOCAL_API_URL = "http:///localhost:8000/predict";
  const PRODUCTION_API_URL = import.meta.env.VITE_API_URL; 
  const response = await fetch(LOCAL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
}
