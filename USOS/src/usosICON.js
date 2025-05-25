document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("usosIcon");
    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;
    const factor = width / 1000;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(1000 * factor, 0);
    ctx.lineTo(1000 * factor, 1000 * factor);
    ctx.lineTo(0, 1000 * factor);
    ctx.closePath();
    ctx.fillStyle = "#ff4a4a";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(250 * factor, 550 * factor);
    ctx.lineTo(250 * factor, 675 * factor);
    ctx.lineTo(0, 550 * factor);
    ctx.closePath();
    ctx.fillStyle = "#273563";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(250 * factor, 550 * factor);
    ctx.lineTo(0, 550 * factor);
    ctx.lineTo(0, 0);
    ctx.lineTo(250 * factor, 0);
    ctx.closePath();
    ctx.fillStyle = "#273563";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(750 * factor, 550 * factor);
    ctx.lineTo(1000 * factor, 425 * factor);
    ctx.lineTo(1000 * factor, 550 * factor);
    ctx.lineTo(750 * factor, 675 * factor);
    ctx.closePath();
    ctx.fillStyle = "#4f5a7c";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(1000 * factor, 675 * factor);
    ctx.lineTo(1000 * factor, 550 * factor);
    ctx.lineTo(750 * factor, 675 * factor);
    ctx.lineTo(750 * factor, 1000 * factor);
    ctx.lineTo(1000 * factor, 1000 * factor);
    ctx.closePath();
    ctx.fillStyle = "#5d3a5c";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(500 * factor, 800 * factor);
    ctx.lineTo(250 * factor, 675 * factor);
    ctx.lineTo(250 * factor, 550 * factor);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(500 * factor, 800 * factor);
    ctx.lineTo(250 * factor, 550 * factor);
    ctx.lineTo(250 * factor, 550 * factor);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(500 * factor, 800 * factor);
    ctx.lineTo(750 * factor, 675 * factor);
    ctx.lineTo(750 * factor, 550 * factor);
    ctx.lineTo(250 * factor, 550 * factor);
    ctx.lineTo(250 * factor, 550 * factor);
    ctx.closePath();
    ctx.fillStyle = "#e6e6e6";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(500 * factor, 665 * factor);
    ctx.lineTo(1000 * factor, 434 * factor);
    ctx.lineTo(1000 * factor, 0);
    ctx.lineTo(885 * factor, 0);
    ctx.lineTo(50 * factor, 425 * factor);
    ctx.lineTo(50 * factor, 460 * factor);
    ctx.lineTo(250 * factor, 550 * factor);
    ctx.closePath();
    ctx.fillStyle = "#e0e0e0";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(500 * factor, 630 * factor);
    ctx.lineTo(950 * factor, 425 * factor);
    ctx.lineTo(500 * factor, 195 * factor);
    ctx.lineTo(50 * factor, 425 * factor);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(500 * factor, 195 * factor);
    ctx.lineTo(885 * factor, 0);
    ctx.lineTo(250 * factor, 0);
    ctx.lineTo(250 * factor, 70 * factor);
    ctx.closePath();
    ctx.fillStyle = "#e44242";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(250 * factor, 0);
    ctx.lineTo(250 * factor, 70 * factor);
    ctx.lineTo(112 * factor, 0);
    ctx.closePath();
    ctx.fillStyle = "#222f58";
    ctx.fill();
});
