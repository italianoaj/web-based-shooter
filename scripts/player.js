/**
 * This class creates the object in the game that represnts the player
 * @author oliphantlt, italianoaj
 */
class Player extends THREE.Group {
    /**
     * 
     */
    constructor() {
        //Call constructor of Super class THREE.Group
        super();

        //player's class variables
        this.camera = new THREE.PerspectiveCamera(85);
        this.camera.position.set(0,1.5,0.5);
        this.camera.position.set(0,3,2);
        this.camera.lookAt(0,0,-3);
        var material = new THREE.LineBasicMaterial({ color: 0xFF0000 });
        // crosshair size
        var x = 0.01, y = 0.01;
        var geometry = new THREE.Geometry();
        // crosshair
        geometry.vertices.push(new THREE.Vector3(0, y, 0));
        geometry.vertices.push(new THREE.Vector3(0, -y, 0));
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(x, 0, 0));    
        geometry.vertices.push(new THREE.Vector3(-x, 0, 0));
        this.crosshair = new THREE.Line( geometry, material );
        // place it in the center
        var crosshairPercentX = 50;
        var crosshairPercentY = 50;
        var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
        var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;
        this.crosshair.position.x = crosshairPositionX * this.camera.aspect;
        this.crosshair.position.y = crosshairPositionY+.1;;
        this.crosshair.position.z = -0.3;
        //Add crosshair to the camera
        this.camera.add( this.crosshair );
        this.add(this.camera);
        let geo = new THREE.BoxBufferGeometry();
        geo.translate(0,0.5,0.5);  //puts the cube with front,bottom of cube at origin
        this.geometry=geo;
        this.mesh=new Physijs.BoxMesh(geo,new THREE.MeshLambertMaterial({color:0xff0000}));
        this.mesh.setLinearVelocity(new THREE.Vector3(0, 0, 0));
        this.mesh.setAngularVelocity(new THREE.Vector3(0, 0, 0));
        //this.mesh=new THREE.Mesh(geo,new THREE.MeshLambertMaterial({color:0xff0000}));
        this.add(this.mesh);
        let light=new THREE.SpotLight(0xffffff,2,10,Math.PI/8,1.0,0.75);
        light.position.set(0,4,2);
        let target=new THREE.Object3D();
        target.position.set(0,0,-6);
        light.target=target;
        this.add(light);
        this.add(target);
        this.inAir=false;
        this.velocity=new THREE.Vector3(0,VELOCITY,0);
        this.acc=new THREE.Vector3(0,-ACC,0);
    }
    /**
     * 
     * @param {*} delta 
     */
    fire(delta){
        let bullet=new Projectile(delta, this.position.x, this.position.y); 
        world.projectiles.push(bullet.sphere);
        world.scene.add(bullet.sphere);
    }
    /**
     * 
     */
    jump() {
        if (this.inAir) return;
        this.inAir=true;
    } 
    /**
     * 
     * @param {*} delta 
     * @param {*} move 
     */
    moveForward(delta,move){
        if (parseInt(this.position.z)==50){
            console.log("player: "+this.position.z);
            this.position.set(this.position.x,this.position.y,49);
            return;
        }else if (parseInt(this.position.z)==-50){
            this.position.set(this.position.x,this.position.y,-49);
            return;
        }else if (parseInt(this.position.x)==50){
            this.position.set(49,this.position.y,this.position.z);
            return;
        }else if (parseInt(this.position.x)==-50){
            this.position.set(-49,this.position.y,this.position.z);
            return;
        }
        let zVec=this.getWorldDirection();
        this.position.add((zVec.multiplyScalar(-(delta*move))));
        return;
    }
    /**
     * 
     * @param {*} delta 
     * @param {*} move 
     */
    moveBack(delta,move){
        if (parseInt(this.position.z)==50){
            this.position.set(this.position.x,this.position.y,49);
            return;
        }else if (parseInt(this.position.z)==-50){
            this.position.set(this.position.x,this.position.y,-49);
            return;
        }else if (parseInt(this.position.x)==50){
            this.position.set(49,this.position.y,this.position.z);
            return;
        }else if (parseInt(this.position.x)==-50){
            this.position.set(-49,this.position.y,this.posion.z);
            return;
        }
        let zVec2=this.getWorldDirection();
        this.position.add((zVec2.multiplyScalar((delta*move))));
        return;
    }
    /**
     * 
     */
    rotateRight(){
        //TODO MOVE ROTATION HERE
    }
    /**
     * 
     */
    rotateLeft(){
        //TODO MOVE ROTATION HERE
    }
    /**
     * 
     * @param {*} delta 
     */
    update(delta) {
        if (this.inAir) {
            this.position.add(this.velocity);
            this.velocity.add(this.acc.clone().multiplyScalar(delta));
            if (this.position.y<=0) {
                this.inAir=false;
                this.position.y=0;
                this.velocity.set(0,VELOCITY,0);
            }
        }
    }
}