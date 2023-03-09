import axios, { AxiosResponse } from 'axios';

export async function get(url: string, token: string) {
  const { data } = await axios.get(url, {
    headers: { 'Content-Type': 'application/json', token }
  });
  return data;
}

export async function post<T>(url: string, token: string, payload: T) {
  const { data } = await axios.post(url, payload, {
    headers: { 'Content-Type': 'application/json', token }
  });
  return data;
}
