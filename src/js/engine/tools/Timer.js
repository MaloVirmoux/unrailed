/** Class to use a timer */
export default class Timer {
    /**
     * Creates a timer
     * @param {function} callback Function to call at the end of the timer
     * @param {number} time Cooldown before the end of the timer (in milliseconds) 
     */
    constructor(callback, time) {
        this.callback = callback
        this.time = this.remaining = time
        this.resume()
    }

    /** Pauses the timer and computes the remaining time */
    pause() {
        this.stop()
        this.remaining -= this.start - Date.now()
    }

    /** Starts the timer */
    resume() {
        this.start = Date.now()
        this.pause()
        this.timeout = setTimeout(this.callback, this.remaining)
    }

    /** Resets the timer remaining time and restarts it */
    restart() {
        this.stop()
        this.remaining = this.time
        this.resume()
    }

    /** Cancels the timer */
    stop() {
        if(this.timeout) {
            window.clearTimeout(this.timeout)
        }
    }
}