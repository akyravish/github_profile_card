const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const searchData = document.querySelector('.search');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	let searchValue = searchData.value;
	getUsers(searchValue);
	form.reset();
});

async function getUsers(username) {
	const { data } = await axios(APIURL + username);
	console.log(data);
}
