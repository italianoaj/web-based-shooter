//Fields
var ROTATION = Math.PI/6; //rotation amount per second
var MOVE = 5; //move amount per second
var GRID_SIZE=100;
var ACC = 1;
var VELOCITY = 0.3;
var NUM_TARGETS=50;
var NUM_ROCKS=100;
/**
 * This class creates all of the objects seen on the screen of the site. It also manages the movement of each object and the limitations that come with the movement such as collision.
 * @author oliphantlt, italianoaj
 */
class World {
    /**
     * The constrctor sets all of the fields needed for the enviroment, then calls the initalize function.
     */
    constructor() {

        //these are my class variables
        this.worldCamera=null; //orthographic camera
        this.camera=null; //toggled to be world or player camera
        this.scene=null;
        this.rocks=[]; //holds items of class Boulder
        this.projectiles=[]; //holds items of class Projectile
        this.targets=[]; //holds items of class Target
        this.player=null; //holds instance of class Player
        this.keysDown={}; //holds all keys currently being pressed
        this.objects=[];
        this.selected=false;
        
        //now properly initialize these class variables
        //create a separate method for this so can reset if needed.
        this.initialize();
    }
    /**
     * This function creates the objects required for the game and places them in the scene.
     */
    initialize() {
        this.worldCamera=new THREE.OrthographicCamera(-55,55,55,-55,0,1000);
        this.worldCamera.position.set(0,100,0);
        this.worldCamera.lookAt(0,0,0);
        
        this.scene=new Physijs.Scene();
        this.scene.background=new THREE.Color(0x8888ff);
        let plane=new THREE.PlaneBufferGeometry(GRID_SIZE,GRID_SIZE);
        plane.rotateX(-Math.PI/2);
        let mat=new THREE.MeshPhongMaterial({color:0x005500});
        //let obj=new THREE.Mesh(plane,mat);
        let obj=new Physijs.BoxMesh(plane,mat,0);
        obj.receiveShadow=true;
        this.scene.add(obj);
        this.scene.add(new THREE.AmbientLight(0xffffff,0.5));
        let light=new THREE.DirectionalLight(0xffffff,0.75);
        light.position.set(8,5,4);
        light.castShadow=true;
        light.shadow.mapSize.width=1024;
        light.shadow.mapSize.height=1024;
        light.shadow.camera.near=-GRID_SIZE;
        light.shadow.camera.far=GRID_SIZE;
        light.shadow.camera.left=-GRID_SIZE;
        light.shadow.camera.right=GRID_SIZE;
        light.shadow.camera.top=GRID_SIZE;
        light.shadow.camera.bottom=-GRID_SIZE;
        this.scene.add(light);
        this.player=new Player();
        this.scene.add(this.player);
        this.camera=this.player.camera;
        this.addTargets();
        this.addRocks();
    }
    /**
     * This fucntion creates the "boulders" viewed in the game.
     */
    addRocks(){
        for(let i=0;i<NUM_ROCKS;i++) {
            let loc={rX:Math.random()*GRID_SIZE-GRID_SIZE/2,rY:0,rZ:Math.random()*GRID_SIZE-GRID_SIZE/2};
            let boulder=new Rock(loc);
            boulder.geometry.translate(loc.rX,loc.rY,loc.rZ);
            boulder.geometry.computeBoundingSphere();
            this.rocks.push(boulder);
            this.objects.push(boulder);
            this.scene.add(boulder);
        }
    }
    /**
     * This function creates the targets in the game and places them in the scene. 
     */
    addTargets(){
        for(var i=0;i<NUM_TARGETS;i++){
            let num=Math.floor(Math.random()*2);
            let num2=Math.floor(Math.random()*2);
            let position={tX:Math.random()*GRID_SIZE-GRID_SIZE/2, tY:0, tZ:Math.random()*GRID_SIZE-GRID_SIZE/2};
            let target=new Target(num,num2,position);
            if (num==1){
                target.ring.rotateY(-Math.PI/2);
            }
            target.ring.geometry.translate(position.tX,position.tY,position.tZ);
            target.ring.geometry.computeBoundingSphere();
            this.objects.push(target);
            this.targets.push(target);
            this.scene.add(target.ring);
        }
    }
    /**
     * This function places the projectiles from the player into the game. 
     */
    addProjectile(){
        this.projectiles.push(new Projectile());

    }
    /**
     * This function handles all of the changes that occurs in the game fromboth user input and timed actions. 
     * @param {*} delta - the amount of time that has passed since the last time the update function was called.
     */
    update(delta) {
        //handles all changing of anything in the world based on
        for(let key in this.keysDown) {
            if (this.keysDown.hasOwnProperty(key) && this.keysDown[key]==true)
            switch(key) {
                case 'c':
                    if (this.camera==this.worldCamera) {
                        this.camera=this.player.camera;

                    } else {
                        this.camera=this.worldCamera;
                    }
                    this.keysDown[key]='unset';
                    break;
                case 'w':
                    if(this.selected){
                        if(parseInt(this.selected.object.position.x)==(-50-parseInt(this.selected.object.loc.rZ))){
                            break;
                        }
                        this.selected.object.position.z-=.1;
                        //this.selected.onject.setLinearVelocity(new THREE.Vector3(0, 0, 0));
                        //this.selected.object.setAngularVelocity(new THREE.Vector3(0, 0, 0));
                        this.selected.object.__dirtyPosition = true;
                    }
                    break;
                case 'a':
                    if(this.selected){
                        if(parseInt(this.selected.object.position.x)==(-50-parseInt(this.selected.object.loc.rX))){
                            break;
                        }
                        this.selected.object.position.x-=.1;
                        this.selected.object.__dirtyPosition = true;
                    }
                    break;
                case 's':
                    if(this.selected){
                        if(parseInt(this.selected.object.position.z)==(50-parseInt(this.selected.object.loc.rZ))){
                            break;
                        }
                        this.selected.object.position.z+=.1;
                        this.selected.object.__dirtyPosition = true;
                    }
                    break;
                case 'd':
                    if(this.selected){
                        if(parseInt(this.selected.object.position.x)==(50-parseInt(this.selected.object.loc.rX))){
                            break;
                        }
                        this.selected.object.position.x+=.1;
                        this.selected.object.__dirtyPosition = true;
                    }
                    break;
                case 'ArrowUp':
                    this.player.moveForward(delta, MOVE);
                    break;
                case 'ArrowDown':
                    this.player.moveBack(delta,MOVE);
                    break;
                case 'ArrowLeft':
                    this.player.rotation.y+=delta*(Math.PI/2);
                    break;
                case 'ArrowRight':
                    this.player.rotation.y-=delta*(Math.PI/2);
                    break;
                //TAB causes a lot of problems in the browsers, such as switching focus on something such as the address bar.
                case '0':
                    this.player.jump();
                    break;
                case '9':
                    //This is fucking broken
                    this.player.fire(delta);
                    break;
                case 'Escape':
                    if(this.selected){
                        this.deselect();
                    }
                    this.keysDown[key]='unset';
                    break;
                default:
                    break;
            }
        }
        this.player.update(delta);
        //this.isCollision(this.player);
        for(var i=0;i<this.targets.length;i++){
            this.targets[i].update();
        }
    }
    /**
     * This function sets the property of the pressed key to down.
     * @param {*} event - the event of a key pressed on the keyboard. 
     */
    keyDown(event) {
        if(this.keysDown[event.key]!='unset'){
            this.keysDown[event.key]=true; 
        }
    }
    /**
     * This function stes the propery of the key released to unset. 
     * @param {*} event - the event of the key unpressed on the keyboard. 
     */
    keyUp(event) {
        this.keysDown[event.key]=false; 
    }
    /**
     * This function handles the clicking on the mouse for the game. It will select the boulder clicked, change the color to black, and allow it to be moved by setting it as the selected object.
     * Before this happens, if another object is selected, the object will become unselected.
     * @param {*} event - the event of a click on the mouse. 
     */
    click(event) {
        if(this.selected){
            this.deselect();
        }
        let mouse = { x : 0, y : 0 };
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        let raycaster=new THREE.Raycaster();
        raycaster.setFromCamera(mouse,this.camera);
        let hits=raycaster.intersectObjects(this.scene.children);
        if(hits[0].object.geometry.type=="PlaneBufferGeometry" || hits[0].object.geometry.type=="TorusGeometry"){
            return;
        }
        hits[0].object.material.color=new THREE.Color(0,0,0);
        this.selected=hits[0];
    }
    /**
     * This function sets the selected item to false, allowing other objects to be selected. 
     */
    deselect(){
        this.selected.object.material=new THREE.MeshPhongMaterial({color:0xffffff});
        this.selected=false;
    }
}