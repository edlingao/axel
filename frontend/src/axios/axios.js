import axios from 'axios';
// Setting axios headers
const accessToken = localStorage.getItem('AccessTokenObj') !== null
  ? JSON.parse(localStorage.getItem('AccessTokenObj'))
  : {};

axios.defaults.headers = {
  'access-token': accessToken.accessToken,
  client: accessToken.client,
  uid: accessToken.uid,
  'Content-Type': 'application/json',
};
axios.defaults.validateStatus = (status) => status >= 200;

export default axios;
