import type { ApiUser } from "../types/user.types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getUsers(): Promise<ApiUser[]> {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Не удалось загрузить пользователей");
  }

  return response.json();
}

export async function getUserById(id: string): Promise<ApiUser> {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error("Не удалось загрузить пользователя");
  }

  return response.json();
}