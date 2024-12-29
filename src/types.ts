import { AxiosRequestConfig } from "axios";

export interface apiConfig extends AxiosRequestConfig {
  params?: { [key: string]: any };
  headers?: { [key: string]: any };
  resourceName?: string;
  signal?: AbortController["signal"];
}

export type resourceType = {
  key: string;
  name?: string;
  baseUrl?: () => string;
  subResources?: resourceType;
}[];

export interface rType {
  get: (config?: apiConfig) => Promise<any>;
  post: (body?: any, config?: apiConfig) => Promise<any>;
  put: (body?: any, config?: apiConfig) => Promise<any>;
  delete: (config?: apiConfig) => Promise<any>;
  patch: (body?: any, config?: apiConfig) => Promise<any>;
}
