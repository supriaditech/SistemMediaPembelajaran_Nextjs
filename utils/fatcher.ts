import Api from "../service/Api";

export const fetcher = async (url: string, token: string): Promise<any> => {
  console.log(token);
  const api = new Api();
  api.url = url;
  api.auth = true;
  api.token = token;
  const data = await api.call();
  return data;
};
