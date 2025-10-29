import * as SecureStore from "expo-secure-store";

const baseURL = "https://api.vercel.com";

export const fetchData = async (endpoint: string) => {
  const token = await SecureStore.getItemAsync("Token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(`${baseURL}${endpoint}`, { headers });
  if (!res.ok) throw new Error("Network error");
  return res.json();
};
