/**
 * 
 */
class Rock extends Physijs.SphereMesh{
    /**
     * 
     */
    constructor(loc){
        let mat=new THREE.MeshPhongMaterial({color:0xffffff});
        let geo=new THREE.DodecahedronBufferGeometry();
        geo.rotateX(Math.random()*Math.PI/8);
        geo.rotateY(Math.random()*Math.PI/8);
        geo.rotateZ(Math.random()*Math.PI/8);
        geo.computeBoundingSphere();
        geo.normalizeNormals();
        super(geo,mat,0);
        this.castShadow=true;
        this.loc=loc;
        this.position.y=1;
        this.setLinearVelocity(new THREE.Vector3(0, 0, 0));
        this.setAngularVelocity(new THREE.Vector3(0, 0, 0));
    }
    //TODO make movement functions here....
}