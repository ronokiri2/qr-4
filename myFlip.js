gsap.registerPlugin(Flip);
gsap.config({ trialWarn: false });

let container = document.querySelector(".container");
let addButton = document.querySelector("#add-button");
let shuffleButton = document.querySelector("#shuffle-button");
let wrapColor = gsap.utils.wrap(["blue", "red", "purple", "orange"]);
let count = 0;
let state;

let addQR = document.querySelector("#add-qr");
let img = document.querySelector(".img");

function createBox() {
  let box = document.createElement("div");
  box.style.backgroundColor = wrapColor(++count);

//   box.style.backgroundImage = "url('./Penguins0.webp')";
  box.classList.add("box");
  box.textContent = "Click Me";
  
  function onClick() {
    box.removeEventListener("click", onClick);
    setState(() => box.classList.add("exiting"));
  }
  
  box.addEventListener("click", onClick);
  
  return box;  
}


// настройки QR кода
const qrCode = new QRCodeStyling({
	width: 150,
	height: 150,
	type: "svg",
	data: "https://kion.ru/test?utm_source=SALON&utm_medium=SALON-",
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




function createQr() {
	let qr = document.createElement("div");
	qr.classList.add("qr");
	qr.classList.add("box");

	qrCode.append(qr);
	
	function onClick() {
	  qr.removeEventListener("click", onClick);
	  setState(() => qr.classList.add("exiting"));
	}
	
	qr.addEventListener("click", onClick);


	return qr;  
  }


// Create some initial boxes
// container.prepend(createBox());
// container.prepend(createBox());
// container.prepend(createBox());
// container.prepend(createBox());

addButton.addEventListener("click", () => {
  setState(() => container.prepend(createBox()));
});

shuffleButton.addEventListener("click", () => {
  setState(() => gsap.utils.shuffle(gsap.utils.toArray(".box")).forEach(box => container.append(box)));  
});
addQR.addEventListener("click", () => {
	setState(() => container.prepend(createQr()));
  });

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
  
  gsap.utils.toArray(".box").forEach(box => {
    if (exited.includes(box)) {
      box.remove();
    }
  });
}
