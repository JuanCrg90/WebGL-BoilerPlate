import THREE from 'three';
import WindowResize from 'three-window-resize';

const proyect = {
  scene: null,
  camera: null,
  renderer: null,
  container: null,
  init() {
    // Create main scene
    this.scene = new THREE.Scene();


    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;

    // Prepare perspective camera
    const VIEW_ANGLE = 45;
    const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
    const NEAR = 1;
    const FAR = 1000;

    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.scene.add(this.camera);
    this.camera.position.set(0, 0, 100);

    // prepare webgl render
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    // Prepare container
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.container.appendChild(this.renderer.domElement);

    // Events
    new WindowResize(this.renderer, this.camera);

    // Add Object
    let object;
    const geometry = new THREE.CubeGeometry(30, 30, 30);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
    object = new THREE.Mesh(geometry, material);

    this.scene.add(object);

    // requestAnimationFrame(this.render);
  },
};

function render() {
  if (proyect.renderer) {
    proyect.renderer.render(proyect.scene, proyect.camera);
    requestAnimationFrame(render);
  }
}


function initialize() {
  proyect.init();
  render();
}


if (window.addEventListener) {
  window.addEventListener('load', initialize, false);
} else {
  if (window.attachEvent) {
    window.attachEvent('onload', initialize);
  } else {
    window.onload = initialize;
  }
}
