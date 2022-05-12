'use strict';
gsap.registerPlugin(Flip);
gsap.config({ trialWarn: false });
const vw = (coef) => window.innerWidth * (coef/100);

console.log(window.innerWidth * (1/100))
const body = document.querySelector("body");
const container = document.querySelector(".container");
const containerLeft = document.querySelector(".container__left");
const containerRight = document.querySelector(".container__right");


const leftCard = document.querySelector(".left-card");
const rightCard = document.querySelector(".right-card");
const left = document.querySelector(".left");
const right = document.querySelector(".right");

gsap.set(left, {scale: 0, x: vw(-100)});
gsap.set(right, {scale: 0, x: vw(100)});

leftCard.addEventListener("click", () => {
	gsap.to(left, {
		duration: 1, 
		scale: 1,
		x: 0
	});
})

rightCard.addEventListener("click", () => {
	gsap.to(right, {
		duration: 1, 
		scale: 1,
		x: 0
	});
})







// let input = prompt("Введите номер салона сотовой связи")
let input = '6';
console.log(input);


// настройки QR кода
const qrCode = new QRCodeStyling({
	width: vw(23.4375),
	height: vw(23.4375),
	type: "svg",
	data: `https://kion.ru/test?utm_source=SALON&utm_medium=SALON-${input}`,
	image: "./kion.svg",
	imageSize: "1",
	dotsOptions: {
		color: "#C32F77",
		type: "rounded"
	},
	cornersSquareOptions: {
		color: "#C32F77",
		type: "dot"
	},
	cornersDotOptions: {
		color: "#C32F77",
		type: "dot"
	},
	backgroundOptions: {
		color: "transparent",
	},
	imageOptions: {
		crossOrigin: "anonymous",
		margin: 0
	}
});

function createQr() {
	let qr = document.createElement("div");
	qr.classList.add("qr");
	qr.classList.add("js");

	// добавить qr code
	return qr;
}

let qr = document.querySelector(".left2__qr");
qrCode.append(qr);


