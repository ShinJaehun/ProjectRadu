class NoGreenScreen extends Project {
    constructor(canvas) {
        super(canvas)

		this.backgroundImageData=null
        this.drawFrame();
        this.showDisabled();
    }

	click(location){
		this.backgroundImageData=this.ctx.getImageData(0,0,CANVAS_SIZE, CANVAS_SIZE)
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

			if(this.backgroundImageData!=null){
				doBackgroundDifference(this.ctx, this.backgroundImageData)	
			}
		} 
    }   
}

function doBackgroundDifference(ctx, bgImageData){
    const imgData = ctx.getImageData(0,0,CANVAS_SIZE,CANVAS_SIZE)

    for(let y=0; y<=CANVAS_SIZE; y++) {
    	for(let x=0; x<=CANVAS_SIZE; x++) {
    		let index=(y*CANVAS_SIZE+x%CANVAS_SIZE)*4;

			let r=imgData.data[index+0]
			let g=imgData.data[index+1]
			let b=imgData.data[index+2]
			let a=imgData.data[index+3]

			
			let rB=bgImageData.data[index+0]
			let gB=bgImageData.data[index+1]
			let bB=bgImageData.data[index+2]
			let aB=bgImageData.data[index+3]

			if(similar([rB,gB,bB], [r,g,b], 50)){
				imgData.data[index+3]=0
			}
    	}
    }
	ctx.putImageData(imgData,0,0)
}
