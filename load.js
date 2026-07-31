gsap.registerPlugin(ScrollTrigger);

const wordIndex = [
  "EXP",
  "Absolution",
  "EFFRT",
  "Charisma",
  "DeadDrop",
  "CLPPD",
  "DESCENT",
];

const fonts = ['"Instrument Sans", sans-serif', '"Amoera", sans-serif'];
const textRoll = document.querySelector(".loading-wrapper h1");

const urlParams = new URLSearchParams(window.location.search);
const destination = urlParams.get("to") || "index.html";

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const randomizedWords = shuffle(wordIndex);

gsap.set(textRoll, { opacity: 0 });

const tl = gsap.timeline({
  delay: 0.3,
  onComplete: () => {
    window.location.href = destination;
  },
});

tl.to(textRoll, {
  opacity: 1,
  duration: 0.3,
  ease: "power1.out",
});

let currentTime = tl.duration();
const totalWords = randomizedWords.length;

randomizedWords.forEach((word, index) => {
  const progress = index / totalWords;
  const duration = 0.05 + Math.pow(progress, 1.2) * 0.2;

  tl.to(
    {},
    {
      duration: duration,
      onStart: () => {
        textRoll.textContent = word;

        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
        textRoll.style.fontFamily = randomFont;
      },
    },
    currentTime,
  );

  currentTime += duration;
});

tl.to(".loading-wrapper h1", {
  delay: 0.4,
  z: -1200,
  y: -250,
  scale: 0.2,
  opacity: 0,
  duration: 0.9,
  ease: "power3.in",
});
