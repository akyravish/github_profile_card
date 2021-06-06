const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const searchData = document.querySelector('.search');
const avatar = document.querySelector('.avatar');
const main = document.getElementById('main');

// get search value
form.addEventListener('submit', (e) => {
	e.preventDefault();
	let searchValue = searchData.value;
	if (searchValue) {
		getUsers(searchValue);
		searchValue = '';
	}

	form.reset();
});

const errorCard = () => {
	main.innerHTML = `<div class="card error">Sorry, This user doesn't exit.</div>`;
};

// get api request
async function getUsers(username) {
	try {
		const { data } = await axios(APIURL + username);
		const reposUrl = `${APIURL + username}/repos`;
		console.log(reposUrl);
		main.innerHTML = `
             <div class="card">
                <div>
                    <img src=${data.avatar_url} alt="avatar" class="avatar">
                </div>
                <div class="user-info">
                    <h2>${data.name}</h2>
                    <p>${
						data.bio === null
							? 'There is nothing to show.'
							: data.bio
					}</p>
                    <ul>
                    <li>${data.followers}<strong> Followers</strong></li>
                    <li>${data.following}<strong> Following</strong></li>
                    <li>${data.public_repos}<strong> Repos</strong></li>
                    </ul>
                    <div id="repos">
                    </div>
                </div>
            </div>
        `;

		console.log(data);
	} catch (error) {
		if (error.response.status === 404) {
			errorCard();
		}
	}
}
