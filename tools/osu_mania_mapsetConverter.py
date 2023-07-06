# converts osu mania mapset to map json file
# pass dir containing .osu files to args
# CURRENTYLY DOES NOT SORT BY DIFFICULTY!

import sys,os,glob,json
import osu_mania_converter

def getMetadataValue(value_name, file_lines):
    for line in file_lines:
        if value_name in line:
            return line[line.find(':')+1:].replace("\n", '')
        
    return ""

def calculateBPM(file_lines):
    for i in range(0, len(file_lines)):
        if "[TimingPoints]" in file_lines[i]:
            return int(60000 / float(file_lines[i+1].split(",")[1]))
        
def main(args=sys.argv):
    if (len(args) != 2):
        print('only 1 arg requred')
        return

    if not os.path.isdir(args[1]):
        print("Not a dir")
        return

    files = glob.glob(args[1]+"/*.osu")

    files = sorted( files, key =  lambda x: os.stat(x).st_size)

    if (len(files) == 0):
        print("no .osu files")
        return

    json_out = {
        "song_title": "",
        "map_creator": "",
        "osu_link": "",
        "background_url": "",
        "audio_ref": "",
        "offset": 0,
        "bpm": 0,
        "charts": []
    }

    converted_maps = []
    for f in files:
        converted_maps.append(osu_mania_converter.parseMap(f))
        json_out["charts"].append(converted_maps[len(converted_maps)-1][0])
    
    metadatafile = open(files[0], 'r', encoding='utf-8', errors='ignore')
    metadatafile_lines = metadatafile.readlines();
    json_out["song_title"] = getMetadataValue('Artist', metadatafile_lines) + " - " + getMetadataValue('Title', metadatafile_lines)
    json_out["map_creator"] = getMetadataValue('Creator', metadatafile_lines)
    json_out["bpm"] = calculateBPM(metadatafile_lines)
    json_out["offset"] = converted_maps[0][1]
    
    
    json_object = json.dumps(json_out, indent=4)
    with open("out_map.json", "w") as outfile:
        outfile.write(json_object)

if __name__ == "__main__":
    main()
