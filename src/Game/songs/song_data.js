import $ from "jquery";

export var song_data = [];

export function load_song_data() {
    $.ajax({
        url: './songs/maps.json',
        async: false,
        dataType: 'json',
        success: function (response) {
            response["maps"].forEach(element => {
                $.ajax({
                    url: element["url"],
                    async: false,
                    dataType: 'json',
                    success: function (map) {
                        song_data.push(map)
                    }
                });
            });
        }
    });
}