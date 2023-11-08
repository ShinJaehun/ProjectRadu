class GloomyForest extends Project{
	constructor(canvas){
		super(canvas);

		this.treeCount=50

		this.tmpCanvas = document.createElement('canvas');
		this.tmpCanvas.width = CANVAS_SIZE;
		this.tmpCanvas.height = CANVAS_SIZE;
		this.tmpCtx = this.tmpCanvas.getContext("2d")

		// drawColoredBackground(this.tmpCtx,"rgb(40,40,40)");

		this.rainCanvas = document.createElement('canvas');
		this.rainCanvas.width = CANVAS_SIZE;
		this.rainCanvas.height = CANVAS_SIZE;
		this.rain = new Rain(this.rainCanvas);
		this.rainCtx = this.rainCanvas.getContext("2d")

		let yLocation = CANVAS_SIZE*0.9
		for(let i=0; i<this.treeCount; i++){
			let loc=
			[
				CANVAS_SIZE*Math.random(),
				yLocation
			]
			yLocation+=CANVAS_SIZE*0.004*Math.random()

			let val=(CANVAS_SIZE-loc[1])/2
			this.tmpCtx.strokeStyle="rgb("+val+","+val+","+val+")"

			this.drawTree(this.tmpCtx, loc,(200-(CANVAS_SIZE-loc[1])),0,9)
		}

		this.drawFrame();
		this.showDisabled();
	}
	
	drawFrame(){
		drawColoredBackground(this.ctx,"rgb(50,50,50)");
		this.rain.drawFrame()
		
		addToCanvas(this.rainCtx, this.ctx)

		this.ctx.fillStyle="rgb(50,50,50)"
		this.ctx.fillRect(0, CANVAS_SIZE*0.65, CANVAS_SIZE, CANVAS_SIZE*0.5)
		addToCanvas(this.tmpCtx, this.ctx)



	}
	
	drawTree(ctx, location, len, angle, branchWidth){
		ctx.beginPath()
		ctx.save()

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























