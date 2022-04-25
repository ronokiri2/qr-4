'use strict';
gsap.registerPlugin(Flip);
gsap.config({ trialWarn: false });

const body = document.querySelector("body");
const container = document.querySelector(".container");
let addButton = document.querySelector("#add-button");
let shuffleButton = document.querySelector("#shuffle-button");
let addQRButton = document.querySelector("#add-qr");


let FirstCard = document.querySelector(".first-card");
let SecondCard = document.querySelector(".second-card");

let wrapColor = gsap.utils.wrap(["blue", "red", "purple", "orange"]);
let count = 0;
let state;

let input = prompt("Введите номер салона сотовой связи")

console.log(input);
// const form = document.querySelector(".form");
// const input = document.querySelector(".input");
// const enterButton = document.querySelector("#enter-button");
// const idontknowButton = document.querySelector("#idontknow-button");

// enterButton.addEventListener("click", () => {
// 	if (input.value !== "" || input.value !== " " || input.value !== null || input.value !== required) {
// 		setState(() => form.classList.add("exiting"));
// 		setState(() => form.classList.add("js")); 
// 	}
// });

// idontknowButton.addEventListener("click", () => {
// 	if (input.value !== "" || input.value !== " " || input.value !== null || input.value !== required) {
// 		setState(() => form.classList.add("exiting"));
// 		setState(() => form.classList.add("js")); 
// 	}
// });


// настройки QR кода
const qrCode = new QRCodeStyling({
	width: 150,
	height: 150,
	type: "svg",
	data: `https://kion.ru/test?utm_source=SALON&utm_medium=SALON-${input}`,
	image: "./kion.svg",
	imageSize: "1",
	dotsOptions: {
		color: "#4267b2",
		type: "rounded"
	},
	backgroundOptions: {
		color: "white",
	},
	imageOptions: {
		crossOrigin: "anonymous",
		margin: 0
	}
});






// При клике на первую карточку
function onClickFirstCard() {
	SecondCard = document.querySelector(".second-card");
	if (SecondCard != null) {
		setState(() => SecondCard.classList.add("exiting"));
		setState(() => SecondCard.classList.add("js"));
		setState(() => container.append(createDescription()));
		setState(() => container.append(createQr()));
		setState(() => container.append(createInstruction()));
		setState(() => body.append(createReturnButtonToMainMenu1()));
	}
}

function onClickSecondCard() {
	FirstCard = document.querySelector(".first-card");
	if (FirstCard != null) {
		setState(() => FirstCard.classList.add("exiting"));
		setState(() => FirstCard.classList.add("js"));
		setState(() => container.append(createDescription2()));
		setState(() => container.append(createQr()));
		setState(() => container.append(createInstruction()));
		setState(() => body.append(createReturnButtonToMainMenu2()));
	}
}

function createFirstCard() {
	let FirstCard = document.createElement("img");
	FirstCard.classList.add("box");
	FirstCard.classList.add("js");
	FirstCard.classList.add("first-card");
	FirstCard.src = "./kion.svg";
	
	FirstCard.addEventListener("click", onClickFirstCard);
	return FirstCard;  
}

function createSecondCard() {
	let SecondCard = document.createElement("img");
	SecondCard.classList.add("box");
	SecondCard.classList.add("second-card");
	SecondCard.classList.add("js");
	SecondCard.src = "./kion2.svg";

	SecondCard.addEventListener("click", onClickSecondCard);
	return SecondCard;  
}

function createDescription() {
	let description = document.createElement("div");
	description.classList.add("box");
	description.classList.add("description");
	description.classList.add("js");
	description.textContent = "Описание первой карточки";

	return description;
}

function createDescription2() {
	let description2 = document.createElement("div");
	description2.classList.add("box");
	description2.classList.add("description2");
	description2.classList.add("js");
	description2.textContent = "Описание второй карточки";

	return description2;
}

function createQr() {
	let qr = document.createElement("div");
	qr.classList.add("qr");
	qr.classList.add("box");
	qr.classList.add("js");

	// добавить qr code
	qrCode.append(qr);
	return qr;
}

function createInstruction() {
	let instruction = document.createElement("div");
	instruction.classList.add("box");
	instruction.classList.add("instruction");
	instruction.classList.add("js");
	instruction.textContent = "Инструкция";

	return instruction;
}

// Кнопка НАЗАД для первой карточки
function createReturnButtonToMainMenu1() {
	let ReturnButtonToMainMenu1 = document.createElement("button");
	ReturnButtonToMainMenu1.classList.add("button");
	ReturnButtonToMainMenu1.classList.add("return-button");
	ReturnButtonToMainMenu1.classList.add("js");
	ReturnButtonToMainMenu1.textContent = "Назад";

	// По клику на кнопку НАЗАД удалятся элементы и добавится вторая карточка
	function onClick1() {
		let instruction = document.querySelector(".instruction");
		let description = document.querySelector(".description");
		let qr = document.querySelector(".qr");
		setState(() => ReturnButtonToMainMenu1.classList.add("exiting"));
		setState(() => instruction.classList.add("exiting"));
		setState(() => description.classList.add("exiting"));
		setState(() => qr.classList.add("exiting"));
		
		setState(() => container.append(createSecondCard()));

		FirstCard = document.querySelector(".first-card");
		FirstCard.addEventListener("click", onClickFirstCard);
	}
	ReturnButtonToMainMenu1.addEventListener("click", onClick1);

	return ReturnButtonToMainMenu1;
}




// Кнопка НАЗАД для второй карточки
function createReturnButtonToMainMenu2() {
	let ReturnButtonToMainMenu2 = document.createElement("button");
	ReturnButtonToMainMenu2.classList.add("button");
	ReturnButtonToMainMenu2.classList.add("return-button");
	ReturnButtonToMainMenu2.classList.add("js");
	ReturnButtonToMainMenu2.textContent = "Назад";

	// По клику на кнопку НАЗАД удалятся элементы и добавится первая карточка
	function onClick2() {
		let instruction = document.querySelector(".instruction");
		let description2 = document.querySelector(".description2");
		let qr = document.querySelector(".qr");
		setState(() => ReturnButtonToMainMenu2.classList.add("exiting"));
		setState(() => instruction.classList.add("exiting"));
		setState(() => description2.classList.add("exiting"));
		setState(() => qr.classList.add("exiting"));

		setState(() => container.prepend(createFirstCard()));

		SecondCard = document.querySelector(".second-card");
		SecondCard.addEventListener("click", onClickSecondCard);
	}
	ReturnButtonToMainMenu2.addEventListener("click", onClick2);

	return ReturnButtonToMainMenu2;
}




shuffleButton.addEventListener("click", () => {
	setState(() => gsap.utils.shuffle(gsap.utils.toArray(".box")).forEach(box => container.append(box)));  
});



FirstCard.addEventListener("click", () => {
	SecondCard = document.querySelector(".second-card");
	setState(() => SecondCard.classList.add("exiting"));
	setState(() => SecondCard.classList.add("js"));
	setState(() => container.append(createDescription()));
	setState(() => container.append(createQr()));
	setState(() => container.append(createInstruction()));
	setState(() => body.append(createReturnButtonToMainMenu1()));
}, { once: true });

SecondCard.addEventListener("click", () => {
	FirstCard = document.querySelector(".first-card");
	setState(() => FirstCard.classList.add("exiting"));
	setState(() => FirstCard.classList.add("js"));
	setState(() => container.append(createDescription2()));
	setState(() => container.append(createQr()));
	setState(() => container.append(createInstruction()));
	setState(() => body.append(createReturnButtonToMainMenu2()));
}, { once: true });










function setState(action) {
	state = Flip.getState(".box, .button");  
	action();
	animate();
}

function animate() {

	// get the items that are exiting in this batch
	let exiting = gsap.utils.toArray(".exiting");
	
	// Flip.from returns a timeline
	let timeline = Flip.from(state, {
		absolute: true, 
		ease: "power1.inOut",
		targets: ".box, .button",
		scale: true,
		simple: true,
		onEnter(elements) {
		return gsap.fromTo(elements, { 
			opacity: 0,
			scale: 0
		}, { 
			opacity: 1,
			scale: 1,
			delay: 0.2,
			duration: 0.3
		});
		},
		onLeave(elements) {
		return gsap.to(elements, { 
			opacity: 0, 
			scale: 0 
		});
		}
	});
	
	// remove exited elements from the DOM
	timeline.add(() => removeExited(exiting));
}

function removeExited(exited) {

	gsap.utils.toArray(".js").forEach(js => {
		if (exited.includes(js)) {
		js.remove();
		}
	});
}
