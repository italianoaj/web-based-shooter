# The Game
### Computer Graphics Assignment 4
### Due November 16, 2018

For this assignment you will be creating an interactive graphics environment.  The environment will consist of a plane (100x100) with several objects on the plane.  The objects on the plane will consist of the following:

### Objects
1. **The Player** -- The player will consist of a simple (1x1x1) cube geometry representation.  It will also contain a perspective camera for viewing from the player's perspective.  The camera should be just behind and above the cube so the cube is barely visible. The player should also contain a spotlight that is pointed in the same direction as the camera that remains just behind the camera.  The spotlight should cast shadows.  The material should be very different than all other objects on the plane.  The player position should start at the origin.
2. **Boulders** -- These objects should be randomly placed around the plane.  The geometries should be selected from the THREE.js built-in geometries (boxes, tetrahedron, etc.) and should be rendered with flat surfaces.  The material properties should also be very simple for fast rendering.  No boulders should be overlapping with anything else.  There should be at least 100 boulders on the plane.  The objects do not move on their own but can be moved by the player.
3. **Targets** -- These objects should also be randomly placed and oriented around the plane so that they are not in contact with anything else on the plane.  The geometries of the targets should either be created by you using modeling software (like blender) or be free on-line 3d geometries that you find on-line.  You should load the geometries for the targets from these saved files.  You should have at least 50 targets on the plane.  You select the material properties but they should be very different from the boulders.  These objects move on their own.  They should travel in a straight line at a constant speed until they reach the edge of the plane or collide with some other object.  When that happens they should rotate by 180 degrees and continue moving at the same speed.
4. **Projectiles** -- These objects do not initially appear on the plane but should appear when the player causes one to appear.  Use a sphere geometry and a black colored material.  The projectiles should be lobbed from the position of the player and in the direction the player is facing.  The projectiles should travel in a realistic fashion like a ball until they come into contact with the plane or some other object.  If the projectile contacts another object then the projectile and the other object should be removed from the game.  If the projectile hits the plane it should be removed from the game.  If the projectile reaches the edge of the plane then it should be removed from the game.
5. **Other Graphical Components** -- The scene should be lit using ambient light and directional light so that all objects cast shadows on the plane and on each other.  There should be a second orthographic camera that is positioned above the scene so that the entire plane and all objects on it are clearly visible.  The plane itself should be rendered in the x-z plane.  I also recommend creating a grid-helper that is placed over the plane.

### Controls
The controls for the game will involve both the mouse and keyboard.  Here is each control key and what it should do:
XXX* **Left-click** -- the user should be able to left-click on boulders in the scene.  When a boulder is clicked on and other selected items should be unselected and the clicked-on boulder should change its material properties so the user can see that the object has been selected.  If a boulder is selected then the w,a,s,d keys should control sliding that object around on the plane but not being able to move the object off the plane (stop when it reaches an edge).
XXX* **Escape Key** -- When pressed any selected object should become un-selected.  Unselected objects should go back to their original material properties.
XXX* **Up and Down Arrow key down** -- Should cause the player to move forward and backwards along the plane in the direction that it is facing.
XXX* **Left and Right Arrow key down** -- Should cause the player to rotate around its own y-axis to the left or right chaning the direction it is facing.
XXX-MOVED TO 0 BECAUSE OF BROWSER ISSUES* **Tab key** -- If the player is on an object or the plane then the player should jump in a realistic fashion.
* **Space-bar key** -- A projectile should be launched from the players position and in the direction the player is facing.
XXX* **C key** -- should toggle the rendering between the player's camera (From the player's perspective) to the orthographic camera (from the global perspective).
* **W,A,S,D keys** -- These keys should only work when a boulder is selected.  A selected boulder should move in the x-direction with A and D and in the z-direction with W and S.  If a boulder reaches the edge of the plane then it stops moving.

### Hand-in
All files necessary for the game to play should be zipped up and handed in.

### Grade Breakdown

The files for this project should be well organized.  Keep seperate directories for each type of file.  The code should be well organized and commented using classes and methods.  The points will be broken down as follows:

* 20 points -- well organized code and file structure.
* 20 points -- The plane, boulders, targets, and player all appear correctly.
* 20 points -- The player moves correctly and toggling of the camera works properly.
* 20 points -- projectiles are created, move, and destroyed correctly, eliminating other objects as described above.
* 20 points -- selecting and un-selecting of boulders works correctly and boulders move correctly when selected.

### Extra Credit

I will give extra credit for adding in additional features up to a 100% score:

* projectiles do not disappear when they hit the plane.  Rather they roll along the plane losing momentum until they stop.  Only once they stop do they disappear.  If a rolling projectile hits an object then it moves the object causing it to slide along the plane.
* objects can also be moved above the plane and stacked on top of each other.  You will need to let me know if you implement this and what keys control this type of movement.
* Use a physics engine to create realistic motion of objects.  The ammo.js [https://github.com/kripken/ammo.js/](https://github.com/kripken/ammo.js/) library is one that the creator of three.js has used in some of his examples like the break example [https://threejs.org/examples/#webgl_physics_convex_break](https://threejs.org/examples/#webgl_physics_convex_break).
* Other additional features but you need to get prior approval.
