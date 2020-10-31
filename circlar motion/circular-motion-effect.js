class Circle {
    constructor(x, y, r, dx, dy, color) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.dx = dx || 8;
        this.dy = dy || 4;
        this.r = Math.floor(r);
        this.color = color;
        this.rad = 0;
        this.factor = random(.001, .1);

        this.setDefaultValue();
    }
    setDefaultValue() {
        this.initialX = this.x;
        this.initialY = this.y;
    }

    renderCircle() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        this.x = this.initialX + Math.cos(this.rad) * (200 + this.r);
        this.y = this.initialY + Math.sin(this.rad) * (200 + this.r);
        ctx.lineTo(this.x, this.y);
        // ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.lineWidth=random(1,10);
        ctx.stroke();
        this.rad += this.factor;
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

function random(min, max) {
    return min + Math.random() * (max - min);
}

drawInCanvas = () => {
    requestAnimationFrame(drawInCanvas);
    ctx.fillStyle = 'rgba(255,255,255,.35)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    circles.forEach( circle => circle.renderCircle());
}
let mouseX = null;
let mouseY = null;

// let circle = new Circle(canvas.width/2,canvas.height/2,10, null, null, colorArray[Math.floor(Math.random() * colorArray.length)]);
// circle.renderCircle();



initDraw = () => {
    setCanvasDimensions();
    circles = [];
    for (let i = 0; i < 100; i++) {
        circles.push(new Circle(
            canvas.width/2,
            canvas.height/2,
            random(10,60),
            null,
            null,
            colorArray[Math.floor(Math.random() * colorArray.length)]
        ));
    }

    drawInCanvas();
}


window.addEventListener('resize', () => initDraw());
window.addEventListener('mousemove', (event) => {
    mouseX = event.x;
    mouseY = event.y;
});

initDraw();



