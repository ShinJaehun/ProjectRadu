class FakeBackground extends Project {
    constructor(canvas) {
        super(canvas)

		this.tmpCanvas = document.createElement('canvas')
		this.tmpCanvas.width = CANVAS_SIZE
		this.tmpCanvas.height = CANVAS_SIZE
		this.tmpCtx = this.tmpCanvas.getContext('2d')

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

			greenScreenImage(this.ctx, this.baseColor, 100, this.tmpCtx)
			drawDarkBackground(this.ctx)

			addToCanvas(this.tmpCtx, this.ctx)
		} 
    }   
}