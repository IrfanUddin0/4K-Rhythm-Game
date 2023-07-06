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
        this.gameSettings = this.loadSettings();
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

    loadSettings(){
        var settings = localStorage.getItem("settings");
        if(!settings){
            var default_settings = {
                1: 'D',
                2: 'F',
                3: 'J',
                4: 'K',
                exit_key: 'ESCAPE',
                audio_scale: 0.3,
                scroll_speed: 3
            }
            localStorage.setItem("settings", JSON.stringify(default_settings));
            settings = localStorage.getItem("settings");
        }

        return JSON.parse(settings);
    }

    updateSettings(k1, k2, k3, k4, vol, scroll){
        var save = {
            1: k1,
            2: k2,
            3: k3,
            4: k4,
            exit_key: 'ESCAPE',
            audio_scale: vol,
            scroll_speed: scroll
        }

        localStorage.setItem("settings", JSON.stringify(save));
        this.gameSettings=save;

        if(this.getSongSelectionState()){
            this.getSongSelectionState().audio_ref_volume = save.audio_scale;
            this.getSongSelectionState().audio_ref.volume = save.audio_scale;
        }
    }
}