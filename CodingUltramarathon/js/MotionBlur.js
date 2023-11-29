class MotionBlur extends Project {
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
			
			this.ctx.globalAlpha=0.3
			// 이거에 대해 알아봐야 할 필요가 있습니다...
			this.ctx.drawImage(VIDEO,sx,sy,min,min,
								0,0,CANVAS_SIZE,CANVAS_SIZE);
			// motionBlurImage(this.ctx)
			
		} 
    }   
}

// function motionBlurImage(ctx){
//     const imgData = ctx.getImageData(0,0,CANVAS_SIZE,CANVAS_SIZE)

//     for(let y=0; y<=CANVAS_SIZE; y++) {
//     	for(let x=0; x<=CANVAS_SIZE; x++) {
//     		let index=(y*CANVAS_SIZE+x%CANVAS_SIZE)*4;

//      		// let aA=imgData.data[index+3]

// 			imgData.data[index+3]=100
//     	}
//     }

// 	ctx.putImageData(imgData,0,0)
// }
