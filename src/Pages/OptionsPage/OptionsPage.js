import React from "react";
import MapBackground from "../../Components/MapBackground/MapBackground";
import { SongSelectBackButton } from "../SongSelect/SongSelect";

import './OptionsPage.css'
import { GameInstance } from "../../Game/GameInstance";

export class OptionsPage extends React.Component {
    updateGameSettings(){
        var k1 = document.getElementById('k1').value;
        var k2 = document.getElementById('k2').value;
        var k3 = document.getElementById('k3').value;
        var k4 = document.getElementById('k4').value;
        var vol = document.getElementById('vol_input_val').value / 100;
        var scroll = document.getElementById('scroll_input_val').value;
        GameInstance.getInstance().updateSettings(k1,k2,k3,k4,vol,scroll);
    }

    keyUpdate(event){
        document.getElementById(event.target.id).value = event.target.value[event.target.value.length-1].toUpperCase();
        this.updateGameSettings();
    }

    render() {
        return (
            <div className="options-page-frame">
                <MapBackground />
                <SongSelectBackButton />
                <div className="options-box-div">
                    <div>Options</div>
                    <div className="inner-options-box">
                        <div>Scroll Speed: <input id='scroll_input_val' type="number" min="1" max="10" onChange={this.updateGameSettings} defaultValue={GameInstance.getInstance().gameSettings.scroll_speed}/></div>
                        <div>Key1: <input id='k1' onChange={(event)=>this.keyUpdate(event)} defaultValue={GameInstance.getInstance().gameSettings[1]} /></div>
                        <div>Key2: <input id='k2' onChange={(event)=>this.keyUpdate(event)} defaultValue={GameInstance.getInstance().gameSettings[2]} /></div>
                        <div>Key3: <input id='k3' onChange={(event)=>this.keyUpdate(event)} defaultValue={GameInstance.getInstance().gameSettings[3]} /></div>
                        <div>Key4: <input id='k4' onChange={(event)=>this.keyUpdate(event)} defaultValue={GameInstance.getInstance().gameSettings[4]} /></div>
                        <div className="volume-bar">Volume: <input id='vol_input_val' type="range" min="0" max="100" onChange={this.updateGameSettings} defaultValue={GameInstance.getInstance().gameSettings.audio_scale*100}/>{GameInstance.getInstance().gameSettings.audio_scale}</div>
                    </div>
                </div>
            </div>
        )
    }
}