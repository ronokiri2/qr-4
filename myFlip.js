'use strict';
gsap.registerPlugin(Flip);
gsap.config({ trialWarn: false });

const body = document.querySelector("body");
const container = document.querySelector(".container");
const containerLeft = document.querySelector(".container__left");
const containerRight = document.querySelector(".container__right");



let state;

// let input = prompt("Введите номер салона сотовой связи")
let input = '6';
console.log(input);


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
		color: "red",
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
	qrCode.append(qr);
	return qr;
}
