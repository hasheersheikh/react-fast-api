import { apiConfig, resourceType } from "./types";
import { generateDataUrl } from "./url";

// core function to generate apis
export const resolvePromiseAction = (response) => {
  return Promise.resolve(response?.data);
};
export const rejectPromiseAction = (error) => {
  return Promise.reject(error);
};
export const fetchAPI = async (func) => {
  try {
    const response = await func;
    return resolvePromiseAction(response);
  } catch (err) {
    return rejectPromiseAction(err);
  }
};

// recursive function use to build chaning operation for client
export const apiFactory = (client, resource, baseUrl: () => string, rname: string | undefined = undefined): any => {
  function url(queryPayload = {}) {
    let Url = baseUrl();
    if (Object.keys(queryPayload).length !== 0) return generateDataUrl(Url, queryPayload);
    else return Url;
  }
  function factoryUrl(name: string) {
    // url
    let Url = baseUrl();
    if (name) Url = `${Url}/${name}`;
    return Url;
  }
  // default operation attached to all resource key  and sub resource
  const r: any = {
    get: ({ params = {}, ...config }: apiConfig = {}) => fetchAPI(client.get(url(params), config)),
    post: (body: any, { params = {}, ...config }: apiConfig = {}) => fetchAPI(client.post(url(params), body, { ...config })),
    put: (body: any, { params = {}, ...config }: apiConfig = {}) => fetchAPI(client.put(url(params), body, { ...config })),
    delete: ({ params = {}, ...config }: apiConfig = {}) => fetchAPI(client.delete(url(params), { ...config })),
    patch: (body: any, { params = {}, ...config }: apiConfig = {}) => fetchAPI(client.patch(url(params), body, { ...config })),
  };

  // if subresources is present then do chaning for subresource , with base path as current url/subresource-key
  if (resource.subResources) {
    resource.subResources.forEach((sub) => {
      const { key, name = key } = sub;
      r[name] = (...n: any) => apiFactory(client, sub, () => `${factoryUrl(rname)}/${key}`, n ? n.join("/") : n);
    });
  }

  return r;
};

// will take resources array and give api client with chaning
export const generate = (client, resources: resourceType, baseUrl: () => string): any => {
  const result = {};
  resources.forEach((resource) => {
    const { key, name = key } = resource;
    const url: any = "baseUrl" in resource ? resource.baseUrl : baseUrl;
    const sendUrl = url() !== "" ? () => `${url()}/${key}` : () => key;
    result[name] = (rname: string | undefined) => apiFactory(client, resource, sendUrl, rname);
  });
  return result;
};
