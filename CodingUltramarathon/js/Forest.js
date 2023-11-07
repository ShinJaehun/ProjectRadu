class Forest extends Project{
	constructor(canvas){
		super(canvas);

		this.treeCount=10

		this.tmpCanvas = document.createElement('canvas');
		this.tmpCanvas.width = CANVAS_SIZE;
		this.tmpCanvas.height = CANVAS_SIZE;
		this.tmpCtx = this.tmpCanvas.getContext("2d")

		drawColoredBackground(this.tmpCtx,"rgb(30,170,240)");

		for(let i=0; i<this.treeCount; i++){
			let loc=
			[
				CANVAS_SIZE*0.2+CANVAS_SIZE*0.6*Math.random(),
				CANVAS_SIZE*0.9+CANVAS_SIZE*0.1*Math.random()
			]
			this.drawTree(this.tmpCtx, loc,(200-(CANVAS_SIZE-loc[1])),0,8)
		}

		this.drawFrame();
		this.showDisabled();
	}
	
	drawFrame(){
		// drawColoredBackground(this.ctx,"rgb(0,0,100)");
		const imgData = this.tmpCtx.getImageData(0,0,CANVAS_SIZE,CANVAS_SIZE)
		this.ctx.putImageData(imgData,0,0)

	}
	
	drawTree(ctx, location, len, angle, branchWidth){
		ctx.beginPath()
		ctx.save()
		ctx.strokeStyle="white"
		ctx.lineWidth=branchWidth
		ctx.translate(...location)
		ctx.rotate(angle)
		ctx.moveTo(0, 0)
		ctx.lineTo(0, -len)
		ctx.stroke()

		if (len<25) {
			ctx.restore()
			return
		}

		this.drawTree(ctx,
			[0, -len],
			len*0.55,
			angle+0.2,
			branchWidth*0.8)		
		this.drawTree(ctx,
			[0, -len],
			len*0.55,
			angle-0.2,
			branchWidth*0.8)	
		this.drawTree(ctx,
			[0, -len],
			len*0.75,
			angle,
			branchWidth*0.8)			
		ctx.restore()

	}
}























