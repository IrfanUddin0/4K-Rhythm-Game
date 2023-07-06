import React from "react";
import "./GameplayPage.css";

import MapBackground from '../../Components/MapBackground/MapBackground'
import { GameInstance } from "../../Game/GameInstance";

import { Navigate } from "react-router-dom";

export const GameplayPage = () => {
    if (!GameInstance.getInstance().getGameplayState()) {
        return (<Navigate to="../SongSelect" />)
    }

    return (
        <div className="gameplay-frame">
            <MapBackground />
            <div className={GameInstance.getInstance().getGameplayState().isKeyDown(GameInstance.getInstance().gameSettings[1]) ? 'gameplay-note-line-keydown' : 'gameplay-note-line'} id="line-1">
                {drawGameplayNotes(1)}
                <p className="gameplay-note-line-keyname">{GameInstance.getInstance().gameSettings[1]}</p>
            </div>
            <div className={GameInstance.getInstance().getGameplayState().isKeyDown(GameInstance.getInstance().gameSettings[2]) ? 'gameplay-note-line-keydown' : 'gameplay-note-line'} id="line-2">
                {drawGameplayNotes(2)}
                <p className="gameplay-note-line-keyname">{GameInstance.getInstance().gameSettings[2]}</p>
            </div>
            <div className={GameInstance.getInstance().getGameplayState().isKeyDown(GameInstance.getInstance().gameSettings[3]) ? 'gameplay-note-line-keydown' : 'gameplay-note-line'} id="line-3">
                {drawGameplayNotes(3)}
                <p className="gameplay-note-line-keyname">{GameInstance.getInstance().gameSettings[3]}</p>
            </div>
            <div className={GameInstance.getInstance().getGameplayState().isKeyDown(GameInstance.getInstance().gameSettings[4]) ? 'gameplay-note-line-keydown' : 'gameplay-note-line'} id="line-4">
                {drawGameplayNotes(4)}
                <p className="gameplay-note-line-keyname">{GameInstance.getInstance().gameSettings[4]}</p>
            </div>

            <p className="score-top-text">
                {GameInstance.getInstance().getGameplayState().calculateCurrentScoreMillion().toLocaleString()}
            </p>

            <p className="ranking-top-text">{GameInstance.getInstance().getGameplayState().calculateRanking()}</p>

            <p className="accuracy-text">
                {GameInstance.getInstance().getGameplayState().calculateAccuracy()}%
            </p>
            {GameInstance.getInstance().getGameplayState().display_text.map((element, index) => {
                return (
                    <p className="hit-score-text" style={{ opacity: 1 - element.getElapsedTime() / 500 }} key={(element, index)}>
                        {element.text}
                    </p>)
            })}
            <p className="misscount-top-text">
                {GameInstance.getInstance().getGameplayState().getMissCount()}x miss
            </p>
            <p className="combo-text">
                {GameInstance.getInstance().getGameplayState().currentCombo === 0 ? '' : `x ${GameInstance.getInstance().getGameplayState().currentCombo}`}
            </p>
        </div>
    );
};

function drawGameplayNotes(pos) {
    return GameInstance.getInstance().getGameplayState().getObjectsToDraw().map((element, index) => {
        if (element.pos === pos && element.state === 'normal') {
            return <div className="gameplay-note"
                style={{
                    bottom: 0.15 * window.innerHeight -
                        (GameInstance.getInstance().getGameplayState().getElapsedTime() - GameInstance.getInstance().currentSong["offset"] - element.time)
                        / GameInstance.getInstance().gameSettings.scroll_speed
                }}
                key={(element, index)}>

            </div>
        }
        return null
    })
}