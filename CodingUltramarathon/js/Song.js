class Song extends Project {
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
    
        let location=[
            CANVAS_SIZE*0.5,
            CANVAS_SIZE*0.7
        ]

        let poly=generatePolygon(location, 4, CANVAS_SIZE*0.08)

        this.buttons.push(new Button(poly, this.ctx, this.tmpCtx, "PLAY"))

        this.colorMap[
            this.buttons[this.buttons.length-1].color
        ] = this.buttons[this.buttons.length-1]

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
        drawDarkBackground(this.ctx);

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
            playSong(this.freq)
        }
        
        //which button and play the note with freq
    }
}

function playSong(freq){
    playNote(freq[0], 0)
    playNote(freq[2], 0.5)
    playNote(freq[4], 1)
    playNote(freq[7], 1.5)
    playNote(freq[4], 2.0)
    playNote(freq[2], 2.5)
    playNote(freq[0], 3.0)
}

