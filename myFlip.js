'use strict';
gsap.registerPlugin(Draggable, InertiaPlugin);

// также перемещать и видео превью
let vw = (coef) => {
	return window.innerWidth * (coef/100);
}
let vh = (coef) => window.innerHeight * (coef/100);


// let input = prompt("Введите номер салона сотовой связи")
let input = '6';
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
const pick = document.querySelector(".pick");




const right = document.querySelector(".right");

let qrRight = document.querySelector(".right2__qr");




const preview = document.querySelector(".preview");
const previewButton = document.querySelector(".preview-button");
const rightText = document.querySelector(".right-description__text");



gsap.to(right, {xPercent: 100, duration: 0});

window.addEventListener('resize', function(){
	gsap.to(".pick, .right", 
	{
		width: vw(100), 
		height: vh(100)
	});
});

// показать превью
rightText.addEventListener("click", () => {
	gsap.to(preview, {
		duration: 0.7, 
		scale: 1,
		yPercent: 0,
		opacity: 1
	});
})
previewButton.addEventListener("click", () => {
	gsap.to(preview, {
		duration: 0.7, 
		scale: 0.7,
		yPercent: 100,
		opacity: 1
	});
})




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

// правая карточка
const pickButtonRight = document.querySelector(".pick__buttons--right__button");
const pickButtonLeft = document.querySelector(".pick__buttons--left__button");
const monthsButton = document.querySelector(".right-description__months");


pickButtonLeft.addEventListener("click", moveLeft)
pickButtonRight.addEventListener("click", moveLeft)
pickButtonLeft.addEventListener("click", addQr)
pickButtonRight.addEventListener("click", addQr)
pickButtonLeft.addEventListener("click", button1Month)
pickButtonRight.addEventListener("click", button3Months)

function moveLeft(){
	gsap.from(".right", 
	{
		scale: 0.7,
		duration: 0.7,
	})
	gsap.to(".pick, .right", 
	{
		scale: 1, 
		duration: 0.7,
		x: '-=100%'
	});
	gsap.to(".pick", 
	{
		scale: 0.7,
		duration: 0.7,
	})
};

function addQr(){
	qrCode.append(qrRight);
};
function button1Month(){
	monthsButton.innerText = '1 МЕСЯЦ ПОДПИСКИ';
};
function button3Months(){
	monthsButton.innerText = '3 МЕСЯЦА ПОДПИСКИ';
};

window.addEventListener('resize', resizeQr);
window.addEventListener('deviceorientation', resizeQr);

function resizeQr(){
	let qrCanvasRight = qrRight.querySelector("canvas");
	qrCanvasRight.setAttribute("style",`width:${vw(23.4375)}px`);
};

let returnRight = document.querySelector(".right2__return");


returnRight.addEventListener("click", () => {
	gsap.from(".pick", 
	{
		scale: 0.7,
		duration: 0.7,
	})
	gsap.to(".pick, .right", 
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
	
	// let qrCanvasRight = qrRight.querySelector("canvas");
	// setInterval(function(){ 
	// 	qrCanvasRight.remove()
	// }, 500);


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
});




// let inactivityTime = function () {
// 	let time;
// 	window.onload = resetTimer;
// 	document.onmousemove = resetTimer;
// 	document.onkeypress = resetTimer;
// 	function logout() {
// 	  console.log("You are now logged out.")

// 	  gsap.to(preview, {
// 		duration: 1, 
// 		scale: 1,
// 		yPercent: 0,
// 		opacity: 1
// 	});
// 	}
// 	function resetTimer() {
// 	  clearTimeout(time);
// 	  time = setTimeout(logout, 30000)
// 	}
//   };
//   inactivityTime();
//   console.log('Please wait...');





Draggable.create(".drag", {
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



// preview 
var slideDelay = 1.5;
var slideDuration = 1;
var slides = document.querySelectorAll(".slide");
var numSlides = slides.length;

gsap.set(slides, { xPercent: i => i * 100 });

var wrap = gsap.utils.wrap(-100, (numSlides - 1) * 100);
var wrapProgress = gsap.utils.wrap(0, 1);
var timer = gsap.delayedCall(slideDelay, autoPlay).pause();
var proxy = document.createElement("div");
var slideWidth = 0;
var wrapWidth = 0;
var animation = gsap.timeline({repeat:-1});
resize();

var draggable = new Draggable(proxy, {
  trigger: ".slides-container",
  type: "x",
  inertia: true,
  onPressInit: function() {
    animation.pause();
    timer.pause();
    updateProgress();
  },
  snap: {
    x: value => gsap.utils.snap(slideWidth, value)
  },
  onDrag: updateProgress,
  onThrowUpdate: updateProgress,
  onThrowComplete: function() {
    timer.restart(true);
  }
});

window.addEventListener("resize", resize);

function animateSlides(direction) {
  var progress = animation.progress() + direction / numSlides;
  timer.pause();
  animation.pause();
  gsap.to(animation, {
    duration: slideDuration,
    progress: gsap.utils.snap(1 / numSlides, progress), 
    overwrite: true,
    modifiers:{
      progress: wrapProgress // value => (value < 0 || value === 1 ? 1 : 0) + (value % 1)
    },
    onComplete:() => timer.restart(true)
  });
}

function autoPlay() { 
  animation.play();
  gsap.fromTo(animation, {timeScale: 0}, {timeScale: 1, duration: 1, overwrite: true, ease: "power1.in"})
}

function updateProgress() {  
  animation.progress(wrapProgress(gsap.getProperty(proxy, "x") / wrapWidth));
}

function resize() {
  var progress = animation.progress();  
  slideWidth = slides[0].offsetWidth;
  wrapWidth = slideWidth * numSlides;
  
  animation.progress(0).clear().to(slides, {
    duration: 100,
    xPercent: "+=" + (numSlides * 100),
    ease: "none",
    modifiers: {
      xPercent: wrap
    }
  })
  .to(proxy, {x: wrapWidth, duration: 100, ease: "none"}, 0)
  .progress(progress);
}

Hamster(document.querySelector('.slides-container')).wheel(function(event, delta, deltaX, deltaY) {
  event.preventDefault();
  animateSlides(delta/30);
});