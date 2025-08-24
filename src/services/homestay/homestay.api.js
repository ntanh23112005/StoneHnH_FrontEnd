import axios from "../axios.customize";

const fetchAllHomeStayAPI = (category, current, areaAddress, maxCustomer) => {
  const URL_BACKEND = `/api/v1/homestay?category=${category}&page=${current}&size=8&areaAddress=${areaAddress}&maxCustomer=${maxCustomer}`;
  return axios.get(URL_BACKEND);
};

const getHomestayForDetailById = (id) => {
  const URL_BACKEND = `/api/v1/homestay/${id}`;
  return axios.get(URL_BACKEND);
};

export { fetchAllHomeStayAPI, getHomestayForDetailById };
