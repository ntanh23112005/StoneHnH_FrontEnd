import axios from "../axios.customize";

const creatNewPost = (rateData) => {
  const URL_CREATE_RATE = "/api/v1/rates";
  return axios.post(URL_CREATE_RATE, rateData);
};

export { creatNewPost };
