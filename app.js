const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const container = document.querySelector(".btn-container");
const message = document.getElementById("message");
const playAudioBtn = document.getElementById("playAudioBtn");
const videoContainer = document.getElementById("videoContainer");
const bgMusic = document.getElementById("bgMusic");

// Try autoplay immediately
window.addEventListener("load", () => {
  bgMusic.play().catch(() => {
    // If autoplay fails, wait for user interaction
    const startMusic = () => {
      bgMusic.play();
      document.removeEventListener("click", startMusic);
      document.removeEventListener("touchstart", startMusic);
    };

    document.addEventListener("click", startMusic);
    document.addEventListener("touchstart", startMusic);
  });
});

// Move No button randomly
function moveNoButton() {
  const containerRect = container.getBoundingClientRect();
  const maxX = containerRect.width - noBtn.offsetWidth;
  const maxY = containerRect.height - noBtn.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", function (e) {
  e.preventDefault();
  moveNoButton();
});

// Yes button click
yesBtn.addEventListener("click", () => {
  message.style.display = "block";
  playAudioBtn.style.display = "inline-block";

  let heartInterval = setInterval(createHeart, 200);
  setTimeout(() => clearInterval(heartInterval), 2000);
});

// When she clicks the special song button
playAudioBtn.addEventListener("click", () => {
  // Stop background music
  bgMusic.pause();
  bgMusic.currentTime = 0; // optional: reset

  // Hide button and show video container
  playAudioBtn.style.display = "none";
  videoContainer.style.display = "block";

  // Inject YouTube iframe
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
