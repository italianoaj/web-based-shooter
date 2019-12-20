/**
 * This class creates the object that represents a target in the game. 
 * @author italianoaj
 */
class Ghost extends THREE.Mesh{
     constructor(){
        var loader = new THREE.STLLoader();
        loader.load( 'model/Ghost.stl', function ( geo ) {
            let mat=new THREE.MeshStandardMaterial({color:0x777777,transparent:true,opacity:0.75});
            super(geo,mat);
        });
     }
 }
 

