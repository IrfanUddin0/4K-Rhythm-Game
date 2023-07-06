# 4-Key Rhythm Game
A 4k Rhythm Game, made this as an exercise for using React to make a game.

## TODO:
1. Map editor
2. Map downloader (from osu! beatmaps)
3. Difficulty algorithm
4. Search feature
5. Health/failing
6. Hold notes (maybe)

## Additional Notes
In the `./tools/` directory there is a python script that allows you to convert osu!mania maps to use in this game.

To do this, make a directory in the tools folder with the .osu files in there and then run:
### `python osu_mania_mapsetConverter.py [directory-name]`

Then add the out_map.json file somewhere in the `./public/` (e.g. in `./public/songs/` and add that path as an entry in maps.json located in `./public/songs/`

## Screenshots

![Menu](https://i.imgur.com/JDBDhtd.png)
![Top Scores](https://i.imgur.com/HV7nIov.png)
![Song Select](https://i.imgur.com/XLbeQMC.png)
![Gameplay](https://i.imgur.com/2Zp3xZa.png)
![Ranking Screen](https://i.imgur.com/2nnoKUO.png)
