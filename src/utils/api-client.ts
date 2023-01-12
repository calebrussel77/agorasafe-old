import {QueryCache} from 'react-query';

const apiURL = process.env.REACT_APP_API_URL;

type HeadersType = {
  Authorization?: string;
  'Content-Type'?: string;
};

type ClientProps = {
  data: any;
  token?: string;
  needBaseUrl?: boolean;
  headers?: HeadersType;
} & any;

async function client(
  endpoint: string,
  {
    data,
    token,
    headers: customHeaders,
    needBaseUrl = true,
    ...customConfig
  }: ClientProps
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(needBaseUrl ? `${apiURL}/${endpoint}` : endpoint, config)
    .then(async response => {
      const queryCache = new QueryCache();
      if (response.status === 401) {
        queryCache.clear();
        // await auth.logout();
        // refresh the page for them
        window.location.reload();
        return Promise.reject({message: 'Please re-authenticate.'});
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export {client};
