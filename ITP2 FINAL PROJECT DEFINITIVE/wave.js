//wave constructor - sub constructor for Extend vis
function Wave(initialRadius){
    
    //get waveform for audio at current moment
    var w = fourier.waveform();
    
    //save initial radius value
    var initialRadius = initialRadius;
    
    //set radius value
    this.radius = initialRadius;
    
    //create points container to hold vertices of wave 
    //representation
    this.points = [];
    
    //initial magnitude
    this.magnitude = 0;
    
    //iterate over the bins output by FFT.waveform()
    for (var i = 0; i < w.length; i++){
        
        //only create new vertex every tenth bin
        if (i % 10 == 0){
            //make the waveform wrap around the circumferance 
            //of a circle
            var angle = map(i, 0, w.length - 1, 0, 2*PI);

            //get cos & sin in order to calculate the x and y 
            //coords for each vertex
            var cosine = cos(angle);
            var sine = sin(angle);
            
            this.points.push({
                c: cosine,
                s: sine,
                x: 0,
                y: 0
            });
        }
    }
    
    //get the length of the points array
    var l = this.points.length;
    
    this.update = function(currentRadius, mx, w){

//        this.radius -= 5;
        var relativeSizeOfCurrent = (this.radius - 5)/initialRadius;
        this.radius = currentRadius * relativeSizeOfCurrent;
        
        //iterate over the points array
        for (var i = 0; i < l; i++){

            var point = this.points[i];
            
            sine = point.s;
            cosine = point.c;
            
            //calculate the magnitude of the offset of the 
            //frequency represented by the vertex i
            var offset = 0;//map(mx, 0, width, 0, currentRadius);// <==== was ... currentRadius * point

            //start x and y's offsets = offset by default
            var xOffset = offset;
            var yOffset = offset;

            //if angle is in 3rd or 4th quadrants make xOffset 
            //negative
            if (cosine < 0){
                xOffset = -offset;
            }

            //if angle is in 2nd or 3rd quadrants make yOffset 
            //negative
            if (sine < 0){
                yOffset = -offset;
            }

            //update x and y coords using cos/sin, radius, 
            //and offsets
            point.x = (cosine * this.radius + xOffset);
            point.y = (sine * this.radius + yOffset);
        }
    }
}