class Buttons extends Project {
    constructor(canvas) {
        super(canvas)

        this.buttons=[]
        this.colorMap=[]

        this.text = "Press the buttons!"

		this.tmpCanvas = document.createElement('canvas');
		this.tmpCanvas.width = CANVAS_SIZE;
		this.tmpCanvas.height = CANVAS_SIZE;
		this.tmpCtx = this.tmpCanvas.getContext("2d")

        this.freq=[
            523.251,
            587.33,
            659.255,
            698.456,
            783.991,
            880,
            987.767,
            1046.502
        ]

        for (let i=0; i<this.freq.length; i++){
            let location=[
                CANVAS_SIZE*0.2+
                CANVAS_SIZE*0.6*i/(this.freq.length-1),
                CANVAS_SIZE*0.65
            ]
            // let poly=generatePolygon(location, 4, 100)
            // let poly=generatePolygon(
            //     location, 
            //     Math.round(Math.random()*6+3),
            //     100)
            let poly=generatePolygon(location, 4, CANVAS_SIZE*0.05)

            this.buttons.push(new Button(
                poly,
                this.ctx,
                this.tmpCtx,
                "B"+(i+1)))
            this.buttons[this.buttons.length-1]["freq"]=this.freq[i]
            this.colorMap[
                this.buttons[this.buttons.length-1].color
            ] = this.buttons[this.buttons.length-1]
        }

        // this.buttons.push(new Button(
        //     [CANVAS_SIZE*0.5, CANVAS_SIZE*0.5], this.ctx
        // ))
        // this.buttons[this.buttons.length-1]["freq"]=400
        // this.colorMap[
        //     this.buttons[this.buttons.length-1].color
        // ] = this.buttons[this.buttons.length-1]

        // this.buttons.push(new Button(
        //     [CANVAS_SIZE*0.7, CANVAS_SIZE*0.7], this.ctx
        // ))
        // this.buttons[this.buttons.length-1]["freq"]=700
        // this.colorMap[
        //     this.buttons[this.buttons.length-1].color
        // ] = this.buttons[this.buttons.length-1]

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
        drawDarkBackground(this.ctx);

        this.ctx.font = "10vh Comic Sans MS"
        this.ctx.fillStyle ="orange"
        this.ctx.textAlign ="center"
        this.ctx.textBaseline ="middle"
        this.ctx.fillText(
            this.text,
            this.canvas.width/2,
            this.canvas.height*0.3)

        for (let i=0; i<this.buttons.length; i++){
            this.buttons[i].draw()
        }
    }

    click(location){
        // playNote()
        const imgData= this.tmpCtx.getImageData(location[0],location[1],1,1)
        // console.log(imgData.data)
        let col=getColorFromImageData(imgData.data)
        // console.log(this.colorMap[col])
        let btn = this.colorMap[col]
        if(btn!=null){
            this.text = btn.name+" was pressed"
            // playNote(btn.freq)
        }
        
        //which button and play the note with freq
    }
}

class Button {
    constructor(poly, ctx, tmpCtx, name) {
        this.ctx=ctx
        this.tmpCtx = tmpCtx
        this.name = name
        // this.location=location
        // this.poly = generatePolygon(location, 4, 100)
        this.poly=poly
        this.color=getRandomColor()
    }
    draw(){
        this.ctx.fillStyle="white"
        if (this.wbColor!=null) {
            this.ctx.fillStyle=this.wbColor
        }

        this.ctx.beginPath()
        this.ctx.moveTo(...this.poly[0])
        for(let i=1; i< this.poly.length; i++) {
            this.ctx.lineTo(...this.poly[i])
        }
        this.ctx.fill()

        this.ctx.font = "6vh Arial"
        this.ctx.fillStyle ="black"
        this.ctx.textAlign ="center"
        this.ctx.textBaseline ="middle"

        let location = average(this.poly)
        this.ctx.fillText(
            this.name,
            location[0],
            location[1])

        this.tmpCtx.fillStyle=this.color
        this.tmpCtx.beginPath()
        this.tmpCtx.moveTo(...this.poly[0])
        for(let i=1; i< this.poly.length; i++) {
            this.tmpCtx.lineTo(...this.poly[i])
        }
        this.tmpCtx.fill()
    }
}

function generatePolygon(location, sides, radius){
    let arr=[]
    let angle=0
    for (let i=0; i<sides; i++) {
        arr.push([
            location[0]+Math.cos(angle)*radius,
            location[1]+Math.sin(angle)*radius
        ])
        angle+=(Math.PI*2)/sides
    }
    return arr
}

function getRandomColor(){
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return "rgb("+r+","+g+","+b+")"
}

function getColorFromImageData(data) {
    const r = data[0]
    const g = data[1]
    const b = data[2]
    return "rgb("+r+","+g+","+b+")"
}