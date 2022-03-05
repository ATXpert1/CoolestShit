import axios from 'axios'
// shortcut links for API
const usersUrl = "http://jsonplaceholder.typicode.com/users";
const todosUrl = "http://jsonplaceholder.typicode.com/todos";
const postsUrl = "http://jsonplaceholder.typicode.com/posts";
// utility functions
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
const postTodoAxios = (url, todo) => {
    return axios.post(url + todo.userId, todo)
}
const postPostsAxios = (url, post) => {
    return axios.post(url + post.userId, post)
}
const postUsersAxios = (url, user) => {
    return axios.post(url, user)
}
const utilityTools = {
    usersUrl,
    todosUrl,
    postsUrl,
    updateUserAxios,
    deleteUserAxios,
    getUsersAxios,
    getUserTodosAxios,
    getUserPostsAxios,
    postTodoAxios,
    postPostsAxios,
    postUsersAxios
};

export default utilityTools;