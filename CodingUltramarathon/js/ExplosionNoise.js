class ExplosionNoise extends Project {
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
            "Click for Explosion noise", 
            this.canvas.width/2,
            this.canvas.height*0.3)
    }

    click(location){
        playExplosionSound(1)
    }
}

function playExplosionSound(duration){
    var osc=AUDIO_CONTEXT.createOscillator()
    var osc2=AUDIO_CONTEXT.createOscillator()

    let volume=0.2
    var gainNode = AUDIO_CONTEXT.createGain()
    gainNode.gain.setValueAtTime(0, AUDIO_CONTEXT.currentTime)

    osc.connect(gainNode)
    osc2.connect(gainNode)

    gainNode.connect(AUDIO_CONTEXT.destination)

    osc.frequency.value=100
    osc.type="sawtooth"
    osc2.frequency.value=80
    osc2.type="sawtooth"


    gainNode.gain.exponentialRampToValueAtTime(volume, AUDIO_CONTEXT.currentTime+0.1)
    gainNode.gain.linearRampToValueAtTime(0.0001, AUDIO_CONTEXT.currentTime+duration)

    osc.start(AUDIO_CONTEXT.currentTime)
    osc.stop(AUDIO_CONTEXT.currentTime+duration)

    osc2.start(AUDIO_CONTEXT.currentTime)
    osc2.stop(AUDIO_CONTEXT.currentTime+duration)

    setTimeout(function(){
        osc.disconnect();
        osc2.disconnect();
    }, duration*1000)
}

