class Bat extends Project {
    constructor(canvas) {
        super(canvas)

        canvas.style.background="black"

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
        clearBackground(this.ctx)
        
        drawBat(this.ctx, [CANVAS_SIZE*0.5, CANVAS_SIZE*0.5], CANVAS_SIZE*0.6, 0)
        // drawSpaceShip(this.ctx, [CANVAS_SIZE*0.5, CANVAS_SIZE*0.5], CANVAS_SIZE*0.12, Math.PI*0.5)

    }   
}

function drawBat(ctx, location, scaler, angle){
    let points =[[486,500],[580,500]]
    
    let wPoints=
    [[366,500],[405,409],[383,356],
    [436,313],[424,261],[479,237],
    [486,185],[601,282],[484,537]]

    ctx.save()
    normalizeArr(points)
    normalizeArr(wPoints)

    ctx.translate(...location)
    ctx.rotate(angle)
    scaleArr(points, scaler)
    scaleArr(wPoints, scaler)

    ctx.fillStyle="rgb(100,0,100)"
    
    ctx.beginPath()
    ctx.arc(...points[0], 0.13*scaler, 0, Math.PI*2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(...points[1], 0.08*scaler, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle="rgb(60,0,100)"

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
