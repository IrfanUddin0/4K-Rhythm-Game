import React from "react";
import "./MainMenu.css";

import MapBackground from "../../Components/MapBackground/MapBackground";
import { Link } from "react-router-dom";
import { SongPlayer } from "../../Components/SongPlayer/SongPlayer";
import { Scores } from "../../Game/Scores";

export class MainMenuPage extends React.Component {
    render() {
        return (
            <div className="main-menu-page-frame">
                <MapBackground />
                <Sidebar />
                <TopScores />
                <SongPlayer className={"main-menu-song-player"} />
            </div>
        )
    }
}

const Sidebar = () => {
    return (
        <div className="main-menu-sidebar">
            <SidebarButton img="UI/play-icon.png" alt="Play" link="/SongSelect" />
            <SidebarButton img="UI/scores-icon.png" alt="Scores" link="/Scores" />
            <SidebarButton img="UI/settings-icon.png" alt="Options" link="/Options" />
        </div>
    )
}

const SidebarButton = (props) => {
    return (
        <Link className="main-menu-sidebar-buttons" to={props.link}>
            <img src={props.img} alt={props.alt} />
        </Link>
    )
}

class TopScores extends React.Component {
    constructor(props) {
        super(props);
        this.top_scores = Scores.getScoresSorted().slice(0, 5);
    }

    render() {
        return (
            <div className="top-scores-main-menu">
                <p className="top-scores-title-text">Your Top Scores:</p>
                {this.top_scores.map((elem, index) => {
                    return (
                        <div className="top-score-card" key={(elem, index)}>
                            <div className="score-number">
                                #{index+1}
                            </div>
                            <div>
                                <div className="song-name-wrapper">
                                    <div className="song-name" scrollamount="2" scrolldelay="0">{elem["song_title"]} - LVL {elem["chart_no"]}</div>
                                </div>
                                
                                <div className="score-numbers"><div>{elem["score"]}</div> <div>x{elem["combo"]}</div></div>
                            </div>
                            <div className="ranking-letter">
                                {Scores.calculateRanking(elem)}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}