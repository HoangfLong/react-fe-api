import API, { urls } from "../api";

export async function signIn(payload) {
  return await API.post(urls.login, payload)
}

export async function registerUser(payload) {
  return await API.post(urls.register, payload);
}