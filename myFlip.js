'use strict';
// добавить ресайзы для вертикали
const vw = (coef) => window.innerWidth * (coef/100);
const vh = (coef) => window.innerHeight * (coef/100);

console.log(window.innerWidth * (1/100))
const body = document.querySelector("body");
const container = document.querySelector(".container");
const containerLeft = document.querySelector(".container__left");
const containerRight = document.querySelector(".container__right");


const leftCard = document.querySelector(".left-card");
const rightCard = document.querySelector(".right-card");
const left = document.querySelector(".left");
const right = document.querySelector(".right");


let qrLeft = document.querySelector(".left2__qr");
let qrRight = document.querySelector(".right2__qr");

// gsap.set(left, {scale: 0.5, opacity: 0.1, y: vh(-100)});
// gsap.set(right, {scale: 0.5, opacity: 0.1, y: vh(100)});




const preview = document.querySelector(".preview");
const leftText = document.querySelector(".left-description__text");






leftText.addEventListener("click", () => {
	gsap.to(preview, {
		duration: 1, 
		scale: 1,
		y: 0,
		opacity: 1
	});
})
preview.addEventListener("click", () => {
	gsap.to(preview, {
		duration: 1, 
		scale: 1,
		y: vh(100),
		opacity: 1
	});
})




leftCard.addEventListener("click", () => {
	gsap.to(left, {
		duration: 1, 
		scale: 1,
		y: vh(100),
		opacity: 1
	});
	gsap.to(container, {
		duration: 1, 
		scale: 0.5,
		y: vh(100),
		opacity: 1
	});
	qrCode.append(qrLeft);

	window.addEventListener('resize', function(){
		let qrCanvasLeft = qrLeft.querySelector("canvas");
		qrCanvasLeft.setAttribute("style",`width:${vw(23.4375)}px`);
	});
})

rightCard.addEventListener("click", () => {
	gsap.to(right, {
		duration: 1, 
		scale: 1,
		y: vh(-100),
		opacity: 1
	});
	gsap.to(container, {
		duration: 1, 
		scale: 0.5,
		y: vh(-100),
		opacity: 1
	});

	qrCode.append(qrRight);

	window.addEventListener('resize', function(){
		let qrCanvasRight = qrRight.querySelector("canvas");
		qrCanvasRight.setAttribute("style",`width:${vw(23.4375)}px`);
	});
})

let returnLeft = document.querySelector(".left2__return");
let returnRight = document.querySelector(".right2__return");


returnLeft.addEventListener("click", () => {
	gsap.to(left, {
		duration: 1, 
		scale: 0.5,
		y: vh(-100)
	});
	gsap.to(container, {
		duration: 1, 
		scale: 1,
		y: vh(0),
		opacity: 1
	});
})

returnRight.addEventListener("click", () => {
	gsap.to(right, {
		duration: 1, 
		scale: 0.5,
		y: vh(100)
	});
	gsap.to(container, {
		duration: 1, 
		scale: 1,
		y: vh(0),
		opacity: 1
	});
})



// let input = prompt("Введите номер салона сотовой связи")
let input = '6';
console.log(input);


// настройки QR кода
const qrCode = new QRCodeStyling({
	width: vw(23.4375),
	height: vw(23.4375),
	type: "canvas",
	data: `https://kion.ru/test?utm_source=SALON&utm_medium=SALON-${input}`,

	dotsOptions: {
		color: "#C32F77",
		type: "rounded"
	},
	cornersSquareOptions: {
		color: "#C32F77",
		type: "extra-rounded"
	},
	cornersDotOptions: {
		color: "#C32F77",
		// type: "rounded"
	},
	backgroundOptions: {
		color: "transparent",
	},
	imageOptions: {
		crossOrigin: "anonymous",
		margin: 0
	}
});


let inactivityTime = function () {
	let time;
	window.onload = resetTimer;
	document.onmousemove = resetTimer;
	document.onkeypress = resetTimer;
	function logout() {
	  console.log("You are now logged out.")

	  gsap.to(preview, {
		duration: 1, 
		scale: 1,
		x: 0,
		opacity: 1
	});
	}
	function resetTimer() {
	  clearTimeout(time);
	  time = setTimeout(logout, 60000)
	}
  };
  inactivityTime();
  console.log('Please wait...');
