class RetroTV extends Project {
    constructor(canvas) {
        super(canvas)

        this.raindrops=this.generateRainDrops(200);

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
        drawDarkBackground(this.ctx);

        for(let i=0; i<this.raindrops.length;i++){
            this.raindrops[i].update();
            if(this.raindrops[i].location[1]<
                this.raindrops[i].oldLocation[1])
            this.raindrops[i].draw(this.ctx);
        }
    }

    generateRainDrops(N){
        let arr=[];
        for(let i=0;i<N;i++){
            arr.push(
                new RetroLine(
                    [Math.random()*CANVAS_SIZE,
                         Math.random()*CANVAS_SIZE])
            )
        }
        return arr;
    }
}

class RetroLine {
    constructor(location){
        this.location=location;
        this.oldLocation=location
        this.radius=Math.random()+1;// star between 2 and 4
        this.speed=Math.random()*5+10;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.lineWidth=this.radius;
        ctx.strokeStyle="white";
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
            this.location[1]=0;
        }
        if (this.location[0]>CANVAS_SIZE) {
            this.location[0]=0;
        }
        if (this.location[0]<0) {
            this.location[0]=CANVAS_SIZE;
        }
    }
}