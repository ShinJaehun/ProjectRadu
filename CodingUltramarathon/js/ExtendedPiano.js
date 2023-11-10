class ExtendedPiano extends Project {
    constructor(canvas) {
        super(canvas)

        this.buttons=[]
        this.colorMap=[]

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

        for (let i=1; i<=7; i++) {
            this.freq.push(this.freq[i]*2)
        }

        this.noteNames=[
            "DO",
            "RE",
            "MI",
            "FA",
            "SOL",
            "LA",
            "SI",
            "DO2",
            "RE2",
            "MI2",
            "FA2",
            "SOL2",
            "LA2",
            "SI2",
            "DO3"
        ]
    
        for (let i=0; i<this.freq.length; i++){
            let location=[
                CANVAS_SIZE*0.1+
                CANVAS_SIZE*0.8*i/(this.freq.length-1),
                CANVAS_SIZE*0.65+(i%3)*CANVAS_SIZE*0.12
            ]

            let poly=generatePolygon(location, 4, CANVAS_SIZE*0.08)


            this.buttons.push(new Button(poly, this.ctx, this.tmpCtx, this.noteNames[i]))
            this.buttons[this.buttons.length-1]["freq"]=this.freq[i]
            this.colorMap[
                this.buttons[this.buttons.length-1].color
            ] = this.buttons[this.buttons.length-1]
        }

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
            "It's an Extended Piano!",
            this.canvas.width/2,
            this.canvas.height*0.3)

        for (let i=0; i<this.buttons.length; i++){
            this.buttons[i].draw()
        }
    }

    click(location){
        // playNote()
        const imgData= this.tmpCtx.getImageData(location[0],location[1],1,1)
        let col=getColorFromImageData(imgData.data)
        let btn = this.colorMap[col]
        if(btn!=null){
            playNote(btn.freq)
        }
        
        //which button and play the note with freq
    }
}
