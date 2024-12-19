// ---------------------------------------------------------------------------------------------------------
/* Cursor Animation */
// ---------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.querySelector(".cursor");  // Ensure the cursor element is selected
    const shapes = document.querySelectorAll(".shape");

    let mouseX = window.innerWidth / 2;  // Start at the center of the screen horizontally
    let mouseY = window.innerHeight / 2; // Start at the center of the screen vertically

    // Set initial position of the cursor to the center
    gsap.set(cursor, {
        x: mouseX,
        y: mouseY
    });

    // Move the shapes with a slight delay for visual effect
    gsap.set(shapes, {
        x: mouseX,
        y: mouseY
    });

    // Mouse Move Event
    document.body.addEventListener("mousemove", (evt) => {
        mouseX = evt.clientX;
        mouseY = evt.clientY;

        // Update cursor position to follow the mouse movement
        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.2,  // Smooth transition duration
            ease: "power3.out"
        });

        // Apply staggered movement to shapes
        gsap.to(shapes, {
            x: mouseX,
            y: mouseY,
            stagger: -0.1,
            duration: 0.2,  // Same duration for the shapes animation
            ease: "power3.out"
        });
    });

    // Reset cursor to the center when mouse is not moving
    setInterval(() => {
        if (mouseX === window.innerWidth / 2 && mouseY === window.innerHeight / 2) {
            gsap.to(cursor, {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                duration: 0.3,
                ease: "power3.out"
            });

            gsap.to(shapes, {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                stagger: -0.1,
                duration: 0.3,
                ease: "power3.out"
            });
        }
    }, 200); // Check every 200ms to reset if mouse hasn't moved
});
// ---------------------------------------------------------------------------------------------------------
// NAV MENU
// ---------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const sideMenu = document.getElementById("sideMenu");
    const closeMenuBtn = document.getElementById("closeMenu");
    const nav = document.querySelector("nav"); // For scroll effect
    const navLinks = sideMenu.querySelectorAll("a");
    const mainContent = document.querySelector("body"); // Body or a specific content wrapper

    // Toggle Sidebar Menu
    hamburger.addEventListener("click", () => {
        if (sideMenu.classList.contains("active")) {
            sideMenu.classList.remove("active"); // Close sidebar
            hamburger.classList.remove("hamburger-active");
        } else {
            sideMenu.classList.add("active"); // Open sidebar
            hamburger.classList.add("hamburger-active");
        }
    });

    // Close Sidebar Menu on Close Button
    closeMenuBtn.addEventListener("click", () => {
        sideMenu.classList.remove("active");
        hamburger.classList.remove("hamburger-active");
    });

    // Close Sidebar Menu on Outside Click
    mainContent.addEventListener("click", (e) => {
        if (!sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
            sideMenu.classList.remove("active");
            hamburger.classList.remove("hamburger-active");
        }
    });

    // Add scroll effect to the navbar
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });

    // Close Sidebar Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            sideMenu.classList.remove("active");
            hamburger.classList.remove("hamburger-active");
        });
    });
});


// ---------------------------------------------------------------------------------------------------------
// Particle Animation JavaScript
// ---------------------------------------------------------------------------------------------------------
let Particles = [];
let time = 0;

const opt = {
  particles: window.innerWidth > 500 ? 1000 : 500,
  noiseScale: 0.009,
  angle: (Math.PI / 180) * -90,
  h1: rand(0, 360),
  h2: rand(0, 360),
  s1: rand(20, 90),
  s2: rand(20, 90),
  l1: rand(30, 80),
  l2: rand(30, 80),
  strokeWeight: 1.2,
  tail: 82
};

function rand(v1, v2) {
  return Math.floor(v1 + Math.random() * (v2 - v1));
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("animated-bg");
  canvas.parent(document.querySelector(".hero"));

  for (let i = 0; i < opt.particles; i++) {
    Particles.push(new Particle(Math.random() * width, Math.random() * height));
  }

  strokeWeight(opt.strokeWeight);
}

function draw() {
  time++;
  background(0, 100 - opt.tail);

  for (let p of Particles) {
    p.update();
    p.render();
  }
}

// Reactive interactivity: update color and angle on mouse click
function mouseClicked() {
  opt.h1 = rand(0, 360);
  opt.h2 = rand(0, 360);
  opt.s1 = rand(20, 90);
  opt.s2 = rand(20, 90);
  opt.l1 = rand(30, 80);
  opt.l2 = rand(30, 80);
  opt.angle += (Math.PI / 180) * 60 * (Math.random() > 0.5 ? 1 : -1);

  for (let p of Particles) {
    p.randomize();
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lx = x;
    this.ly = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.randomize();
  }

  randomize() {
    this.hueSemen = Math.random();
    this.hue = this.hueSemen > 0.5 ? 20 + opt.h1 : 20 + opt.h2;
    this.sat = this.hueSemen > 0.5 ? opt.s1 : opt.s2;
    this.light = this.hueSemen > 0.5 ? opt.l1 : opt.l2;
    this.maxSpeed = this.hueSemen > 0.5 ? 3 : 2;
  }

  update() {
    this.follow();

    this.vx += this.ax;
    this.vy += this.ay;

    let p = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    let a = Math.atan2(this.vy, this.vx);
    let m = Math.min(this.maxSpeed, p);
    this.vx = Math.cos(a) * m;
    this.vy = Math.sin(a) * m;

    this.x += this.vx;
    this.y += this.vy;
    this.ax = 0;
    this.ay = 0;

    this.edges();
  }

  follow() {
    let angle =
      noise(
        this.x * opt.noiseScale,
        this.y * opt.noiseScale,
        time * opt.noiseScale
      ) *
        Math.PI *
        0.5 +
      opt.angle;

    this.ax += Math.cos(angle);
    this.ay += Math.sin(angle);
  }

  updatePrev() {
    this.lx = this.x;
    this.ly = this.y;
  }

  edges() {
    if (this.x < 0) {
      this.x = width;
      this.updatePrev();
    }
    if (this.x > width) {
      this.x = 0;
      this.updatePrev();
    }
    if (this.y < 0) {
      this.y = height;
      this.updatePrev();
    }
    if (this.y > height) {
      this.y = 0;
      this.updatePrev();
    }
  }

  render() {
    stroke(`hsla(${this.hue}, ${this.sat}%, ${this.light}%, .5)`);
    line(this.x, this.y, this.lx, this.ly);
    this.updatePrev();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


// ABOUT
document.addEventListener('scroll', () => {
    const aboutSection = document.querySelector('.about');
    const aboutInfo = document.querySelector('.about-info');

    // Get the bounding rectangle of the section
    const rect = aboutSection.getBoundingClientRect();

    // Check if the section is in the viewport
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        aboutInfo.classList.add('visible');
    } else {
        aboutInfo.classList.remove('visible');
    }
});


