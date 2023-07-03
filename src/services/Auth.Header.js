export default function authHeader() {
    const userStr = localStorage.getItem('user');
    let user = null;
    if (userStr) user = JSON.parse(userStr);
    if (user && user.token) {
        // console.log(user);
        return {
            Authorization: 'Bearer ' + user.token,
        }; // for Spring Boot back-end
        // return { "x-access-token": user.token }; // for Node Express back-end
    } else {
        return {};
    }
}