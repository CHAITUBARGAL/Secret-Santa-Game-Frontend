import axios from 'axios';

const API = axios.create({
  baseURL: 'https://secret-santa-game-backend4.onrender.com//api/secret-santa'
});

export const assignSecretSanta = (formData) =>
  API.post('/assign', formData, { responseType: 'blob' });

export default { assignSecretSanta };
