'use strict';
gsap.registerPlugin(Flip);
gsap.config({ trialWarn: false });

const body = document.querySelector("body");
const container = document.querySelector(".container");
const containerLeft = document.querySelector(".container__left");
const containerRight = document.querySelector(".container__right");

const vw = (coef) => window.innerWidth * (coef/100);


let state;

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
		color: "#4267b2",
		type: "rounded"
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