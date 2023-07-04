import API from "./axios.config";
import authHeader from '../services/Auth.Header';

async function getArticles() {
    const response = await API.get("articles");
    return response.data;
  }

async function getArticle(id) {
    const response = await API.get("articles/" + id, {
      headers: authHeader(),
    });
    return response.data;
}

async function postArticle(data) {
    const response = await API.post("articles/create", data, {
      headers: authHeader(),
    });
    return response;
}

async function putArticlePublish(id) {
    const response = await API.put(
      "articles/togglePublish/" + id,
      { publish: true },
      {
        headers: authHeader(),
      }
    );
    return response.data;
  }

async function deleteArticle(id) {
    const response = await API.delete("article/" + id, {
      headers: authHeader(),
    });
    return response.data;
}
export {
    getArticles,
    getArticle,
    postArticle,
    putArticlePublish,
    deleteArticle
};
