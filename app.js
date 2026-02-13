const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const container = document.querySelector(".btn-container");
const message = document.getElementById("message");
const playAudioBtn = document.getElementById("playAudioBtn");
const videoContainer = document.getElementById("videoContainer");
const bgMusic = document.getElementById("bgMusic");
const first = document.getElementById("first");
const agreeButtons = document.getElementById("yesno-btn");
const askMessage = document.getElementById("ask-message");
const askGif = document.getElementById("ask-GIF");
const agreeGif = document.getElementById("agree-GIF");
const noChoice = document.getElementById("no-choice");

window.addEventListener("load", () => {
  bgMusic.play().catch(() => {
    const startMusic = () => {
      bgMusic.play();
      document.removeEventListener("click", startMusic);
      document.removeEventListener("touchstart", startMusic);
    };

    document.addEventListener("click", startMusic);
    document.addEventListener("touchstart", startMusic);
  });
});

function moveNoButton() {
  const containerRect = container.getBoundingClientRect();

  const maxX = containerRect.width - noBtn.offsetWidth;
  const maxY = containerRect.height - noBtn.offsetHeight;

  const randomX = Math.max(0, Math.random() * maxX);
  const randomY = Math.max(0, Math.random() * maxY);

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", function (e) {
  e.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  agreeButtons.style.display = "none";
  askMessage.style.display = "none";
  askGif.style.display = "none";
  agreeGif.style.display = "inline";
  message.style.display = "block";
  playAudioBtn.style.display = "inline-block";

  let heartInterval = setInterval(createHeart, 200);
  setTimeout(() => clearInterval(heartInterval), 2000);
});

playAudioBtn.addEventListener("click", () => {
  bgMusic.pause();
  bgMusic.currentTime = 0;

  first.style.display = "none";
  playAudioBtn.style.display = "none";
  videoContainer.style.display = "block";

  let heartInterval = setInterval(createHeart, 200);
  setTimeout(() => clearInterval(heartInterval), 2000);

  videoContainer.innerHTML = `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/MfHAt5F2uhk?si=YbfqIbeRrvyzlwFf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `;
});

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.fontSize = 15 + Math.random() * 20 + "px";
  heart.textContent = "❤️";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}
