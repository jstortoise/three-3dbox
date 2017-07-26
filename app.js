function sceneBuilder(options){
	var config = {
		WIDTH: options.WIDTH || 400,
		HEIGHT: options.HEIGHT || 300,
		VIEW_ANGLE: options.VIEW_ANGLE || 75, 
		NEAR: options.NEAR || 0.1,
		FAR: options.FAR || 1000
	};
	config.ASPECT = config.WIDTH / config.HEIGHT;

	var container = document.getElementById('container');

	var renderer = new THREE.WebGLRenderer();
	var camera = new THREE.PerspectiveCamera(config.VIEW_ANGLE,config.ASPECT,config.NEAR,config.FAR);
	var scene = new THREE.Scene();

	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 5,
	renderer.setSize(config.WIDTH, config.HEIGHT);

	container.appendChild(renderer.domElement);

	var render = function(){
		requestAnimationFrame( render );
		controls.update();
		if(this.sceneBuilder.playStatus === 'play'){
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].rotation.x += 0.1;
				this.children[i].rotation.y += 0.1;

			};
		} else if (this.sceneBuilder.playStatus === 'rewind'){
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].rotation.x -= 0.1;
				this.children[i].rotation.y -= 0.1;
			};
		}
		renderer.render(scene, camera);
	}.bind(scene)

	var setPlayStatus = function (status) {
		this.sceneBuilder.playStatus = status;
	}.bind(scene);

	var controls = new THREE.OrbitControls( camera );

	scene.sceneBuilder = {
		playStatus: 'pause',
		setPlayStatus: setPlayStatus,
		camera: camera,
		renderer: renderer,
		container: container,
		render: render,
		controls: controls
	}
	render();
	return scene;
};
var myScene = sceneBuilder({
	WIDTH: 600,
	HEIGHT: 400
})

function setPlayStatus (status){
	myScene.sceneBuilder.setPlayStatus(status);
}
var counter = 1.3;
function addGeo (){
	var min = 100000;
	var max = 999999;
	var num = Math.floor(Math.random() * (max - min + 1)) + min;
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x0+num } );
	var cube = new THREE.Mesh( geometry, material );
	cube.position.x = counter;
	counter += counter;
	myScene.add( cube );
}

myScene.children[0].addEventListener('click', function(){
	console.log('clicked');
})
