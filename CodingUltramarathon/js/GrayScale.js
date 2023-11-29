class GrayScale extends Project {
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
			grayScaleImage(this.ctx)
			
		} 
    }   
}

function grayScaleImage(ctx){
    const imgData = ctx.getImageData(0,0,CANVAS_SIZE,CANVAS_SIZE)

    for(let y=0; y<=CANVAS_SIZE; y++) {
    	for(let x=0; x<=CANVAS_SIZE; x++) {
    		let index=(y*CANVAS_SIZE+x%CANVAS_SIZE)*4;

     		let rA=imgData.data[index+0]
     		let gA=imgData.data[index+1]
     		let bA=imgData.data[index+2]
     		let aA=imgData.data[index+3]

			let avg=(rA+gA+bA)/3

			imgData.data[index+0]=avg
			imgData.data[index+1]=avg
			imgData.data[index+2]=avg
			imgData.data[index+3]=aA
    	}
    }

	ctx.putImageData(imgData,0,0)
}
