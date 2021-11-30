import axios from 'axios';
import { MAIN_URL } from './Url';
export function getPosts(){
    return axios.get(`${MAIN_URL}posts/fetchpost`);
}
export function addPost(data){
    return axios.post(`${MAIN_URL}posts/addpost`,data);
}
export function deletePost(index){
    return axios.delete(`${MAIN_URL}posts/deletepost/${index}`,index);
}

export function editPost(index){
    return axios.get(`${MAIN_URL}posts/editpost/${index}`);
}
export function updatePost(data){
    return axios.put(`${MAIN_URL}posts/updatepost/${data.title}`,data);
}