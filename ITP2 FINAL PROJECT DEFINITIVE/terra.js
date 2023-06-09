//terra constructor 
//inspired by the in-course "particle" constructor,
function terra(x, y, color, angle, speed, shift){
    
    //var for the color of terra which is the same as the color 

    var color = color;
    
    //var for the angle of terra around the center point of the 

    var angle = angle;
    
    //storing coords in a p5 vector to make the math easier
    var vec = createVector(x, y)
    
    //variable for the speed of terra which is passed in from 

    var speed = speed;
    
    //draw the terra to the screen
    this.draw = function(){
        push();
        
        //initially update terra to ensure values are set
        update();
        
        //draw terra
        noStroke();
        fill(color);
        ellipse(vec.x, vec.y, 10, 10);
        
        pop();
    }
    
    //update function for controlling movement
    function update(){
        
        //speed by which the terra move out from the  
        //centerpoint
        speed -= map(mouseX, 0, width, -0.5, 0.5);
        
        //setting each terra to expand and contract
        //its appropriate position
        vec.x += cos(angle) * speed;
        vec.y += sin(angle) * speed;
        
        //variable 
        vec.mult(shift);
        
        //getting the terra to rotate around the origin and coalesce 
        vec.rotate(fourier.getEnergy("bass", "treble")/4000);
    }
}
