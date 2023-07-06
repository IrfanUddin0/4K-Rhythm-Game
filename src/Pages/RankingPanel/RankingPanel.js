import React from "react";
import { Scores } from "../../Game/Scores";
import { Link, Navigate } from "react-router-dom";
import MapBackground from "../../Components/MapBackground/MapBackground";

import './RankingPanel.css'
import { GameInstance } from "../../Game/GameInstance";

export const RankingPanel = () => {
    GameInstance.getInstance().getSongSelectionState().viewscore = false;
    var score = Scores.getRecentScore();

    if (!score) {
        return (<Navigate to="../SongSelect" />)
    }

    return (
        <div>
            <MapBackground />
            <div className="stat-side">
                <div className="song-title">
                    {score.song_title} - LVL {score.chart_no}
                </div>
                <div className="stage-clear-text">
                    STAGE CLEAR
                </div>
                <div className="ranking-score">
                    {score.score.toLocaleString()}
                </div>
                <div className="score-stats-row">
                    <div className="left">
                        Accuracy:
                    </div>
                    <div>
                        {score.accuracy}%
                    </div>
                </div>
                <div className="score-stats-row">
                    <div className="left">
                        Combo:
                    </div>
                    <div>
                        {score.combo === score.max_combo ? <div><span className="full-combo-text">FULL COMBO</span> {`x${score.combo}`} </div> : `${score.combo}/${score.max_combo}`}
                    </div>
                </div>
                <div className="score-stats-row">
                    <div className="perfect">
                        Perfect: {score.perfects}
                    </div>
                    <div className="good">
                        Good: {score.good}
                    </div>
                </div>
                <div className="score-stats-row">
                    <div className="ok">
                        Ok: {score.ok}
                    </div>
                    <div className="miss">
                        Miss: {score.miss}
                    </div>
                </div>
            </div>
            <div className="rank-section">
                <div className="ranking-text">RANK</div>
                <div className="ranking-letter">{Scores.calculateRanking(score)}</div>
            </div>
            <RankingPanelBackButton />
        </div>
    )
}

const RankingPanelBackButton = () => {
    return (
        <Link to={'../SongSelect'}>
            <div className="song-select-back-button">
                {'< '}Back
            </div>
        </Link>
    )
}