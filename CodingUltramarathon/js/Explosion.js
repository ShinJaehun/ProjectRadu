class Explosion extends Project {
    constructor(canvas) {
        super(canvas)

        canvas.style.background="black"
        this.flare=new Flare([CANVAS_SIZE*0.5, CANVAS_SIZE*0.5])

        this.drawFrame();
        this.showDisabled();

    }

    drawFrame(){
        clearBackground(this.ctx)
        this.flare.draw(this.ctx)
    }   
}

class Flare {
    constructor(location) {
        this.location=location
        this.lifespan=20
    }
    draw(ctx){
        let val=Math.random()*150+40
        let alpha=Math.max(0, this.lifespan/20)
        this.color="rgba("+255+","+val+","+0+","+alpha+")"
        this.poly=generateRandomizedPolygon(this.location, 10, CANVAS_SIZE*0.2)

        ctx.beginPath()
        ctx.moveTo(...this.poly[0])
        for(let i=1; i<this.poly.length; i++){
            ctx.lineTo(...this.poly[i])
        }
        ctx.fillStyle=this.color
        ctx.fill()
        this.lifespan--
    }
}
