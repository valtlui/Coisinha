const message = "eu te amo Dayana ";
let index = 0;
const lines = [];
const lineHeight = 50;
const typingSpeed = 5; // menor = mais rápido

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
