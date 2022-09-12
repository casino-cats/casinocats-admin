import { LOCAL_STORAGE_KEY } from "../helper";

const API_URL = "http://localhost:3333";

export const fetcher = (url: string, data: any = undefined) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.AccessToken);
  return fetch(`${API_URL}/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const patcher = (url: string, data: any) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.AccessToken);
  return fetch(`${API_URL}/${url}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
