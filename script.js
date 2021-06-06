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
	}
	form.reset();
});

// getProfile function
const getProfile = (user) => {
	main.innerHTML = `
             <div class="card">
                <div>
                    <img src=${user.avatar_url} alt="avatar" class="avatar">
                </div>
                <div class="user-info">
                    <h2>${user.name}</h2>
                    <p>${
						user.bio === null
							? 'There is nothing to show.'
							: user.bio
					}</p>
                    <ul>
                    <li>${user.followers}<strong> Followers</strong></li>
                    <li>${user.following}<strong> Following</strong></li>
                    <li>${user.public_repos}<strong> Repos</strong></li>
                    </ul>
                    <div id="repos">
                    </div>
                </div>
            </div>
        `;
};

// getRepo function
const getRepo = (repos) => {
	repos.splice(0, 5).forEach((repo) => {
		const reposEl = document.getElementById('repos');
		const linkEl = document.createElement('a');
		linkEl.classList.add('repo');
		linkEl.href = repo.html_url;
		linkEl.innerText = repo.name;
		linkEl.target = '_blank';
		reposEl.appendChild(linkEl);
	});
};

// error card function
const errorCard = () => {
	main.innerHTML = `<div class="card error">Sorry, This user doesn't exit.</div>`;
};

// get api request
async function getUsers(username) {
	try {
		const { data } = await axios(APIURL + username);
		const reposUrl = await axios(
			APIURL + username + '/repos?sort="created"'
		);

		getProfile(data);
		getRepo(reposUrl.data);
	} catch (error) {
		if (error.response.status === 404) {
			errorCard();
		}
	}
}
