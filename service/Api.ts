import { ApiUrl } from "../config/config";

class Api {
  public url: string = "";
  public auth: boolean = false;
  public type: "form" | "json" = "json";
  public token: string = "";
  public header: any = {};
  public body: any = {};

  public call = async () => {
    const url = ApiUrl + this.url;
    const headers: any = {
      ...this.header,
    };

    if (this.auth && this.token) {
      headers["Authorization"] = "Bearer " + this.token;
    }

    // Jangan tambahkan `Content-Type` secara manual jika menggunakan FormData
    let body: any;
    if (this.type === "json") {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(this.body);
    } else if (this.type === "form") {
      body = this.body; // Jangan modifikasi FormData
    }

    const options: RequestInit = {
      method: "POST",
      headers: this.type === "form" ? headers : { ...headers, "Content-Type": headers["Content-Type"] },
      body: body,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      return data;
    } catch (error) {
      return {
        meta: {
          code: 400,
          status: "Bad Request",
          message: "Bad Request",
        },
        data: error,
      };
    }
  };
}

export default Api;
