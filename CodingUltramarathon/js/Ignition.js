class Ignition extends Project {
    constructor(canvas) {
        super(canvas)

        canvas.style.background="black"

        this.movingStars=[]
        for(let i=0; i<100; i++){
            this.movingStars.push(new MovingStar([
                CANVAS_SIZE*Math.random(),
                CANVAS_SIZE*Math.random()
            ]))
        }

        this.startLocation= [CANVAS_SIZE*0.5, CANVAS_SIZE*0.85]
		this.fireCanvas = document.createElement('canvas');
		this.fireCanvas.width = CANVAS_SIZE;
		this.fireCanvas.height = CANVAS_SIZE;
		this.fire = new Fire(this.fireCanvas, 30, true);
        this.fire.path=[this.startLocation]

        this.fireCtx = this.fireCanvas.getContext("2d")

        this.fire.drawFrame()

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
        drawDarkBackground(this.ctx, "rgb(30,170,240)")

        this.fire.drawFrame()

        addToCanvas(this.fireCtx, this.ctx)

        for(let i=0; i<this.movingStars.length; i++){
            this.movingStars[i].update()
            this.movingStars[i].draw(this.ctx)
        }
        drawSpaceShip(this.ctx, this.startLocation, CANVAS_SIZE*0.12, 0)

    }   
}
