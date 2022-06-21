// const btn = document.getElementById("click");

// const namesArray = [
// 	{
// 		id: 0,
// 		name: "John",
// 		likes: 0,
// 		dislikes: 0,
// 	},
// 	{ id: 1, name: "Alan", likes: 0, dislikes: 0 },
// 	{ id: 2, name: "Oleg", likes: 0, dislikes: 0 },
// ];

// let selectedPersonId = -1;

// function getRandomName() {
// 	const randomElement = Math.floor(Math.random() * 3);

// 	selectedPersonId = namesArray[randomElement].id;

// 	return namesArray[randomElement].name;
// }

// btn.addEventListener("click", () => {
// 	const svg = btn.children[0];
// 	const userName = getRandomName();

// 	const text = document.createElement("p");

// 	text.classList.add("text");

// 	const user = namesArray.find(el => el.id === selectedPersonId);

// 	if (svg.classList.contains("active")) {
// 		user.dislikes = ++user.dislikes;
// 		text.innerHTML = `${userName}, dislikes this post ${user.dislikes}`;
// 	} else {
// 		user.likes = ++user.likes;
// 		text.innerHTML = `${userName}, likes this post ${user.likes}`;
// 	}

// 	document.getElementsByTagName("body")[0].appendChild(text);
// 	svg.classList.toggle("active");
// });

const form = document.querySelector(".form");
const cards = document.querySelector(".cards");

const createCard = () => {
	const cardsArray = JSON.parse(localStorage.getItem("cardsArray"));

	cardsArray.forEach(el => {
		const card = document.createElement("div");

		card.classList.add("card");
		card.innerHTML = `
      <h2 class="card__title">${el.title}</h2>
      <p class="card__description">
        ${el.plaintext}
      </p>
  
      <div class="card__footer">
        <button class="card__btn">like</button>
        <button class="card__btn">dislike</button>
      </div>
    `;

		cards.appendChild(card);
	});
};

form.addEventListener("submit", event => {
	event.preventDefault();
	const messageObject = {};
	const messages = JSON.parse(localStorage.getItem("cardsArray"));

	Array.from(form).map(el => {
		if (el.hasAttribute("name")) {
			messageObject[el.name] = el.value;
		}
	});

	messages.push(messageObject);
	localStorage.setItem("cardsArray", JSON.stringify(messages));

	createCard();
	messages.length = 0;
	form.reset();
});

window.onload = () => createCard();
