class Whiteboard extends Project {
    constructor(canvas) {
        super(canvas)

        this.mouse={
            oldLocation: [0, 0],
            location: [0, 0],
            pressed: false,
            moved: false
        }

        this.colors=[
            "black",
            "gray",
            "red"
        ]

        this.selectedColor = "black"

        this.buttons=[]
        this.colorMap=[]
        
		this.btnCanvas = document.createElement('canvas');
		this.btnCanvas.width = CANVAS_SIZE;
		this.btnCanvas.height = CANVAS_SIZE;
		this.btnCtx = this.btnCanvas.getContext("2d")

        
        for (let i=0; i<this.colors.length; i++){
            let location=[
                CANVAS_SIZE*0.3+
                CANVAS_SIZE*0.4*(i/(this.colors.length-1)),
                CANVAS_SIZE*0.8
            ]

            let poly=generatePolygon(location, 4, CANVAS_SIZE*0.08)

            this.buttons.push(new Button(poly, this.ctx, this.btnCtx, ""))
            this.buttons[this.buttons.length-1]["wbColor"]=this.colors[i]
            this.colorMap[
                this.buttons[this.buttons.length-1].color
            ] = this.buttons[this.buttons.length-1]
        }

        this.tmpCanvas = document.createElement('canvas');
		this.tmpCanvas.width = CANVAS_SIZE;
		this.tmpCanvas.height = CANVAS_SIZE;
		this.tmpCtx = this.tmpCanvas.getContext("2d")

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
        clearBackground(this.ctx)

        const imgData = this.tmpCtx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE)
        this.ctx.putImageData(imgData, 0, 0)
        
        for (let i=0; i<this.buttons.length; i++){
            this.buttons[i].draw()
        }
    }
    
    move(location){
        if (this.mouse.pressed == true) {
            this.tmpCtx.lineWidth=5
            this.tmpCtx.strokeStyle=this.selectedColor
            this.tmpCtx.beginPath()
            this.tmpCtx.moveTo(...this.mouse.oldLocation)
            this.tmpCtx.lineTo(...this.mouse.location)
            this.tmpCtx.stroke()

            this.mouse.moved = true

        }
        
        this.mouse.oldLocation = this.mouse.location
        this.mouse.location = location
    }
    
    down(location){
        this.mouse.oldLocation = location
        this.mouse.location = location
        this.mouse.pressed = true
        this.mouse.moved = false
    }
    
    up(location){
        this.mouse.pressed = false
        if (this.mouse.moved==false) {
            DEBUG_ARR.push(location)
        }
        this.mouse.moved = false

        

    }

    
    click(location){
        const imgData= this.btnCtx.getImageData(location[0],location[1],1,1)
        let col=getColorFromImageData(imgData.data)
        let btn = this.colorMap[col]
        if(btn!=null){
            this.changeColor(btn.wbColor)
        }
        
        //which button and play the note with freq
    }

    changeColor(newColor) {
        this.selectedColor = newColor
    }

}

var DEBUG_ARR=[]
