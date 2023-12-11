class Marker extends Project {
    constructor(canvas) {
        super(canvas)

		this.baseColor=[0,0,0]
        this.drawFrame();
        this.showDisabled();
    }

	click(location){
		let color=getPixelArrayAt(this.ctx, location)
		this.baseColor=color
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
			let loc = detectMarker(this.ctx, this.baseColor, 50)

			if(loc!=null){
				this.ctx.beginPath()
				this.ctx.fillStyle="red"
				this.ctx.arc(...loc, 50, 0, Math.PI*2)
				this.ctx.fill()
	
			}
			
		} 
    }   
}

function detectMarker(ctx, baseColor, threshold, secondaryCtx){
    const imgData = ctx.getImageData(0,0,CANVAS_SIZE,CANVAS_SIZE)

	let markerPoints=[]
    for(let y=0; y<=CANVAS_SIZE; y++) {
    	for(let x=0; x<=CANVAS_SIZE; x++) {
    		let index=(y*CANVAS_SIZE+x%CANVAS_SIZE)*4;

			let r=imgData.data[index+0]
			let g=imgData.data[index+1]
			let b=imgData.data[index+2]
			let a=imgData.data[index+3]

			if(similar(baseColor, [r,g,b], threshold)){
				imgData.data[index+3]=0
				markerPoints.push([x, y])
			}
    	}
    }
	if(markerPoints.length == 0) {
		return null
	}
	return average(markerPoints)
}
