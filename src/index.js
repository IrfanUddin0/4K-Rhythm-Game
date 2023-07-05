import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';

import { GameInstance } from './Game/GameInstance';
import { SongSelection } from './Game/SongSelection';
import { load_song_data } from './Game/songs/song_data'
import { Scores } from './Game/Scores';

const TICK_SPEED_MS = 8;

const root = ReactDOM.createRoot(document.getElementById('root'));

function InitGame() {
    load_song_data();
    Scores.init();
    GameInstance.init();
    GameInstance.getInstance().setGameState(new SongSelection());
}

function UpdateTick() {
    GameInstance.getInstance().onUpdate();

    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

InitGame();
setInterval(UpdateTick, TICK_SPEED_MS);