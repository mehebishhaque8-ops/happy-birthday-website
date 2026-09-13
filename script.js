// Confetti animation
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
const confetti = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 3 + 2;
        this.speedY = Math.random() * 5 + 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#667eea'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function createConfetti(count) {
    for (let i = 0; i < count; i++) {
        confetti.push(new Confetti());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confetti.forEach((piece, index) => {
        piece.update();
        piece.draw();
        
        if (piece.y > canvas.height) {
            confetti.splice(index, 1);
        }
    });
    
    if (confetti.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

function celebrateClick() {
    // Create confetti burst
    createConfetti(100);
    animateConfetti();
    
    // Play sound effect (optional)
    playChime();
}

function playChime() {
    // Create a simple beep using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initial confetti burst on page load
window.addEventListener('load', () => {
    createConfetti(50);
    animateConfetti();
});