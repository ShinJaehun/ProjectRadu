class FlappyBatB extends Project {
    constructor(canvas) {
        super(canvas)
        canvas.style.background="black"

        this.batLocation=[CANVAS_SIZE*0.2, CANVAS_SIZE*0.5]

        this.score=0
        this.gameOver=false
        
		this.fireCanvas = document.createElement('canvas');
		this.fireCanvas.width = CANVAS_SIZE;
		this.fireCanvas.height = CANVAS_SIZE;
		this.fire = new Fire(this.fireCanvas, 30);

        this.startX=CANVAS_SIZE*0.9
		this.startY=CANVAS_SIZE*0.5

		this.fireCtx = this.fireCanvas.getContext("2d")

        this.fire.drawFrame()
        
        this.drawFrame();
        this.showDisabled();
        this.time=0
    }

    drawFrame(){
        // clearBackground(this.ctx)
        drawDarkBackground(this.ctx, "rgb(30,170,240)")
        this.fire.drawFrame()
        addToCanvas(this.fireCtx, this.ctx)

        this.fire.path=getPillerPath([this.startX,this.startY], CANVAS_SIZE*0.15)

        if(this.gameOver==false){
            let amount=(Math.sin(this.time)+1)/2
            drawFlappyBat(this.ctx, this.batLocation, CANVAS_SIZE*0.2, 0, amount)
        } else {
            this.fire.path.push(this.batLocation)

            this.ctx.font = "10vh Comic Sans MS"
            this.ctx.fillStyle ="orange"
            this.ctx.textAlign ="center"
            this.ctx.textBaseline ="middle"

            let remainingTime=4-Math.floor(
                (new Date().getTime()-this.endTime)/1000)
            if(remainingTime<0){
                remainingTime=0
                this.restart()
            }

            this.ctx.fillText(
                "Restarting in "+remainingTime,
                CANVAS_SIZE*0.5,
                CANVAS_SIZE*0.5)
        }

        this.batLocation[1]+=10

        this.startX-=10
        if(this.startX <0){
            this.startX=CANVAS_SIZE
            this.startY=(Math.random()-0.5)*CANVAS_SIZE*0.6+CANVAS_SIZE/2
            this.score++
        }
                            
        this.ctx.font = "10vh Comic Sans MS"
        this.ctx.fillStyle ="orange"
        this.ctx.textAlign ="left"
        this.ctx.textBaseline ="top"
        this.ctx.fillText(
            this.score,
            0,
            0)

        for(let i=0; i<this.fire.path.length; i++){
            if(this.gameOver==false){
                if(distance(this.fire.path[i], this.batLocation)<= CANVAS_SIZE*0.05){
                    this.gameOver=true
                    this.endTime=new Date().getTime()
                }
            }

        }

        this.time+=1.2
    }

    restart(){
        this.score=0
        this.gameOver=false
        this.batLocation=[CANVAS_SIZE*0.2, CANVAS_SIZE*0.5]
    }

    click(location){
        if(!this.gameOver){
            this.batLocation[1]-=60

        }
    }
}
