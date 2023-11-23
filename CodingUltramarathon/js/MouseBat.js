class MouseBat extends Project {
    constructor(canvas) {
        super(canvas)
        canvas.style.background="black"
        canvas.style.cursor="none"

        this.batLocation=[CANVAS_SIZE*0.5, CANVAS_SIZE*0.5]

        this.drawFrame();
        this.showDisabled();

        this.time=0
    }

    drawFrame(){
        clearBackground(this.ctx)
        
        let amount=(Math.sin(this.time)+1)/2
        drawFlappyBat(this.ctx, this.batLocation, CANVAS_SIZE*0.2, 0, amount)

        this.time+=0.8
    } 
    
    
    move(location){
        this.batLocation=location
    }
}