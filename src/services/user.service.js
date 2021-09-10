import axios from 'axios';

const API_URL = process.env.VUE_APP_URL;

class UserService {
  token = null;
  Instance = axios.create();
  toast = null;

  setToast (toast) {
    this.toast = toast;
  }

  settingTokken (newToken) {
    this.Instance.interceptors.request.use(
      async config => {
        config.headers = {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        };
        return config;
      },
      error => {
        Promise.reject(error);
      });

      this.Instance.interceptors.response.use(
        (response) => {
          return response;
        },
        async function (error) {
          const originalRequest = error.config;
          if (error.response) {
            if (error.response.status === 403 && !originalRequest._retry) {
              originalRequest._retry = true;
              await this.authHeader();
            }
          }
          return Promise.reject(error);
        });
  }

  authHeader () {
    const user = localStorage.getItem('token');
    if (this.token !== `${user}`) {
      this.token = `${user}`;
      this.settingTokken(this.token);
    }
  }

  // get -- ok --
  async getResponseJwt (url, res) {
    this.authHeader();
    try {
      const responce = await this.Instance.get(`${API_URL}${url}`, res);
      return responce;
    } catch (e) {
      throw e.message;
    }
  }

  // -- ok --
  async getResponse (url, res) {
    this.authHeader();
    try {
      const responce = await this.Instance.get(`${API_URL}${url}`, res);
      return responce;
    } catch (e) {
      throw e.message;
    }
  }

  async getResponseImg (url) {
    this.authHeader();
    try {
      const apiurl = API_URL.replace('/api/v1', '');
      await axios({
        method: 'get',
        url: `${apiurl}${url}`
      });
      return `${apiurl}${url}`;
    } catch (e) {
      throw e.message;
    }
  }

  /*
  const resp = await axios.get(`${API_URL}${url}`);
      resp.catch(
        (error) => {
          console.log(error);
        }
      );
      resp.then(
        (response) => {
        },
      (error) => {
        console.log(resp);
        throw error.message;
      });
      return result;
  */

  // putImg -- ok --

  async putResponseJwtImg (url, res) {
    this.authHeader();
    try {
      const responce = await axios({
        method: 'put',
        url: `${API_URL}${url}`,
        data: res,
        headers: {
          'Content-Type': 'multipart/form-data',
           Authorization: `Bearer ${this.token}`
        }
      });
      return responce;
    } catch (e) {
      throw e.message;
    }
  }

  async deleteResponceJwt (url) {
    this.authHeader();
    try {
      const responce = await this.Instance.delete(`${API_URL}${url}`);
      return responce;
    } catch (e) {
      throw e.message;
    }
  }

  async patchResponceJwt (url, res) {
    this.authHeader();
    try {
      const responce = await this.Instance.patch(`${API_URL}${url}`, res);
      return responce;
    } catch (e) {
      throw e.message;
    }
  }

  async putResponseJwtLike (url, res) {
    this.authHeader();
    try {
      const responce = await axios({
        method: 'put',
        url: `${API_URL}${url}`,
        data: res,
        headers: {
           Authorization: `Bearer ${this.token}`
        }
      });
      return responce;
    } catch (e) {
      throw e.message;
    }
  }
}

export default new UserService();
