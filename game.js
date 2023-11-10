const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 30;
    this.width = 20;
    this.height = 20;
    this.color = 'green';
    this.speed = 5;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(direction) {
    if (direction === 'left') this.x -= this.speed;
    if (direction === 'right') this.x += this.speed;
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 10;
    this.color = 'red';
    this.speed = 7;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y -= this.speed;
  }
}

const player = new Player();
const bullets = [];
let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  bullets.forEach((bullet, index) => {
    bullet.update();
    bullet.draw();

    // Remove the bullet if it goes off screen
    if (bullet.y + bullet.height < 0) {
      bullets.splice(index, 1);
    }
  });

  requestAnimationFrame(gameLoop);
}

function handleKeyDown(e) {
  if (e.key === 'ArrowLeft') {
    player.move('left');
  } else if (e.key === 'ArrowRight') {
    player.move('right');
  } else if (e.key === ' ' || e.key === 'ArrowUp') {
    // Shoot a bullet
    bullets.push(new Bullet(player.x + player.width / 2, player.y));
  }
}

window.addEventListener('keydown', handleKeyDown);
requestAnimationFrame(gameLoop);
