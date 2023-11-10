class SpaceShip extends Project {
    constructor(canvas) {
        super(canvas)

        canvas.style.background="black"

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
        clearBackground(this.ctx)
        
        drawSpaceShip(this.ctx, [CANVAS_SIZE*0.5, CANVAS_SIZE*0.5], CANVAS_SIZE*0.12, 0)
        // drawSpaceShip(this.ctx, [CANVAS_SIZE*0.5, CANVAS_SIZE*0.5], CANVAS_SIZE*0.12, Math.PI*0.5)

    }   
}

function drawSpaceShip(ctx, location, scaler, angle){
    // space ship
    let points =[[500,206],[346,252],[346,579],[654,579],[654,252]]
    
    let qPoints=[[500,361],[250,720],[492,542],[750,720]]

    ctx.save()
    normalizeArr(points)
    normalizeArr(qPoints)

    ctx.translate(...location)
    ctx.rotate(angle)
    scaleArr(points, scaler)
    scaleArr(qPoints, scaler)

    ctx.fillStyle="lightblue"

    ctx.beginPath()
    ctx.moveTo(...points[0])
    ctx.quadraticCurveTo(...points[1],...points[2])
    ctx.lineTo(...points[3])
    ctx.quadraticCurveTo(...points[4],...points[0])
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(...qPoints[0])
    ctx.lineTo(...qPoints[1])
    ctx.quadraticCurveTo(...qPoints[2],...qPoints[3])
    ctx.lineTo(...qPoints[0])
    ctx.fill()

    ctx.restore()
}

function normalizeArr(arr){
    for(let i=0; i<arr.length; i++){
        arr[i][0]-=CANVAS_SIZE*0.5 // 왜 *0.5를 하니까 딱 중간인거야??
        arr[i][1]-=CANVAS_SIZE*0.5
        arr[i][0]/=CANVAS_SIZE*0.5
        arr[i][1]/=CANVAS_SIZE*0.5
    }
}

function scaleArr(arr, value) {
    for(let i=0; i<arr.length; i++) {
        arr[i]=scale(arr[i], value)
    }
}

function scale(vector, value){
    let newVector=[]
    for(let i=0; i<vector.length; i++){
        newVector[i] = vector[i]*value
    }
    return newVector
}