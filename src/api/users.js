import API from './axios.config';
import authHeader from '../services/Auth.Header';

//GET
async function getMe() {
    const response = await API.get('users/me', { headers: authHeader() });
    return response.data;
}

export {
    getMe,
};
