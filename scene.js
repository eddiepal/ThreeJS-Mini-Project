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

//Create the lamp top
/*var points = [];
for (var i = 0; i < 10; i++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
}*/


// Create geometry
var buildingWallGeo = new THREE.BoxGeometry(10, 10, 1);
var groundGeo = new THREE.PlaneGeometry(100, 100);
var carTireGeo = new THREE.TorusGeometry(.7, 0.30, 4, 12);
var carBaseGeo = new THREE.BoxGeometry(9, 1.6, 3.5);
var carTopGeo = new THREE.BoxGeometry(5,3,2.8);
var carConeGeo = new THREE.ConeGeometry( 5, 20, 32 );

//var lampTopGeo = new THREE.LatheGeometry(points);


// Create materials
var buildingWallMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('Yellobrk.bmp')});
var groundMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('groundtexture.png')});
var carTireMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('tiretexture.jpg')});
var carBaseMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('randomtexture.jpg')});
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );

//var lampTopMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});


// Combine materials and geometry (mesh)
var buildingWall = new THREE.Mesh(buildingWallGeo, buildingWallMaterial);
var ground = new THREE.Mesh(groundGeo, groundMaterial);
var carTire1 = new THREE.Mesh(carTireGeo, carTireMaterial);
var carBase = new THREE.Mesh(carBaseGeo, carBaseMaterial);
var carTop = new THREE.Mesh(carTopGeo, carBaseMaterial);
var carCone = new THREE.Mesh( carConeGeo, material );
//var lampTop = new THREE.Mesh(lampTopGeo, lampTopMaterial);


// clone the mesh
var carTire2 = carTire1.clone();
var carTire3 = carTire1.clone();
var carTire4 = carTire1.clone();
var buildingWall2 = buildingWall.clone();
var buildingWall3 = buildingWall.clone();
var buildingWall4 = buildingWall.clone();


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

// Update positions
buildingWall.position.set(10,5,0);
buildingWall2.position.set(0,5,0);
buildingWall3.position.set(20,5,0);
buildingWall4.position.set(30,5,0);

carTire1.position.set(0,1,0);
carTire2.position.set(0, 1, 4);
carTire3.position.set(7, 1, 0);
carTire4.position.set(7, 1, 4);
carBase.position.set(3.5,1.2, 2);
carTop.position.set(3.5,2,2);

carGroup.position.set(0,0,10);

//rotate objects
groundGeo.rotateX(-Math.PI / 2);


var buildingGroup = new THREE.Group();
buildingGroup.add(buildingWall);
buildingGroup.add(buildingWall2);
buildingGroup.add(buildingWall3);
buildingGroup.add(buildingWall4);


// Add the object to the scene
scene.add(carTireGroup);
scene.add(carGroup);
scene.add( carCone )

scene.add(buildingGroup);

scene.add(ground);

//scene.add(lampTop);


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

var clock = new THREE.Clock();

var tireSpeed = 2;
var carSpeed = 1;

var fired = false;

var render = function () {

    /*    buildingWall.positionX = 343;
        buildingWall.__dirtyPosition = true;*/

    requestAnimationFrame(render);
    var delta = clock.getDelta();



    document.addEventListener('keydown', function(event) {
        if (event.code === 'ArrowLeft' && !fired) {
            fired = true;
            carSpeed+=2;
            tireSpeed+=2;
        }
        else if (event.code === 'ArrowRight' && !fired)
        {
            fired = true;
            carSpeed-=2;
            tireSpeed-=2;
        }
    });

    document.addEventListener('keyup', function(event) {
            fired = false;
    });

    carGroup.position.x += carSpeed * delta;

    //rotate tires
    carTire1.rotation.z -= tireSpeed * delta;
    carTire2.rotation.z -= tireSpeed * delta;
    carTire3.rotation.z -= tireSpeed * delta;
    carTire4.rotation.z -= tireSpeed * delta;


    //carTireGroup.rotation.z += 1.2 * delta;
    controls.update();
    renderer.render(scene, camera);
};



render();

