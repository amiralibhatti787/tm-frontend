import axios, { AxiosRequestConfig } from "axios";
import { attachAuthToken } from "./interceptors";

const API_BASE_URL = process.env.API_URL || "http://localhost:5000";

interface UpdateTask {
  name: string;
  _id: string;
}

async function makeApiRequest<T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  token: string,
  data?: any
): Promise<T> {
  const headers = token ? attachAuthToken(token) : {};
  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
    data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Something went wrong!");
  }
}

export async function createTask(name: string, token: string): Promise<any> {
  const url = `${API_BASE_URL}/tasks/create-task`;
  return await makeApiRequest("post", url, token, { name });
}

export async function updateTask(
  id: string,
  token: string,
  task: UpdateTask
): Promise<any> {
  const url = `${API_BASE_URL}/tasks/${id}`;
  return await makeApiRequest("put", url, token, task);
}

export async function fetchTasks(token: string): Promise<any> {
  const url = `${API_BASE_URL}/tasks`;
  return await makeApiRequest("get", url, token);
}

export async function deleteTasks(
  taskIds: string[],
  token: string
): Promise<any> {
  const url = `${API_BASE_URL}/tasks/bulk-delete`;
  return await makeApiRequest("delete", url, token, taskIds);
}

export async function register(
  email: string,
  password: string
): Promise<string> {
  const url = `${API_BASE_URL}/users/register`;
  return await makeApiRequest<string>("post", url, "", {
    email,
    password,
  });
}

export async function login(email: string, password: string): Promise<string> {
  const url = `${API_BASE_URL}/auth/login`;

  const response = await makeApiRequest<any>("post", url, "", {
    email,
    password,
  });

  return response.jwt;
}
