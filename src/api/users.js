import API from './axios.config';
import authHeader from '../services/Auth.Header';

//GET
async function getMe() {
    const response = await API.get('users/me', { headers: authHeader() });
    return response.data;
}

async function putProfile(data, onProgress) {
    const response = await API.put('users/profile', data, {
        headers: authHeader(),
        onUploadProgress: onProgress,
    });
    return response;
}

async function deleteAccount() {
    const response = await API.delete('users/me', {
        headers: authHeader(),
    });
    return response.data;
}

export {
    getMe,
    putProfile,
    deleteAccount
};
