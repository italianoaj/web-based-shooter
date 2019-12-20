/**
 * This class creates the object that represents a target in the game. 
 * @author italianoaj
 */
class Target{
   /**
    * 
    * @param {*} face 
    * @param {*} dir 
    * @param {*} loc 
    */ 
    constructor(face,dir,loc){
        this.dir=dir;
        this.face=face;
        this.loc=loc;
        this.velocity=new THREE.Vector3(0,VELOCITY,0);
        this.acc=new THREE.Vector3(0,-ACC,0);
        let geo = new THREE.TorusGeometry( 1, .3, 10, 60 );
        let mat=new THREE.MeshBasicMaterial({color:0xffff00});
        this.ring=new THREE.Mesh( geo, mat );
        this.ring.position.y+=1.5;
        this.claimed=false;
    }
    /**
     * 
     */
    update(){
        if (parseInt(this.face)==0){
            if(parseInt(this.ring.position.x)==(50-parseInt(this.loc.tX))){
                this.dir=1;
            }else if(parseInt(this.ring.position.x)==(-50-parseInt(this.loc.tX))){
                this.dir=0;
            }
            if(parseInt(this.dir)==1){
                this.ring.position.x-=.1;
            }else{
                this.ring.position.x+=.1;
            }
        }else if(parseInt(this.face)==1){
            if(parseInt(this.ring.position.z)==(50-parseInt(this.loc.tZ))){
                this.dir=1;
            }else if(parseInt(this.ring.position.z)==(-50-parseInt(this.loc.tZ))){
                this.dir=0;
            }
            if(parseInt(this.dir)==1){
                this.ring.position.z-=.1;
            }else{
                this.ring.position.z+=.1;
            }
        }
    }
}
