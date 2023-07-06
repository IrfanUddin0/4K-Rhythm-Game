import { GameInstance } from "./GameInstance";

export class Scores {
    static init() {
        const scores = localStorage.getItem("scores");

        if (!scores) {
            Scores.resetScoreSave();
        }
    }

    static getRecentScore() {
        var recent_score = JSON.parse(localStorage.getItem("scores"))["scores"];
        recent_score = recent_score[recent_score.length - 1];
        return recent_score;
    }

    static saveScore(song, chart_no, accuracy, score, perfects, good, ok, miss, combo, max_combo) {
        var new_score = {
            "song_title": song["song_title"],
            "map_creator": song["map_creator"],
            "background_url": song["background_url"],
            "chart_no": chart_no,
            "accuracy": accuracy,
            "score": score,
            "perfects": perfects,
            "good": good,
            "ok": ok,
            "miss": miss,
            "combo": combo,
            "max_combo": max_combo
        }

        var new_scores = JSON.parse(localStorage.getItem("scores"));
        new_scores["scores"].push(new_score);
        localStorage.setItem("scores", JSON.stringify(new_scores));
    }

    static resetScoreSave() {
        var base_json = { "scores": [] };
        localStorage.setItem("scores", JSON.stringify(base_json));
    }

    static getHighScoreForCurrentSong(chart_no){
        var song = GameInstance.getInstance().currentSong;
        var scores = JSON.parse(localStorage.getItem("scores"))["scores"];

        var map_scores = [];

        scores.forEach(score => {
            if(score["song_title"]===song["song_title"] && score["map_creator"]===song["map_creator"] && score["chart_no"]===chart_no){
                map_scores.push(score);
            }
        });

        var highest_score = [0,0];
        map_scores.forEach(elem => {
            if(elem["score"] >= highest_score[0]){
                highest_score = [elem["score"], elem["combo"]];
            }
        })

        return highest_score;
    }

    static getScoresSorted(){
        var scores = JSON.parse(localStorage.getItem("scores"))["scores"];
        
        for (var i = 0; i < scores.length; i++) { 
            for (var j = 0; j < (scores.length - i - 1); j++) {
                if (scores[j]["score"] < scores[j + 1]["score"]) {
                    var temp = scores[j];
                    scores[j] = scores[j + 1];
                    scores[j + 1] = temp;
                }
            }
        }

        var unique = [];
        var isInUnique = (elem, arr) => {
            for (let i = 0; i < arr.length; i++) {
                if(arr[i]["song_title"]===elem["song_title"]
                && arr[i]["map_creator"]===elem["map_creator"]
                && arr[i]["chart_no"]===elem["chart_no"]){
                    return true;
                }
            }

            return false;
        }

        scores.forEach((elem) => {
            if(!isInUnique(elem, unique)){
                unique.push(elem);
            }
        })

        return unique;
    }

    static calculateRanking(score){
        var acc = score.accuracy;
        if (acc >= 100) { acc = 'SS' }
        else if (acc >= 95) { acc = 'S' }
        else if (acc >= 90) { acc = 'A' }
        else if (acc >= 85) { acc = 'B' }
        else if (acc >= 75) { acc = 'C' }
        else { acc = 'D' }

        return acc;
    }
}