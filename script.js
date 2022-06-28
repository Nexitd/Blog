const form = document.querySelector(".form");
const cards = document.querySelector(".cards");
const closeBtn = document.querySelector(".close__btn");
const createBtn = document.querySelector(".create__btn");

function closeForm(actionType) {
	if (actionType === "close") {
		form.style.display = "none";
	} else {
		form.style.display = "block";
	}
}

closeBtn.addEventListener("click", function () {
	createBtn.style.display = "block";

	closeForm("close");
});

createBtn.addEventListener("click", function () {
	this.style.display = "none";

	closeForm("create");
});

const createCard = () => {
	if (!localStorage.getItem("cardsArray")) return;

	cards.innerHTML = "";

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
        <button class="card__btn like">like</button>
				<span class="likes">0</span>
        <button class="card__btn dislike">dislike</button>
				<span class="dislikes">0</span>
      </div>
    `;

		cards.appendChild(card);
	});
};

form.addEventListener("submit", event => {
	event.preventDefault();

	const messageObject = {};
	let messages;

	if (localStorage.getItem("cardsArray")) {
		messages = JSON.parse(localStorage.getItem("cardsArray"));
	} else {
		messages = [];
	}

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

	window.location.reload();
});

window.onload = () => {
	createCard();

	const likesBtn = document.querySelectorAll(".like");
	const dislikesBtn = document.querySelectorAll(".dislike");

	respectMark(likesBtn, "likes");
	respectMark(dislikesBtn, "dislikes");
};

const respectMark = (btns, type) => {
	btns.forEach(el => {
		el.addEventListener("click", function () {
			const countText = Array.from(el.parentNode.children).find(
				el => el.classList.value === type
			);

			countText.innerHTML = Number(countText.innerHTML) + 1;
		});
	});
};
