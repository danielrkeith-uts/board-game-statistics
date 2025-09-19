import type { Account } from "../types.ts";
import { apiGet, apiPost } from "./api-utils.ts";

export const apiLogin = (email: string, password: string): Promise<boolean> =>
  apiPost("/account/login", { email, password }).then((res) => {
    if (res.ok) {
      return true;
    }
    if (res.status === 401) {
      return false;
    }
    throw new Error(`Error logging in: ${res.statusText}`);
  });

export const apiLogout = (): Promise<Response> => apiPost("/account/logout");

export const apiCreateAccount = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string
): Promise<{ ok: boolean; message?: string }> => {
  const res = await apiPost("/account/create", {
    email,
    firstName,
    lastName,
    password,
  });

  if (res.ok) return { ok: true };

  if (res.status === 400) {
    try {
      const data = await res.json();
      return { ok: false, message: data?.message || "Bad request" };
    } catch {
      return { ok: false, message: "Bad request" };
    }
  }

  throw new Error(`Error creating account: ${res.status} ${res.statusText}`);
};

export const apiGetLoggedInAccount = (): Promise<Account> =>
  apiGet("/account/me")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 401) {
        return null;
      }
      throw new Error(`Error getting logged in account: ${res.statusText}`);
    })
    .then((data) => {
      return data as Account;
    });
