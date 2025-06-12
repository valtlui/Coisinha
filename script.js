const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const message = "eu te amo Dayana ";
let index = 0;
const lines = [];
const lineHeight = 50;
const typingSpeed = 5; // menor = mais rápido

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

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "24px Courier New";
  ctx.fillStyle = "#ff69b4";

  // Adiciona uma nova letra por chamada
  if (index < message.length * 1000) {
    if (index % typingSpeed === 0) {
      const currentLine = Math.floor(index / message.length);
      if (!lines[currentLine]) lines[currentLine] = "";
      lines[currentLine] += message[index % message.length];
    }
    index++;
  }

  // Desenha as linhas já construídas
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], 50, 100 + i * lineHeight);
  }

  animateParticles();
  requestAnimationFrame(draw);
}

draw();
