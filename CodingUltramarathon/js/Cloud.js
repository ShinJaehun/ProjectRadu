class Cloud extends Project {
    constructor(canvas) {
        super(canvas)

        this.cloudParts=this.generateCloudParts(100);

        this.drawFrame();
        this.showDisabled();
    }

    generateCloudParts(N){
        let arr=[]
        for(let i=0; i<N; i++){
            let x = CANVAS_SIZE*0.25+Math.random()*CANVAS_SIZE*0.5;
            let y = CANVAS_SIZE/2 - Math.random()*Math.sin(
                Math.PI*4*
                (x-CANVAS_SIZE*0.25)/CANVAS_SIZE*0.5)*
                CANVAS_SIZE*0.2
                // 대체 이게 뭔 소린지 모르겠는데
                // 어쨌든 sin 곡선을 정규화했다네...

            arr.push(new CloudPart([x,y]))
        }
        return arr
    }
    drawFrame(){

        drawColoredBackground(this.ctx, "rgb(10,100,255)");
        // this.ctx.globalCompositeOperation = "lighter";

        for(let i=0; i<this.cloudParts.length;i++){
            this.cloudParts[i].draw(this.ctx);

        }
        // this.ctx.globalCompositeOperation = "source-over";
    }
}

class CloudPart {
    constructor(location){
        this.location=location;
        this.radius=70;
    }

    draw(ctx){
        ctx.beginPath();
        // ctx.fillStyle="rgba(255,"+this.green+",0,"+(1-this.step/this.lifespan)+")";
        // ctx.fillStyle="rgba(255,"+this.green+",0,"+"0.3"+")";
        // ctx.fillStyle="rgba(255,"+this.green+",0,"+(1-this.step/this.lifespan)*0.5+")";

        var gradient = ctx.createRadialGradient(
            this.location[0],
            this.location[1],
            0,
            this.location[0],
            this.location[1],
            this.radius);
        
        ctx.fillStyle=gradient;

        // Add three color stops
        gradient.addColorStop(0, "rgba(255,255,255,0.5)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.arc(this.location[0], this.location[1], this.radius, 0, Math.PI*2);
        ctx.fill();
    }
    update(){
    

    }
}