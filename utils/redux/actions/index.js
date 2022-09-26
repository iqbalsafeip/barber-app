import axios from "axios";

const base_url = "http://192.168.1.11:8000/api";

import { Storage } from "expo-storage";

export const login = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(base_url + "/login", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        console.log(res);
        alert(JSON.stringify(res));
        await Storage.setItem({
          key: `user`,
          value: JSON.stringify(res.data.data),
        });
        dispatch({ type: "SET_LOGIN", payload: true });
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const register = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(base_url + "/users", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        alert(JSON.stringify(res));
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const me = () => async (dispatch) => {
  const item = JSON.parse(await Storage.getItem({ key: `user` }));
  if (item) {
    dispatch({ type: "SET_USER", payload: item });
    dispatch({ type: "SET_LOGIN", payload: true });
  }

  return item ? true : false;
};

export const getBarber = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(base_url + "/barber")
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getBarberId = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(base_url + "/barber/" + id)
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
