class FlyingBat extends Project {
    constructor(canvas) {
        super(canvas)

        canvas.style.background="black"

        this.drawFrame();
        this.showDisabled();

        this.time=0
    }

    drawFrame(){
        clearBackground(this.ctx)
        
        let amount=(Math.sin(this.time)+1)/2
        drawFlappyBat(this.ctx, [CANVAS_SIZE*0.5, CANVAS_SIZE*0.5], CANVAS_SIZE*0.6, 0, amount)
        // drawSpaceShip(this.ctx, [CANVAS_SIZE*0.5, CANVAS_SIZE*0.5], CANVAS_SIZE*0.12, Math.PI*0.5)

        this.time+=0.6
    }   
}

function drawFlappyBat(ctx, location, scaler, angle, amount){
    let points =[[486,500],[580,500]]
    
    let uPoints=
    [[366,500],[405,409],[383,356],
    [436,313],[424,261],[479,237],
    [486,185],[601,282],[484,537]]
        
    let dPoints= 
    [[366,500],[405,409],[383,356],
    [436,313],[424,261],[479,237],
    [486,185],[601,282],[484,537]]

    for (let i=0; i<dPoints.length; i++){
        dPoints[i][1]=CANVAS_SIZE-dPoints[i][1]
    }
    let wPoints = []
    for (let i=0; i<dPoints.length; i++){
        wPoints[i]=interpolate(uPoints[i], dPoints[i], amount)
    }

    ctx.save()
    normalizeArr(points)
    normalizeArr(wPoints)

    ctx.translate(...location)
    ctx.rotate(angle)
    scaleArr(points, scaler)
    scaleArr(wPoints, scaler)

    ctx.fillStyle="rgb(130,0,130)"
    
    ctx.beginPath()
    ctx.arc(...points[0], 0.13*scaler, 0, Math.PI*2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(...points[1], 0.08*scaler, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle="rgb(90,0,130)"

    ctx.beginPath()
    ctx.moveTo(...wPoints[0])
    ctx.quadraticCurveTo(...wPoints[1],...wPoints[2])
    ctx.quadraticCurveTo(...wPoints[3],...wPoints[4])
    ctx.quadraticCurveTo(...wPoints[5],...wPoints[6])
    ctx.quadraticCurveTo(...wPoints[7],...points[1])
    ctx.quadraticCurveTo(...wPoints[8],...wPoints[0])
    ctx.fill()

    ctx.restore()
}

function interpolate(p1, p2, amount){
    let newPoint=[]
    for(let i=0; i<p1.length; i++){
        newPoint[i]=p1[i]*(1-amount)+p2[i]*amount
    }
    return newPoint
}