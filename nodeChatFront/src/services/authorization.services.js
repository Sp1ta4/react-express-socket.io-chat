const BACKEND_URL = 'http://localhost:4444'
import axios from "axios";
import validator from 'validator';

class AuthorizationServices {
  async login(email, password) {
    const isValidInputs = validator.isEmail(email) && password.toString().trim().length >= 8;
    if (isValidInputs) {
      const user = {
        email,
        password,
      };
      const response = await axios
        .post(`${BACKEND_URL}/login`, user);
      if (response.statusText === 'OK') {
        return response.data.token;
      } else {
        console.log("server error. code: 500");
      }
    } else {
      console.log('write all inputs');
    }
  }
  async registration(email, name, password, confirmPassword) {
    const isValidInputs = validator.isEmail(email) && name.toString().trim().length >= 4 && password.toString().trim().length >= 8 && password === confirmPassword;
    if (isValidInputs) {
      const user = {
        name,
        email,
        password,
        confirmPassword
      };
      const response = await axios
        .post(`${BACKEND_URL}/register`, user);
      if (response.statusText === 'OK') {
        return response.statusText;
      } else {
        console.log("server error. code: 500");
      }
    } else {
      console.log('write all inputs');
    }
  }
  async checkTokenValidation(token) {
    // eslint-disable-next-line no-async-promise-executor
    const response = await axios
      .get(`${BACKEND_URL}/oneUser`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
    if (response.statusText === "OK") {
      localStorage.setItem('name', response.data.name);
      localStorage.setItem('id', response.data.id);
      return true
    } else {
      false
    }
  }
}

export default new AuthorizationServices();