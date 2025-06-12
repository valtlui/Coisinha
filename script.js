const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const phrase = "eu te amo Dayana";
const letters = phrase.split('');
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = new Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff69b4";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const letter = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(letter, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

const particles = [];

canvas.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 5; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 5 + 2,
      speedX: (Math.random() - 0.5) * 4,
      speedY: (Math.random() - 0.5) * 4,
      life: 50
    });
  }
});

function animateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#ff69b4";
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    p.life--;
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function animate() {
  drawMatrix();
  animateParticles();
  requestAnimationFrame(animate);
}

animate();
