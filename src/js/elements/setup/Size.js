export default class Size {
    constructor() {
        if (!this.instance) {
            this.instance = this
            
            this.update()
        } else {
            return this.instance
        }
    }

    update() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.ratio = window.innerWidth / window.innerHeight 
    }
}