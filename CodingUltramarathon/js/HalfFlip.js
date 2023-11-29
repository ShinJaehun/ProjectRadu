class HalfFlip extends Project {
    constructor(canvas) {
        super(canvas)

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
        if(VIDEO!=null){
			var vw=VIDEO.videoWidth;
			var vh=VIDEO.videoHeight;
			var min=Math.min(vw,vh);
			var sx=(vw-min)/2;
			var sy=(vh-min)/2;
			
			this.ctx.drawImage(VIDEO,sx,sy,min,min,
								0,0,CANVAS_SIZE,CANVAS_SIZE);
			halfFlipImage(this.ctx)
			
		} 
    }   
}

function halfFlipImage(ctx){
    const imgData = ctx.getImageData(0,0,CANVAS_SIZE,CANVAS_SIZE)

    for(let y=0; y<=CANVAS_SIZE; y++) {
    	for(let x=0; x<=CANVAS_SIZE/2; x++) {
    		let indexA=(y*CANVAS_SIZE+x%CANVAS_SIZE)*4;
    		let indexB=(y*CANVAS_SIZE+(CANVAS_SIZE-x%CANVAS_SIZE))*4;

     		let rA=imgData.data[indexA+0]
     		let gA=imgData.data[indexA+1]
     		let bA=imgData.data[indexA+2]
     		let aA=imgData.data[indexA+3]
    		
			// let rB=imgData.data[indexB+0]
     		// let gB=imgData.data[indexB+1]
     		// let bB=imgData.data[indexB+2]
     		// let aB=imgData.data[indexB+3]

			// imgData.data[indexA+0]=rB
			// imgData.data[indexA+1]=gB
			// imgData.data[indexA+2]=bB
			// imgData.data[indexA+3]=aB

			imgData.data[indexB+0]=rA
			imgData.data[indexB+1]=gA
			imgData.data[indexB+2]=bA
			imgData.data[indexB+3]=aA
    	}
    }

	ctx.putImageData(imgData,0,0)
}
