(function () {
  // Create and insert canvas
  const canvas = document.createElement("canvas");
  canvas.id = "particle-canvas";
  // Use fixed positioning so it always covers the viewport and sits behind content
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "0",
    pointerEvents: "none",
    opacity: "0.95",
  });
  // Always insert canvas as the first child of body (no .wrapper in this app)
  document.body.insertBefore(canvas, document.body.firstChild || null);

  const ctx = canvas.getContext("2d");

  // Handle high DPI screens
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  let particlesArray = [];
  const numberOfParticles = 80; // tuned for a good balance
  const mouse = { x: null, y: null, radius: 140 };

  class Particle {
    constructor() {
      this.x = (Math.random() * canvas.width) / (window.devicePixelRatio || 1);
      this.y = (Math.random() * canvas.height) / (window.devicePixelRatio || 1);
      this.size = Math.random() * 3 + 0.8;
      this.baseSize = this.size;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.speedY = Math.random() * 0.6 - 0.3;
      this.color = this.getRandomColor();
      this.opacity = Math.random() * 0.5 + 0.2;
      this.baseOpacity = this.opacity;
    }

    getRandomColor() {
      const rand = Math.random();
      if (rand < 0.7) return "rgba(255,255,255,1)";
      if (rand < 0.9) return "rgba(61,90,254,1)";
      return "rgba(80,210,255,1)";
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (mouse.x != null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const dirX = dx / (distance || 1);
          const dirY = dy / (distance || 1);
          this.x += dirX * force * 2;
          this.y += dirY * force * 2;
          this.size = this.baseSize + force * 3;
          this.opacity = Math.min(1, this.baseOpacity + force * 0.5);
        } else {
          if (this.size > this.baseSize) this.size -= 0.05;
          if (this.opacity > this.baseOpacity) this.opacity -= 0.005;
        }
      }

      // Wrap-around boundaries
      if (this.x > window.innerWidth) this.x = 0;
      if (this.x < 0) this.x = window.innerWidth;
      if (this.y > window.innerHeight) this.y = 0;
      if (this.y < 0) this.y = window.innerHeight;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++)
      particlesArray.push(new Particle());
  }

  function connectParticles() {
    const maxDistance = 120;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < maxDistance) {
          const opacity = 0.28 - (distance / maxDistance) * 0.28;

          // simple blended stroke using average color (works fine and is fast)
          ctx.beginPath();
          ctx.strokeStyle = "rgba(255,255,255,1)";
          ctx.globalAlpha = opacity;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  let animationId;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    connectParticles();
    animationId = requestAnimationFrame(animate);
  }

  // Event handlers
  function handleResize() {
    resizeCanvas();
    initParticles();
  }

  function handleMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function handleMouseOut() {
    mouse.x = null;
    mouse.y = null;
  }

  // Initialize
  resizeCanvas();
  initParticles();
  animate();

  window.addEventListener("resize", handleResize);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseout", handleMouseOut);

  // Optional: cleanup when page is unloaded
  window.addEventListener("beforeunload", function () {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseout", handleMouseOut);
  });
})();
