class GreenScreen extends Project {
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
			greenScreenImage(this.ctx, this.baseColor, 80)
			
		} 
    }   
}

function greenScreenImage(ctx, baseColor, threshold, secondaryCtx){
    const imgData = ctx.getImageData(0,0,CANVAS_SIZE,CANVAS_SIZE)

    for(let y=0; y<=CANVAS_SIZE; y++) {
    	for(let x=0; x<=CANVAS_SIZE; x++) {
    		let index=(y*CANVAS_SIZE+x%CANVAS_SIZE)*4;

			let r=imgData.data[index+0]
			let g=imgData.data[index+1]
			let b=imgData.data[index+2]
			let a=imgData.data[index+3]

			// 이렇게 사용 불가
			// if(r==0 && g==255 && b==0){
			// 	imgData.data[index+3]=0
			// }	

			// if(r==131 && g==225 && b==119){
			// 	imgData.data[index+3]=0
			// }

			if(similar(baseColor, [r,g,b], threshold)){
				imgData.data[index+3]=0
			}
    	}
    }
	if(secondaryCtx!=null){
		secondaryCtx.putImageData(imgData, 0, 0)
	}else{
		ctx.putImageData(imgData,0,0)
	}
}

function similar(colA, colB, threshold){
	// 이렇게 하지마 브라우저 다운돼
	// console.log("colA: "+colA.length)
	// console.log("colB: "+colB)
	let dist=distance(colA, colB)
	if(dist<threshold){
		return true
	}
	return false
}

function getPixelArrayAt(ctx, location){
	const imgData=ctx.getImageData(...location, 1, 1)
	return [imgData.data[0], imgData.data[1], imgData.data[2]]
}
