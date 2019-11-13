export function authHeader() {
	// return Authorization header with jwt token
	const user = localStorage.getItem('token');
	if(user) return {
		'Authorization': 'Bearer ' + user,
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};
	return {};
}