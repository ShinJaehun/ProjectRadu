class EngineNoise extends Project {
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
            "Click for Engine noise", // ctx 이름 얻어내는 방법!!
            this.canvas.width/2,
            this.canvas.height*0.3)
    }

    click(location){
        playEngineSound(2)
    }
}

function playEngineSound(duration){
    var osc=AUDIO_CONTEXT.createOscillator()
    var osc2=AUDIO_CONTEXT.createOscillator()

    let volume=0.3
    var gainNode = AUDIO_CONTEXT.createGain()
    gainNode.gain.setValueAtTime(volume, AUDIO_CONTEXT.currentTime)

    osc.connect(gainNode)
    osc2.connect(gainNode)

    gainNode.connect(AUDIO_CONTEXT.destination)

    osc.frequency.value=100
    osc.type="sine"
    osc2.frequency.value=220
    osc2.type="sine"

    osc.start(AUDIO_CONTEXT.currentTime)
    osc.stop(AUDIO_CONTEXT.currentTime+duration)

    osc2.start(AUDIO_CONTEXT.currentTime)
    osc2.stop(AUDIO_CONTEXT.currentTime+duration)

    setTimeout(function(){
        osc.disconnect();
        osc2.disconnect();
    }, duration*1000)
}

