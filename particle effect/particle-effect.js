class Circle {
    constructor(x, y, r, dx, dy, color) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.dx = dx || 8;
        this.dy = dy || 4;
        this.r = Math.floor(r);
        this.color = color;
    }

    renderCircle() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

let colorArray = [
    '#8C030E',
    '#038C7F',
    '#96D9CC',
    '#F27405',
    '#F24444'
];

setCanvasDimensions = () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}

const canvas = document.getElementById('canvas');
setCanvasDimensions();

const ctx = canvas.getContext('2d');

let circles = [];

drawInCanvas = () => {
    requestAnimationFrame(drawInCanvas);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    circles.forEach(circle => {
        circle.x += circle.dx;
        circle.y += circle.dy;
        circle.renderCircle();
        if ((circle.x + circle.r) > canvas.width || (circle.x - circle.r) < 0) {
            circle.dx = -circle.dx;
        }

        if ((circle.y + circle.r) > canvas.height || (circle.y - circle.r) < 0) {
            circle.dy = -circle.dy;
        }

        if((mouseX - circle.x < 100) && (mouseX - circle.x > -100)
        && (mouseY - circle.y < 100) && (mouseY - circle.y > -100)) {
            if (circle.r < 40) {
                circle.r += 1;
            }
        } else {
            if (circle.r > 2) {
                circle.r -= 1;
            }
        }
    });
}

initDraw = () => {
    setCanvasDimensions();
    circles = [];
    for (let i = 0; i < 800; i++) {
        circles.push(new Circle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 10,
            Math.random() * 5,
            Math.random() * 5,
            colorArray[Math.floor(Math.random() * colorArray.length)]
        ));
    }

    drawInCanvas();
}

let mouseX = null;
let mouseY = null;
window.addEventListener('resize', () => initDraw());
window.addEventListener('mousemove', (event) => {
    mouseX = event.x;
    mouseY = event.y;
});

initDraw();



