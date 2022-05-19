const BASE_URL = 'http://localhost:8080/api';

export default {
  getPost: (postID) => `${BASE_URL}/posts.php?id=${postID}`, //    GET
  getPosts: `${BASE_URL}/posts.php`, //                         GET
  signIn: `${BASE_URL}/login.php`, //                    POST
  register: `${BASE_URL}/users.php`, //                         POST
  createPosts: `${BASE_URL}/posts.php`, //                     POST
  editPost: (postID) => `${BASE_URL}/posts.php?id=${postID}`, //   PUT
  deletePost: (postID) => `${BASE_URL}/posts.php?id=${postID}`, // DELETE
};
