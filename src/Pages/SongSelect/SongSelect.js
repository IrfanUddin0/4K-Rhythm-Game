import React, { useEffect } from "react";
import "./SongSelect.css";
import { Link, Navigate } from "react-router-dom";

import MapBackground from "../../Components/MapBackground/MapBackground";
import { SongPlayer } from "../../Components/SongPlayer/SongPlayer";

import { song_data } from "../../Game/songs/song_data";
import { GameInstance } from "../../Game/GameInstance";
import { Gameplay } from "../../Game/Gameplay";
import { Scores } from "../../Game/Scores";

export const SongSelect = () => {
    if(!GameInstance.getInstance().getSongSelectionState()){
        window.location.reload();
    }

    if(GameInstance.getInstance().getSongSelectionState().viewscore){
        return (<Navigate to="../Ranking" />)
    }

    return (
        <div className="song-select-frame">
            <MapBackground />
            <SongSelectBackButton />
            <SongPlayer className={"song-select-song-player"} />
            <div className="song-select-scrollbox">
                {song_data.map((element, index) => {
                    return element === GameInstance.getInstance().currentSong ? (<SongSelectCard map={element} active={true} key={(element, index)}/>) : (<SongSelectCard map={element} key={(element, index)}/>)
                })}
            </div>
            <MapDetailsSongSelect/>
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

class MapDetailsSongSelect extends React.Component{
    constructor(props){
        super(props);
        this.diff = 0;
        this.map = GameInstance.getInstance().currentSong;
    }

    render(){
        if(GameInstance.getInstance().currentSong!==this.map){
            this.diff=0;
            this.map=GameInstance.getInstance().currentSong;
        }
        return(
            <div className="map-details-song-select">
                <div className="black-bg map-details-section">
                    <p className="song-title">
                        {GameInstance.getInstance().currentSong["song_title"]}
                    </p>
                    <p className="song-details">
                        mapper: {GameInstance.getInstance().currentSong["map_creator"]}
                    </p>
                    <Link to="../Game" style={{padding: '5%'}}>
                        <button className="start-button" onClick={()=>{ GameInstance.getInstance().setGameState(new Gameplay(this.diff)) }}>
                            START!
                        </button>
                    </Link>
                </div>
                <div className="black-bg diff-selection">
                    {
                        GameInstance.getInstance().currentSong.charts.map((elem,index)=>{
                            return <button className={`diff-button ${index===this.diff? 'diff-button-active':''}`} onClick={()=>{this.diff=index;}} key={(elem,index)}>LVL {index}</button>
                        })
                    }
                </div>
                <div className="best-score-text">
                    Best Score
                </div>
                <div className="best-score-row">
                    <div>
                        Score <div className="actual-score-text">{Scores.getHighScoreForCurrentSong(this.diff)[0].toLocaleString()}</div>
                    </div>
                    <div>
                        Combo  <div className="actual-score-text">{Scores.getHighScoreForCurrentSong(this.diff)[1].toLocaleString()}</div>
                    </div>
                </div>
            </div>
        )
    }
}