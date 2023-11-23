class FlamingBat extends Project {
    constructor(canvas) {
        super(canvas)
        canvas.style.background="black"

        this.batLocation=[CANVAS_SIZE*0.5, CANVAS_SIZE*0.5]
        
		this.fireCanvas = document.createElement('canvas');
		this.fireCanvas.width = CANVAS_SIZE;
		this.fireCanvas.height = CANVAS_SIZE;
		this.fire = new Fire(this.fireCanvas, 35);

		for(let i=0; i< 10; i++){
			this.fire.path=getCirclePath([CANVAS_SIZE*0.5,CANVAS_SIZE*0.45], CANVAS_SIZE*0.1)
		}
		
		this.fireCtx = this.fireCanvas.getContext("2d")

        this.fire.drawFrame()
        
        this.drawFrame();
        this.showDisabled();
        this.time=0
    }

    drawFrame(){
        clearBackground(this.ctx)
        // drawDarkBackground(this.ctx, "rgb(30,170,240)")
        this.fire.drawFrame()

        let amount=(Math.sin(this.time)+1)/2
        drawFlappyBat(this.ctx, this.batLocation, CANVAS_SIZE*0.2, 0, amount)

        addToCanvas(this.fireCtx, this.ctx)
        this.time+=0.8
    }
    
}

function getCirclePath(location, radius) {
    let arr=[]
    for(let i=0; i<=Math.PI*2; i+=0.2){
        arr.push([
            location[0]+Math.cos(i)*radius*0.5,
            location[0]+Math.sin(i)*radius
        ])
    }
    return arr
}