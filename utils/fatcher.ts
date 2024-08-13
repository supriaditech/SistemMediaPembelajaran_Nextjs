import Api from "../service/Api";

export const fetcher = async (
  url: string,
  token: string,
  body?: any
): Promise<any> => {
  const api = new Api();
  api.url = url;
  api.auth = true;
  api.token = token;
  api.body = body;
  const data = await api.call();
  console.log("===========", data);
  return data;
};
