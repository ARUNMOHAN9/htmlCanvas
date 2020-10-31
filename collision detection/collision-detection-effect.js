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

let balls = [];

function random(min, max) {
    return min + Math.random() * (max - min);
}

drawInCanvas = () => {
    requestAnimationFrame(drawInCanvas);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    small.x = mouseX;
    small.y = mouseY;

    const distX = small.x  - big.x;
    const distY = small.y - big.y;

    const dist = Math.sqrt(distX ** 2 + distY ** 2);

    if (dist - small.r <= big.r) {
        big.color = 'red';
    } else {
        big.color = 'black';
    }

    big.renderCircle();
    small.renderCircle();
}
let mouseX = null;
let mouseY = null;
big = new Circle(canvas.width / 2, canvas.height / 2, 80, 4, 4, 'black');
small = new Circle(0, 0, 30, 4, 4, 'blue');




initDraw = () => {
    setCanvasDimensions();
    // balls = [];
    // for (let i = 0; i < 100; i++) {
    //     radius = random(30,60);
    //     balls.push(new Circle(
    //         random(radius,canvas.width- radius),
    //         random(0,canvas.height-radius),
    //         radius,
    //         random(-2,2),
    //         random(-2,2),
    //         colorArray[Math.floor(Math.random() * colorArray.length)]
    //     ));
    // }

    drawInCanvas();
}


window.addEventListener('resize', () => initDraw());
window.addEventListener('mousemove', (event) => {
    mouseX = event.x;
    mouseY = event.y;
});

initDraw();



