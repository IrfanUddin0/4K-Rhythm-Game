import { GameInstance } from "./GameInstance";
import { GameState } from "./GameState";

import { song_data } from "./songs/song_data";

export class SongSelection extends GameState {
    constructor(viewscore=false) {
        super();
        this.viewscore=viewscore;
        this.song_history = [];
        this.paused = false;

        this.audio_ref = new Audio();
        this.audio_ref.volume = GameInstance.getInstance().gameSettings.audio_scale;
        this.audio_ref.loop = true;
    }

    onBeginPlay() {
        if(GameInstance.getInstance().currentSong){
            this.AddSong(GameInstance.getInstance().currentSong);
        }
    }

    onUpdate() {

    }

    destroy() {
        this.audio_ref.pause();
    }

    pauseUnpauseSong() {
        this.paused = !this.paused;
        if(this.paused){
            this.audio_ref.pause();
        }
        else{
            this.audio_ref.play();
        }
    }

    AddSong(song) {
        if(this.audio_ref){this.audio_ref.pause()}
        
        this.song_history.push(song);
        this.audio_ref.setAttribute('src',song["audio_ref"]);
        this.audio_ref.play();

        GameInstance.getInstance().currentSong = song;
    }

    nextSong() {
        this.AddSong(SongSelection.getRandomSong());
    }

    prevSong() {
        if(this.song_history.length>=2){
            this.song_history.pop();
            this.AddSong(this.song_history.pop());
        }
    }

    getSongProgressPercent(){
        return (this.audio_ref.currentTime / this.audio_ref.duration) * 100;
    }

    skipToPercent(percent){
        percent = percent <= 0 
        ? 0 
        : percent >= 1 
          ? 1 
          : percent;

        this.audio_ref.currentTime = percent * this.audio_ref.duration;
    }

    static getRandomSong(){
        if (song_data.length===0){
            return null;
        }
        return song_data[Math.floor(Math.random()*(song_data.length))];
    }
}