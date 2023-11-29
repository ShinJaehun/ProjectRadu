class Invert extends Project {
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
			invertImage(this.ctx)
			
		} 
    }   
}

function invertImage(ctx){
    const imgData = ctx.getImageData(0,0,CANVAS_SIZE,CANVAS_SIZE)

    for(let y=0; y<=CANVAS_SIZE; y++) {
    	for(let x=0; x<=CANVAS_SIZE; x++) {
    		let index=(y*CANVAS_SIZE+x%CANVAS_SIZE)*4;

     		let r=imgData.data[index+0]
     		let g=imgData.data[index+1]
     		let b=imgData.data[index+2]
     		let a=imgData.data[index+3]


			imgData.data[index+0]=255-r
			imgData.data[index+1]=255-g
			imgData.data[index+2]=255-b
			imgData.data[index+3]=a
    	}
    }

	ctx.putImageData(imgData,0,0)
}
