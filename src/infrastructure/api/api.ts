import axios from "axios";
export class Api {
  url: string;
  constructor(url_param: string) {
    this.url = url_param;
  }
  async getter() {
    try {
      const response = await axios.get(this.url);
      // return response.data.slice(1, 151);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
