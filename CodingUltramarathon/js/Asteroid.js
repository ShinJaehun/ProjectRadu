class Asteroid extends Project {
    constructor(canvas) {
        super(canvas)

        canvas.style.background="black"
        this.asteroid=new Rock([CANVAS_SIZE*0.5, CANVAS_SIZE*0.5])

        this.drawFrame();
        this.showDisabled();

    }

    drawFrame(){
        clearBackground(this.ctx)
        this.asteroid.draw(this.ctx)
    }   
}

class Rock {
    constructor (location, velocity) {
        this.velocity=velocity
        this.poly=generateRandomizedPolygon(location, 10, CANVAS_SIZE*0.2)
        let val=Math.floor(Math.random()*40+40)
        this.color="rgb("+val+","+val+","+val+")"
    }
    draw(ctx){
        ctx.beginPath()
        ctx.moveTo(...this.poly[0])
        for(let i=1; i<this.poly.length; i++){
            ctx.lineTo(...this.poly[i])
        }
        ctx.fillStyle=this.color
        ctx.fill()
    }
    update(){
        for(let i=0; i<this.poly.length; i++){
            this.poly[i]=add(this.poly[i], this.velocity)
        }
    }

    isOffScreen(){
        for(let i=0; i<this.poly.length; i++){
            if(this.poly[i][1]<CANVAS_SIZE){
                return false
            }
        }
        return true
    }
}

function generateRandomizedPolygon(location, sides, radius){
    let arr=[]
    let angle=0
    for (let i=0; i<sides; i++) {
        arr.push([
            location[0]+
            Math.cos(angle)*radius*Math.max(0.7, Math.random()),
            location[1]+
            Math.sin(angle)*radius*Math.max(0.7, Math.random())
        ])
        angle+=(Math.PI*2)/sides
    }
    return arr
}