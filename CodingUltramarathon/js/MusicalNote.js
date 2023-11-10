class MusicalNote extends Project {
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
            "Click for piano Sound", // ctx 이름 얻어내는 방법!!
            this.canvas.width/2,
            this.canvas.height*0.3)
    }

    click(location){
        playNote(700)
    }
}

function playNote(freq, delay){
    if (delay==null) {
        delay=0
    }
    var osc=AUDIO_CONTEXT.createOscillator()
    var gainNode = AUDIO_CONTEXT.createGain()

    gainNode.gain.setValueAtTime(0, AUDIO_CONTEXT.currentTime)

    osc.connect(gainNode)
    gainNode.connect(AUDIO_CONTEXT.destination)

    osc.frequency.value=freq
    osc.type="triangle"

    let duration=1
    osc.start(AUDIO_CONTEXT.currentTime+delay)
    osc.stop(AUDIO_CONTEXT.currentTime+duration+delay)

    gainNode.gain.linearRampToValueAtTime(1,
        AUDIO_CONTEXT.currentTime+0.1+delay)
    gainNode.gain.linearRampToValueAtTime(0.5,
        AUDIO_CONTEXT.currentTime+0.2+delay)
    gainNode.gain.exponentialRampToValueAtTime(0.001,
        AUDIO_CONTEXT.currentTime+duration+delay)

    setTimeout(function(){
        osc.disconnect();
    }, (duration+delay)*1000)
}