'use strict';
gsap.registerPlugin(Draggable, InertiaPlugin);

// также перемещать и видео превью
let vw = (coef) => {
	return window.innerWidth * (coef/100);
}
let vh = (coef) => window.innerHeight * (coef/100);


let input = prompt("Введите номер салона сотовой связи")
// let input = '6';
console.log(input);

// наверное, не работает
window.addEventListener('resize', function(){
	vw = (coef) => window.innerWidth * (coef/100);
	vh = (coef) => window.innerHeight * (coef/100);
});
window.addEventListener('deviceorientation', function(){
	vw = (coef) => window.innerWidth * (coef/100);
	vh = (coef) => window.innerHeight * (coef/100);
});

const body = document.querySelector("body");
const container = document.querySelector(".container");


const leftCard = document.querySelector(".left-card");
const rightCard = document.querySelector(".right-card");
const left = document.querySelector(".left");
const right = document.querySelector(".right");


let qrLeft = document.querySelector(".left2__qr");
let qrRight = document.querySelector(".right2__qr");




const preview = document.querySelector(".preview");
const leftText = document.querySelector(".left-description__text");



gsap.to(left, {xPercent: -100, duration: 0});
gsap.to(right, {xPercent: 100, duration: 0});

window.addEventListener('resize', function(){
	gsap.to(".left, .container, .right", 
	{
		width: vw(100), 
		height: vh(100)
	});
});

// показать превью
leftText.addEventListener("click", () => {
	gsap.to(preview, {
		duration: 0.7, 
		scale: 1,
		yPercent: 0,
		opacity: 1
	});
})
preview.addEventListener("click", () => {
	gsap.to(preview, {
		duration: 0.7, 
		scale: 0.7,
		yPercent: 100,
		opacity: 1
	});
})


// левая карточка
leftCard.addEventListener("click", () => {
	gsap.from(".left", 
	{
		scale: 0.7,
		duration: 0.7,
	})
	gsap.to(".left, .container, .right", 
	{
		scale: 1, 
		duration: 0.7,
		x: '+=100%'
	});
	gsap.to(".container", 
	{
		scale: 0.7,
		duration: 0.7,
	})
	qrCode.append(qrLeft);

	window.addEventListener('resize', function(){
		let qrCanvasLeft = qrLeft.querySelector("canvas");
		qrCanvasLeft.setAttribute("style",`width:${vw(23.4375)}px`);
	});
	window.addEventListener('deviceorientation', function(){
		let qrCanvasLeft = qrLeft.querySelector("canvas");
		qrCanvasLeft.setAttribute("style",`width:${vw(23.4375)}px`);
	});
})


// правая карточка
rightCard.addEventListener("click", () => {
	gsap.from(".right", 
	{
		scale: 0.7,
		duration: 0.7,
	})
	gsap.to(".left, .container, .right", 
	{
		scale: 1, 
		duration: 0.7,
		x: '-=100%'
	});
	gsap.to(".container", 
	{
		scale: 0.7,
		duration: 0.7,
	})

	// настройки QR кода для правой карточки
	const qrCode = new QRCodeStyling({
		width: vw(23.4375),
		height: vw(23.4375),
		type: "canvas",
		data: `https://kion.ru/test?utm_source=SALON&utm_medium=SALON-${input}`,

		dotsOptions: {
			color: "#FFFFFF",
			type: "rounded"
		},
		cornersSquareOptions: {
			color: "#FFFFFF",
			type: "extra-rounded"
		},
		cornersDotOptions: {
			color: "#FFFFFF",
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

	qrCode.append(qrRight);

	window.addEventListener('resize', function(){
		let qrCanvasRight = qrRight.querySelector("canvas");
		qrCanvasRight.setAttribute("style",`width:${vw(23.4375)}px`);
	});
	window.addEventListener('deviceorientation', function(){
		let qrCanvasRight = qrRight.querySelector("canvas");
		qrCanvasRight.setAttribute("style",`width:${vw(23.4375)}px`);
	});
})

let returnLeft = document.querySelector(".left2__return");
let returnRight = document.querySelector(".right2__return");


returnLeft.addEventListener("click", () => {
	gsap.from(".container", 
	{
		scale: 0.7,
		duration: 0.7,
	})
	gsap.to(".left, .container, .right", 
	{
		scale: 1, 
		duration: 0.7,
		x: '-=100%'
	});
	gsap.to(".left", 
	{
		scale: 0.7,
		duration: 0.7,
	})


	// сброс перемещений draggable
	// без i будет работать только 1 раз
	// setinterval для задержки
	let i = 0;
	setInterval(function(){ 
		if (i < 1) {
			gsap.set(".drag", {clearProps:"all"});
			i += 1;
		}
	}, 500);
})

returnRight.addEventListener("click", () => {
	gsap.from(".container", 
	{
		scale: 0.7,
		duration: 0.7,
	})
	gsap.to(".left, .container, .right", 
	{
		scale: 1, 
		duration: 0.7,
		x: '+=100%'
	});
	gsap.to(".right", 
	{
		scale: 0.7,
		duration: 0.7,
	})
	
	let qrCanvasRight = qrRight.querySelector("canvas");
	setInterval(function(){ 
		qrCanvasRight.remove()
	}, 500);


	// сброс перемещений draggable
	// без i будет работать только 1 раз
	// setinterval для задержки
	let i = 0;
	setInterval(function(){ 
		if (i < 1) {
			gsap.set(".dragRight", {clearProps:"all"});
			i += 1;
		}
	}, 500);
});


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
		yPercent: 0,
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





Draggable.create(".drag", {
	type:"x,y", 
	edgeResistance:0.7, 
	bounds:".left-description", 
	inertia:true,
	throwProps:true,
	// onDrag:adjustOpacity,
	// onThrowUpdate:adjustOpacity
});

Draggable.create(".dragRight", {
	type:"x,y", 
	edgeResistance:0.7, 
	bounds:".right-description", 
	inertia:true,
	throwProps:true,
	// onDrag:adjustOpacity,
	// onThrowUpdate:adjustOpacity
});

// function adjustOpacity() {
// var distanceFromMaxX = this.x - this.maxX,
// 	distanceFromMinX = this.minX - this.x,
// 	distanceFromMaxY = this.y - this.maxY,
// 	distanceFromMinY = this.minY - this.y,
// 	opacityRange = 100,
// 	furthestDistance = Math.max(distanceFromMaxX, distanceFromMinX, distanceFromMaxY, distanceFromMinY),
// 	opacity = 1;
// 	if (furthestDistance > 0) {
// 	opacity = 1.05 - (Math.min(furthestDistance, opacityRange) / opacityRange);
// 	}
// 	TweenLite.set(this.target, {opacity:opacity});
// }
