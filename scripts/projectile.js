class Projectile{
    
    constructor(delta, x, y){
        var geometry = new THREE.SphereGeometry( 5, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.x=x;
        sphere.position.y=y
        this.delta=delta;
    }
    
    update(){
    
    }
}