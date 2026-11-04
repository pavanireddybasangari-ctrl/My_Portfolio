import * as THREE from 'three';

export class ThreePortfolioScene {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.mainMesh = null;
    this.mainWireframe = null;
    this.particles = null;
    this.lightGroup = null;

    // Configuration & State
    this.rotationSpeed = 0.0;
    this.currentGeometry = 'icosahedron';
    this.currentStyle = 'wireframe';
    this.baseRotation = { x: 0.4, y: 0.6 };
    this.targetMouse = { x: 0, y: 0 };
    this.currentMouse = { x: 0, y: 0 };
    this.scrollY = 0;
    this.targetScrollY = 0;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x07090e, 0.025);

    // 2. Camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    this.camera.position.set(0, 0, 8);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    // 4. Lights
    this.setupLighting();

    // 5. Starfield Particles
    this.createStarfield(1500);

    // 6. Main Interactive Mesh Core
    this.createMainGeometry(this.currentGeometry, this.currentStyle);

    // 7. Event Listeners
    this.bindEvents();

    // 8. Animation Loop
    this.animate();
  }

  setupLighting() {
    this.lightGroup = new THREE.Group();

    // Soft Ambient
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.lightGroup.add(ambientLight);

    // Cyan Neon Light
    this.cyanLight = new THREE.PointLight(0x00f2fe, 5, 20);
    this.cyanLight.position.set(4, 3, 4);
    this.lightGroup.add(this.cyanLight);

    // Purple Neon Light
    this.purpleLight = new THREE.PointLight(0x9d4edd, 5, 20);
    this.purpleLight.position.set(-4, -2, 3);
    this.lightGroup.add(this.purpleLight);

    // Top Key Light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(0, 8, 5);
    this.lightGroup.add(dirLight);

    this.scene.add(this.lightGroup);
  }

  createStarfield(count = 1500) {
    if (this.particles) {
      this.scene.remove(this.particles);
      this.particles.geometry.dispose();
      this.particles.material.dispose();
    }

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cyan = new THREE.Color(0x00f2fe);
    const purple = new THREE.Color(0x9d4edd);
    const white = new THREE.Color(0xffffff);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread across spherical volume
      const radius = 6 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Color variation
      const randColor = Math.random();
      let chosenColor = white;
      if (randColor > 0.6) chosenColor = cyan;
      else if (randColor > 0.3) chosenColor = purple;

      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture generator (soft round dot)
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const ctx = particleCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(0,242,254,0.8)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(particleCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.12,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createMainGeometry(geoType = 'icosahedron', style = 'wireframe') {
    if (this.mainMesh) {
      this.scene.remove(this.mainMesh);
      if (this.mainMesh.geometry) this.mainMesh.geometry.dispose();
      if (this.mainMesh.material) {
        if (Array.isArray(this.mainMesh.material)) {
          this.mainMesh.material.forEach(m => m.dispose());
        } else {
          this.mainMesh.material.dispose();
        }
      }
    }

    let geom;
    switch (geoType) {
      case 'icosahedron':
        geom = new THREE.IcosahedronGeometry(2.1, 1);
        break;
      case 'particles':
        geom = new THREE.TorusGeometry(1.9, 0.7, 32, 120);
        break;
      case 'sphere':
        geom = new THREE.SphereGeometry(2.0, 48, 48);
        break;
      case 'torus':
      default:
        geom = new THREE.TorusKnotGeometry(1.6, 0.45, 128, 32, 2, 3);
        break;
    }

    if (style === 'points' || geoType === 'particles') {
      const mat = new THREE.PointsMaterial({
        color: 0x00f2fe,
        size: 0.055,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      this.mainMesh = new THREE.Points(geom, mat);
    } else if (style === 'solid') {
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x0c1222,
        emissive: 0x1b1338,
        roughness: 0.15,
        metalness: 0.85,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.6,
        ior: 1.5,
        wireframe: false
      });
      this.mainMesh = new THREE.Mesh(geom, mat);

      // Add a subtle wireframe outline
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        wireframe: true,
        transparent: true,
        opacity: 0.25
      });
      const wire = new THREE.Mesh(geom, wireMat);
      this.mainMesh.add(wire);
    } else {
      // Holo Wireframe (default)
      const mat = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        emissive: 0x4a0e78,
        wireframe: true,
        roughness: 0.2,
        metalness: 0.8
      });
      this.mainMesh = new THREE.Mesh(geom, mat);
    }

    // Initial position in hero section (offset nicely to the right on desktop, lower on mobile)
    const isMobile = window.innerWidth < 768;
    this.mainMesh.position.set(isMobile ? 0 : 3.0, isMobile ? -1.5 : 0, 0);

    this.scene.add(this.mainMesh);
  }

  setGeometry(type) {
    this.currentGeometry = type;
    this.createMainGeometry(type, this.currentStyle);
  }

  setStyle(style) {
    this.currentStyle = style;
    this.createMainGeometry(this.currentGeometry, style);
  }

  setSpeed(val) {
    this.rotationSpeed = parseFloat(val);
  }

  setParticleCount(count) {
    this.createStarfield(parseInt(count, 10));
  }

  resetCamera() {
    this.camera.position.set(0, 0, 8);
    this.camera.lookAt(0, 0, 0);
    this.targetMouse = { x: 0, y: 0 };
  }

  bindEvents() {
    // Window Resize
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Adjust mesh position for mobile vs desktop
      if (this.mainMesh) {
        const isMobile = width < 768;
        this.mainMesh.position.x = isMobile ? 0 : 3.0;
        this.mainMesh.position.y = isMobile ? -1.5 : 0;
      }
    });

    // Mouse Movement for 3D Parallax
    window.addEventListener('mousemove', (e) => {
      this.targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      this.targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Window Scroll Reactivity
    window.addEventListener('scroll', () => {
      this.targetScrollY = window.scrollY;
    }, { passive: true });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth Damping for Mouse Parallax
    this.currentMouse.x += (this.targetMouse.x - this.currentMouse.x) * 0.05;
    this.currentMouse.y += (this.targetMouse.y - this.currentMouse.y) * 0.05;

    // Smooth Damping for Scroll
    this.scrollY += (this.targetScrollY - this.scrollY) * 0.08;

    // Rotate Main Mesh
    if (this.mainMesh) {
      const speed = this.rotationSpeed;
      this.baseRotation.x += delta * 0.3 * speed;
      this.baseRotation.y += delta * 0.45 * speed;

      // Mouse Parallax reaction
      this.mainMesh.rotation.x = this.baseRotation.x + (this.currentMouse.y * 0.35);
      this.mainMesh.rotation.y = this.baseRotation.y + (this.currentMouse.x * 0.35);

      // Scroll-based transformation & positioning
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? this.scrollY / maxScroll : 0;

      const isMobile = window.innerWidth < 768;
      const baseX = isMobile ? 0 : 3.0;
      const baseY = isMobile ? -1.5 : 0;

      // Organic orbit path as user scrolls through sections
      this.mainMesh.position.x = baseX + Math.sin(scrollProgress * Math.PI * 2) * 1.5;
      this.mainMesh.position.y = baseY - scrollProgress * 2.5 + (this.currentMouse.y * 0.5);
      this.mainMesh.position.z = Math.cos(scrollProgress * Math.PI * 2) * 1.2;

      // Dynamic light movement
      if (this.cyanLight) {
        this.cyanLight.position.x = Math.sin(elapsedTime * 0.7) * 5;
        this.cyanLight.position.y = Math.cos(elapsedTime * 0.5) * 4;
      }
      if (this.purpleLight) {
        this.purpleLight.position.x = Math.cos(elapsedTime * 0.6) * -5;
        this.purpleLight.position.y = Math.sin(elapsedTime * 0.8) * -4;
      }
    }

    // Starfield slow cosmic drift
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.03 + (this.currentMouse.x * 0.1);
      this.particles.rotation.x = elapsedTime * 0.015 + (this.currentMouse.y * 0.1);
    }

    // Gentle camera breathing
    this.camera.position.x = this.currentMouse.x * 0.4;
    this.camera.position.y = this.currentMouse.y * 0.4;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  }
}
