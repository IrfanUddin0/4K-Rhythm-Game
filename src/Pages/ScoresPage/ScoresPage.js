import React from "react"
import MapBackground from "../../Components/MapBackground/MapBackground"

import { SongSelectBackButton } from "../SongSelect/SongSelect"

import './ScoresPage.css'
import { Scores } from "../../Game/Scores"


export class ScoresPage extends React.Component{
    constructor(props){
        super(props);
        this.scores = Scores.getScoresSorted();
    }

    render(){
        return (
            <div className="scores-page-frame">
                <MapBackground/>
                <SongSelectBackButton/>
                <div className="all-scores-frame">
                    {this.scores.map((score,index)=>{
                        return(
                            <div className="score-card" key={(score,index)}>
                                <div className="ranking-letter">
                                    {Scores.calculateRanking(score)}
                                </div>
                                <div className="score-details">
                                    <div className="song-name">
                                        {score.song_title} - LVL {score.chart_no}
                                    </div>
                                    <div className="acc">{score.accuracy}%</div>
                                    <div>{score.combo}/{score.max_combo} {score.combo===score.max_combo?'(FC)':''}</div>
                                    <div>Perfect: {score.perfects}, Good: {score.good}, Ok: {score.ok}, Miss: {score.miss}</div>
                                </div>
                                <div className="score-text">
                                    {score.score.toLocaleString()}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}