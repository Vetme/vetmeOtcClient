import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default {
  getAccount: (account: string) => axios.get(`${BASE_URL}/users/${account}`),
  upDateList: (data: any) => axios.patch(`${BASE_URL}/lists/${data.id}`, data),
};
