import React from "react";
import "./SongPlayer.css";
import { GameInstance } from "../../Game/GameInstance";

export const SongPlayer = ({ className }) => {
    return (
        <div className={`np-container ${className}`} style={{ backgroundImage: `url(${GameInstance.getInstance().currentSong["background_url"]})` }}>
            <div className="nowplaying-control-buttons">
                <img src="UI/play-prev.svg" alt="prev" onClick={function () { GameInstance.getInstance().getSongSelectionState().prevSong() }} />
                <img src="UI/play-pause.svg" alt="pause/unpause" onClick={function () { GameInstance.getInstance().getSongSelectionState().pauseUnpauseSong() }} />
                <img src="UI/play-next.svg" alt="next" onClick={function () { GameInstance.getInstance().getSongSelectionState().nextSong() }} />
            </div>
            <p className="nowplaying-text">{GameInstance.getInstance().currentSong["song_title"]}</p>
            <div className="nowplaying-bar" style={{
                background: `linear-gradient(90deg, white
                ${GameInstance.getInstance().getSongSelectionState().getSongProgressPercent()}%, gray ${GameInstance.getInstance().getSongSelectionState().getSongProgressPercent()}%)`
            }} />
        </div>
    );
};