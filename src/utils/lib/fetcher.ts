import { LOCAL_STORAGE_KEY } from "../helper";

export default function fetcher(url: string, data: any = undefined) {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.AccessToken);
  console.log(`Bearer ${accessToken}`);
  const API_URL = "http://localhost:3333";
  return fetch(`${API_URL}/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
