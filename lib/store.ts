import * as SecureStore from "expo-secure-store";

export async function saveToken(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  console.debug("🚀 ~ getValueFor ~ result:", result);
  if (result) {
    return true;
  } else {
    return false;
  }
}
