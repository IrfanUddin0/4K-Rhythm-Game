import { GameState } from "./GameState";
import { Gameplay } from "./Gameplay";
import { SongSelection } from "./SongSelection";

export class GameInstance {
    static instance;
    static init() {
        GameInstance.instance = new GameInstance();
    }
    static getInstance() {
        return GameInstance.instance;
    }

    constructor(){
        this.gameState = null;
        this.currentSong = SongSelection.getRandomSong();
        this.gameSettings = {
            1: 'D',
            2: 'F',
            3: 'J',
            4: 'K',
            exit_key: 'ESCAPE',
            audio_scale: 0.3,
            scroll_speed: 1
        }
    }

    onUpdate() {
        if(this.gameState){
            this.gameState.onUpdate();
        }
    }

    setGameState(state) {
        if(this.gameState){
            this.gameState.destroy();
        }
        if(state instanceof GameState){
            this.gameState = state;
            this.gameState.onBeginPlay();
            return state;
        }
        return null;
    }

    // returns gameplay state if in gameplay otherwise returns null
    getGameplayState() {
        if(this.gameState instanceof Gameplay) {
            return this.gameState;
        }
        return null;
    }

    getSongSelectionState(){
        if(this.gameState instanceof SongSelection) {
            return this.gameState;
        }   
    }

    playAudio(audio_){
        var audio_ref = new Audio(audio_);
        audio_ref.volume = this.gameSettings.audio_scale;
        audio_ref.play();
        return audio_ref;
    }
}