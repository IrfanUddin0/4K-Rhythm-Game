import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import { GameplayPage } from './Pages/GameplayPage/GameplayPage';
import { MainMenuPage } from './Pages/MainMenu/MainMenu';
import { SongSelect } from './Pages/SongSelect/SongSelect';
import { RankingPanel } from './Pages/RankingPanel/RankingPanel';
import { ScoresPage } from './Pages/ScoresPage/ScoresPage';
import { OptionsPage } from './Pages/OptionsPage/OptionsPage';

export default function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigate to='Main'/>}/>
            <Route path='Main' element={<MainMenuPage/>}/>
            <Route path='SongSelect' element={<SongSelect/>}/>
            <Route path='Game' element={<GameplayPage/>}/>
            <Route path='Ranking' element={<RankingPanel/>}/>
            <Route path='Scores' element={<ScoresPage/>}/>
            <Route path='Options' element={<OptionsPage/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}