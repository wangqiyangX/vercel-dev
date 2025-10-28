const baseURL = "https://api.vercel.com";

export const fetchData = async (endpoint: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
  };
  const res = await fetch(`${baseURL}${endpoint}`, { headers });
  if (!res.ok) throw new Error("Network error");
  return res.json();
};
