class Rain extends Project {
    constructor(canvas) {
        super(canvas)

        this.raindrops=this.generateRainDrops(200);

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
        clearBackground(this.ctx);

        for(let i=0; i<this.raindrops.length;i++){
            this.raindrops[i].update();
            this.raindrops[i].draw(this.ctx);
        }
    }

    generateRainDrops(N){
        let arr=[];
        for(let i=0;i<N;i++){
            arr.push(
                new RainDrop(
                    [Math.random()*CANVAS_SIZE,
                         Math.random()*CANVAS_SIZE])
            )
        }
        return arr;
    }
}

class RainDrop {
    constructor(location){
        this.location=location;
        this.oldLocation=location
        this.radius=Math.random()+1;// star between 2 and 4
        this.speed=Math.random()*50+50;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.lineWidth=this.radius;
        ctx.strokeStyle="rgba(100,100,100,0.3)";
        ctx.moveTo(...this.oldLocation);
        ctx.lineTo(...this.location);
        ctx.stroke();
    }
    update(){
        this.oldLocation=[
            this.location[0],
            this.location[1]
        ];

        this.location[1]+=this.speed;

        if (this.location[1]>CANVAS_SIZE) {
            this.location[1]-=CANVAS_SIZE;
            this.oldLocation[1]-=CANVAS_SIZE;
        }

    }
}