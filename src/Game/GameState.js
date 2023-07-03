export class GameState {
    constructor(){
        console.log("initalized game state:", this.constructor.name)
        this.active = false;
    }
    onBeginPlay() { }
    onUpdate() { }
    destroy() {}
}