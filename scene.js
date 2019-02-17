// Create scene
var scene = new THREE.Scene();


// Create camera
var camera = new THREE.PerspectiveCamera(
    75, // fov — Camera frustum vertical field of view.
    window.innerWidth / window.innerHeight, // aspect — Camera frustum aspect ratio.
    0.1, // near — Camera frustum near plane.
    1000); // far — Camera frustum far plane.


// Create renderer
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var loader = new THREE.FontLoader();

loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
    var textGeo = new THREE.TextGeometry( 'Hello three.js!', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
    } );
    scene.add(textGeo);
} );


// Create geometry
var buildingWallGeo = new THREE.BoxGeometry(40, 40, 1);
var buildingDoorGeo = new THREE.BoxGeometry(5,8,1);
var buildingWindowGeo = new THREE.BoxGeometry(4,4,.2);
var groundGeo = new THREE.PlaneGeometry(100, 100);
var carTireGeo = new THREE.TorusGeometry(.7, 0.30, 4, 12);
var carBaseGeo = new THREE.BoxGeometry(9, 1.6, 3.5);
var carTopGeo = new THREE.BoxGeometry(5, 3, 2.8);
var carConeGeo = new THREE.ConeGeometry(1, 2.5, 32);
var buildingWindowPillar = new THREE.CylinderGeometry( 5, 5, 20, 32 );


// Create materials
var buildingWallMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/Yellobrk.bmp')});
var groundMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/groundtexture.png')});
var carTireMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/tiretexture.jpg')});
var carBaseMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/randomtexture.jpg')});
var carConeMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/conetexture.jpg')});
var buildingDoorMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/doortexture.jpg')});
var buildingWindowMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/windowtexture.jpg')});


// Combine materials and geometry (mesh)
var buildingWall = new THREE.Mesh(buildingWallGeo, buildingWallMaterial);
var buildingDoor = new THREE.Mesh(buildingDoorGeo, buildingDoorMaterial);
var buildingWindow = new THREE.Mesh(buildingWindowGeo, buildingWindowMaterial);
var ground = new THREE.Mesh(groundGeo, groundMaterial);
var carTire1 = new THREE.Mesh(carTireGeo, carTireMaterial);
var carBase = new THREE.Mesh(carBaseGeo, carBaseMaterial);
var carTop = new THREE.Mesh(carTopGeo, carBaseMaterial);
var carCone = new THREE.Mesh(carConeGeo, carConeMaterial);


// Clone mesh objects
var carTire2 = carTire1.clone();
var carTire3 = carTire1.clone();
var carTire4 = carTire1.clone();
var buildingWallLeft = buildingWall.clone();
var buildingWallRight = buildingWall.clone();
var buildingWallBack = buildingWall.clone();
var buildingWindow2 = buildingWindow.clone();
var buildingWindow3 = buildingWindow.clone();
var buildingWindow4 = buildingWindow.clone();


// Create groups
var carTireGroup = new THREE.Group();
carTireGroup.add(carTire1);
carTireGroup.add(carTire2);
carTireGroup.add(carTire3);
carTireGroup.add(carTire4);

var carGroup = new THREE.Group();
carGroup.add(carTire1);
carGroup.add(carTire2);
carGroup.add(carTire3);
carGroup.add(carTire4);
carGroup.add(carBase);
carGroup.add(carTop);
carGroup.add(carCone);

var buildingGroup = new THREE.Group();
buildingGroup.add(buildingWall);
buildingGroup.add(buildingWallLeft);
buildingGroup.add(buildingWallRight);
buildingGroup.add(buildingWallBack);
buildingGroup.add(buildingDoor);
buildingGroup.add(buildingWindow);
buildingGroup.add(buildingWindow2);
buildingGroup.add(buildingWindow3);
buildingGroup.add(buildingWindow4);

// Update positions
//buildingWall.position.set(10, 5, 0);
carTire1.position.set(0, 1, 0);
carTire2.position.set(0, 1, 4);
carTire3.position.set(7, 1, 0);
carTire4.position.set(7, 1, 4);
carBase.position.set(3.5, 1.2, 2);
carTop.position.set(3.5, 2, 2);
carCone.position.set(3.5, 4.8, 2);
carGroup.position.set(8, 0, -10);

buildingWall.position.set(0, 20, 0);
buildingWallLeft.position.set(20,20,20);
buildingWallRight.position.set(-20,20,20);
buildingWallBack.position.set(0,20,40);
buildingDoor.position.set(0,4,-.3);
buildingWindow.position.set(-10,20,-0.7);
buildingWindow2.position.set(10,20,-0.7);
buildingWindow3.position.set(-10,34,-0.7);
buildingWindow4.position.set(10,34,-0.7);


// Rotate objects
groundGeo.rotateX(-Math.PI / 2);
buildingWallLeft.rotateY(-Math.PI / 2);
buildingWallRight.rotateY(-Math.PI / 2);


// Add objects and groups to scene
scene.add(carTireGroup);
scene.add(carGroup);
scene.add(buildingGroup);
scene.add(ground);


// Create glorious light
var light = new THREE.DirectionalLight(0xdddddd, 1);
light.position.set(0, 0, 1);
scene.add(light);


// move camera from center
camera.position.x = 2; //move right from center of scene
camera.position.y = 20; //move up from center of scene
camera.position.z = 20; //move camera away from center of scene
camera.rotateY(20);


// import camera control and rotation library
controls = new THREE.OrbitControls(camera);
controls.autoRotate = false;
controls.autoRotateSpeed = 1;
controls.noKeys = true;
controls.keyPanSpeed = 100;
controls.enableZoom = true;

// Clock for animation
var clock = new THREE.Clock();

var tireSpeed = 0;
var carSpeed = 0;
var fired = false; // For one time button input (Press and release)

var render = function () {
    requestAnimationFrame(render);
    var delta = clock.getDelta();

    // Change speed of the car
    document.addEventListener('keydown', function (event) {
        if (event.code === 'ArrowRight' && !fired) {
            fired = true;
            carSpeed += 2;
            tireSpeed += 2;
        }
        else if (event.code === 'ArrowLeft' && !fired) {
            fired = true;
            carSpeed -= 2;
            tireSpeed -= 2;
        }
    });

    document.addEventListener('keyup', function (event) {
        fired = false;
    });

    carGroup.position.x += carSpeed * delta;

    // Rotate tires
    carTire1.rotation.z -= tireSpeed * delta;
    carTire2.rotation.z -= tireSpeed * delta;
    carTire3.rotation.z -= tireSpeed * delta;
    carTire4.rotation.z -= tireSpeed * delta;

    //carTireGroup.rotation.z += 1.2 * delta;
    controls.update();
    renderer.render(scene, camera);
};

render();

