
import * as THREE from 'three'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);

const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(3, 2, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const control = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
const dir = new THREE.DirectionalLight(0xffffff, 2.5);

dir.position.set(5, 8, 4);
scene.add(dir, ambientLight);

const loader = new GLTFLoader();

loader.load('public/modeli.glb', (gltf) => {

    gltf.scene.rotation.y = Math.PI;
    scene.add(gltf.scene);

    // Numrimi i Meshes, Vertices dhe Faces

    let totalVertices = 0;
    let totalFaces = 0;
    let meshCount = 0;

    console.log("Meshes in modeli.glb:");

    gltf.scene.traverse((child) => {

        if (child.isMesh) {

            meshCount++;

            const geometry = child.geometry;

            // Numri i vertices
            const vertices = geometry.attributes.position.count;

            // Numri i faces (triangles)
            let faces = 0;

            if (geometry.index) {
                faces = geometry.index.count / 3;
            } else {
                faces = vertices / 3;
            }

            totalVertices += vertices;
            totalFaces += faces;

            console.log(
                "Mesh:", child.name,
                "| Vertices:", vertices,
                "| Faces:", faces
            );
        }
    });

    // Rezultatet totale

    console.log("-------------------------");
    console.log("Total Meshes:", meshCount);
    console.log("Total Vertices:", totalVertices);
    console.log("Total Faces:", totalFaces);

});



function animate() {
    requestAnimationFrame(animate);

    control.update();

    renderer.render(scene, camera);
}

animate();
