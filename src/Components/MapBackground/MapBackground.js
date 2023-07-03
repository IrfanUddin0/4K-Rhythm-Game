import React from "react";

import './MapBackground.css'
import { GameInstance } from "../../Game/GameInstance";

var saved_coords = {
    x: 0,
    y: 0
}

export default class MapBackground extends React.Component{
    constructor(props){
        super(props);
        this.state = {coords: saved_coords};
    }

    componentDidMount(){
        window.addEventListener("mousemove", (event) => {this.setState({event: event});this.mouseMoved()});
    }

    mouseMoved(){
        if(this.state.event){
            saved_coords = {x: this.state.event.clientX, y: this.state.event.clientY};
            this.setState({coords: saved_coords});
        }
    }

    render(){
        return(
            <img className="map-bg-img" src={GameInstance.getInstance().currentSong ? GameInstance.getInstance().currentSong.background_url : ''} alt="background" style={{right:(this.state.coords.x - window.innerWidth)/1000 + 50 + '%', top:(this.state.coords.y- window.innerHeight)/1000 + 50 + '%'}}/>
        )
    }
}