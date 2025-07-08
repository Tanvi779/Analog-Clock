const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    center.x = canvas.width / 2;
    center.y = canvas.height / 2;
}
let isDarkMode = true;
let center = { x: 0, y: 0 };

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

canvas.addEventListener("click", () => isDarkMode = !isDarkMode);

const toRadian = deg => (deg - 90) * Math.PI / 180;

function drawHand(angleDeg, length) {
    const angleRad = toRadian(angleDeg);
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(
        center.x + length * Math.cos(angleRad),
        center.y + length * Math.sin(angleRad)
    );
    ctx.stroke();
}

function drawNumbers() {
    const radius = 200;
    ctx.font = "24px Arial";
    ctx.fillStyle = isDarkMode ? "#FFA500" : "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let num = 1; num <= 12; num++) {
        const angle = (num - 3) * 30 * Math.PI / 180;
        const x = center.x + radius * Math.cos(angle);
        const y = center.y + radius * Math.sin(angle);
        ctx.fillText(num, x, y);
    }
}

function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear before drawing

    // Background
    ctx.fillStyle = isDarkMode ? "black" : "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawNumbers();

    // Styling
    ctx.lineWidth = 4;
    ctx.strokeStyle = isDarkMode ? "#FFA500" : "black";
    ctx.shadowBlur = isDarkMode ? 20 : 0;
    ctx.shadowColor = ctx.strokeStyle;

    // Time Calculation
    const now = new Date();
    const [h, m, s] = [now.getHours() % 12, now.getMinutes(), now.getSeconds()];

    drawHand(s / 60 * 360, 90);
    drawHand(m / 60 * 360, 150);
    drawHand((h + m / 60) * 30, 120);
}

animate();