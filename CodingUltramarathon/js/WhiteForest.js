class WhiteForest extends Project{
	constructor(canvas){
		super(canvas);

		this.treeCount=50

		this.tmpCanvas = document.createElement('canvas');
		this.tmpCanvas.width = CANVAS_SIZE;
		this.tmpCanvas.height = CANVAS_SIZE;
		this.tmpCtx = this.tmpCanvas.getContext("2d")

		// drawColoredBackground(this.tmpCtx,"rgb(40,40,40)");

		this.snowfallCanvas = document.createElement('canvas');
		this.snowfallCanvas.width = CANVAS_SIZE;
		this.snowfallCanvas.height = CANVAS_SIZE;
		this.snowfall = new SnowFall(this.snowfallCanvas);
		this.snowfallCtx = this.snowfallCanvas.getContext("2d")

		for(let i=0; i<this.treeCount; i++){
			let loc=
			[
				CANVAS_SIZE*Math.random(),
				CANVAS_SIZE*0.9+CANVAS_SIZE*0.1*Math.random()
			]
			this.drawTree(this.tmpCtx, loc,(200-(CANVAS_SIZE-loc[1])),0,9)
		}

		this.drawFrame();
		this.showDisabled();
	}
	
	drawFrame(){
		drawColoredBackground(this.ctx,"rgb(30,170,240)");
		this.snowfall.drawFrame()
		addToCanvas(this.snowfallCtx, this.ctx)
		
		this.ctx.fillStyle="lightgray"
		this.ctx.fillRect(0, CANVAS_SIZE*0.65, CANVAS_SIZE, CANVAS_SIZE*0.5)

		addToCanvas(this.tmpCtx, this.ctx)
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























