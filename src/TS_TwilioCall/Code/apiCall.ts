import axios, { AxiosRequestConfig } from "axios";

export const getData = ({ url, params }) => {
  const options = {
    method: "GET",
    params,
    url,
  } as AxiosRequestConfig;
  return axios(options);
};

export const postData = ({ url, body }) =>
  axios.post(url, body, { headers: { "content-type": "application/json" } });

export const putData = ({ url, body }, config: any) =>
  axios.put(url, body, config);

export const deleteData = (url: any, data: any) => axios.delete(url, { data });
