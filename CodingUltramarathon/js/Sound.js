class Sound extends Project {
    constructor(canvas) {
        super(canvas)

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
            "Click for simple Sound", // ctx 이름 얻어내는 방법!!
            this.canvas.width/2,
            this.canvas.height*0.3)
    }

    click(location){
        playSound(400)
    }
}

function playSound(freq){
    var osc=AUDIO_CONTEXT.createOscillator()
    osc.connect(AUDIO_CONTEXT.destination)
    osc.frequency.value=freq
    osc.type="sine"

    let duration=1
    osc.start(AUDIO_CONTEXT.currentTime)
    osc.stop(AUDIO_CONTEXT.currentTime+duration)

    setTimeout(function(){
        osc.disconnect();
    }, duration*1000)
}