import React from "react";
import "./MainMenu.css";

import MapBackground from "../../Components/MapBackground/MapBackground";
import { Link } from "react-router-dom";
import { SongPlayer } from "../../Components/SongPlayer/SongPlayer";
// eslint-disable-next-line
import { GameInstance } from "../../Game/GameInstance";
// eslint-disable-next-line
import { Gameplay } from "../../Game/Gameplay";

export class MainMenuPage extends React.Component{    
    render(){
        return (
            <div className="main-menu-page-frame">
                <MapBackground />
                <Sidebar />
                <SongPlayer className={"main-menu-song-player"}/>
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