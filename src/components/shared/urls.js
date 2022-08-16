const BASE_URL = "http://localhost:5000";

//https://app-linkr.herokuapp.com
// http://localhost:5000

const urls = {
	signup: `${BASE_URL}/signup`,
	signin: `${BASE_URL}/signin`,
	timeline: `${BASE_URL}/timeline`,
	getPosts: `${BASE_URL}/posts`,
	delete: `${BASE_URL}/posts`,
	like: `${BASE_URL}/like`,
	getUsers: `${BASE_URL}/users`,
	updatePost: `${BASE_URL}/posts`,
	getHashtag: `${BASE_URL}/hashtag`,
	getHashtags: `${BASE_URL}/hashtags`,
	follow: `${BASE_URL}/follow`,
};

export default urls;
