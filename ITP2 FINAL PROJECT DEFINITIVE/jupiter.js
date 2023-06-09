//"Oscillate" visualization
function jupiter(){

	//vis name
	this.name = "Jupiter";

	//draw the wave form to the screen
	this.draw = function(){

		push();

        noStroke()

        //get the waveform for the left and right channels
        var waveL = fftL.waveform();
        var waveR = fftR.waveform();

        //iterate over the bins output by FFT.waveform()
        for (var i = 0; i < waveL.length; i++){

            //for each element of the waveform map it to screen 
            //coordinates and make a new ellipse at the point
            
            //determine the x position for a single axis 
            //oscilloscope
            var singleAxisPos = map(
                i, 
                0, waveL.length, 
                -width/2, width/2
            );
            
            //determine the x position for a dual axis oscilloscope
            var dualAxisPos = map(
                waveL[i], 
                -1, 1, 
                -width/2, width/2
            );
            
            //map x position from the single axis x and the dual 
            //axis x based on the mouseX position
            var x = map(
                mouseX, 
                0, width, 
                singleAxisPos, dualAxisPos
            );

            var y = map(
                waveR[i], 
                -1, 1, 
                -height/2, height/2
            );

            //draw "Oscilloscope dot" based on waveforms
            fill(255,0,0)
            ellipse(x, y, 13);

        }
        
        pop();
	};
}
