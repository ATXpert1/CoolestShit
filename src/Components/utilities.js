import axios from 'axios'

const usersUrl = "http://jsonplaceholder.typicode.com/users";
const todosUrl = "http://jsonplaceholder.typicode.com/todos";
const postsUrl = "http://jsonplaceholder.typicode.com/posts";

const updateUserAxios = (url, user) => {
    return axios.put(url + user.id, user)
}
const deleteUserAxios = (url, id) => {
    return axios.delete(url + id)
}
const getUsersAxios = (url) => {
    return axios.get(url)
}
const getUserTodosAxios = (url, id) => {
    return axios.get(url+id)
}
const getUserPostsAxios = (url, id) => {
    return axios.get(url+id)
}
const utilityTools = {
    usersUrl,
    todosUrl,
    postsUrl,
    updateUserAxios,
    deleteUserAxios,
    getUsersAxios,
    getUserTodosAxios,
    getUserPostsAxios
};

export default utilityTools;