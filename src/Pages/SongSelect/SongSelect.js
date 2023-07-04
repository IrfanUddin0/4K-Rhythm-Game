import React from "react";
import "./SongSelect.css";
import { Link } from "react-router-dom";

import MapBackground from "../../Components/MapBackground/MapBackground";
import { SongPlayer } from "../../Components/SongPlayer/SongPlayer";

import { song_data } from "../../Game/songs/song_data";
import { GameInstance } from "../../Game/GameInstance";
import { Gameplay } from "../../Game/Gameplay";

export const SongSelect = () => {
    return (
        <div className="song-select-frame">
            <MapBackground />
            <SongSelectBackButton />
            <SongPlayer className={"song-select-song-player"} />
            <div className="song-select-scrollbox">
                {song_data.map(element => {
                    return element === GameInstance.getInstance().currentSong ? (<SongSelectCard map={element} active={true} />) : (<SongSelectCard map={element} />)
                })}
            </div>
            {GameInstance.getInstance().currentSong.charts.map((element, index) => {
                return (
                    <Link to="../Game" style={{ position: 'relative' }}>
                        <button onClick={function () { GameInstance.getInstance().setGameState(new Gameplay(index)) }}>{index}</button>
                    </Link>
                )
            })}
        </div>
    )
}

const SongSelectBackButton = () => {
    return (
        <Link to={'../Main'}>
            <div className="song-select-back-button">
                {'< '}Back
            </div>
        </Link>
    )
}

const SongSelectCard = (props) => {
    return (
        <div className={`song-select-card-frame ${props.active ? '' : 'inactive-frame'}`} style={{ backgroundImage: `url(${props.map["background_url"]})` }}
            onClick={props.active ? function () { } : function () { GameInstance.getInstance().getSongSelectionState().AddSong(props.map) }}>
            <div className="inner-content">
                <div />
                <p className={`song-title ${props.active ? 'active-text-selection' : ''}`}>
                    {props.map["song_title"]}
                </p>
                <div />
                <div className="song-details-row">
                    <p className={`song-details ${props.active ? 'active-text-selection' : ''}`}>
                        {'mapper: ' + props.map["map_creator"]}
                    </p>
                    <p className={`song-details ${props.active ? 'active-text-selection' : ''}`}>
                        {'difficulties: ' + props.map["charts"].length}
                    </p>
                </div>
                <div />
                <div />
            </div>
        </div>
    )
}