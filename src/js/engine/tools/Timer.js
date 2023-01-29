export default class Timer {
    constructor(callback, time) {
        this.callback = callback
        this.time = this.remaining = time
        this.resume()
    }

    pause() {
        this.stop()
        this.remaining -= this.start - Date.now()
    }

    resume() {
        this.start = Date.now()
        this.pause()
        this.timeout = setTimeout(this.callback, this.remaining)
    }

    restart() {
        this.stop()
        this.remaining = this.time
        this.resume()
    }

    stop() {
        if(this.timeout) {
            window.clearTimeout(this.timeout)
        }
    }
}