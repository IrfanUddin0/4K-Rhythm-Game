#converts osu mania map to chart objects for the game
import sys, os, pyperclip, math

def parseMap(path):
    def parseObjects(file):
        out = []
        for line in file:
            splited = line.split(",")
            if(len(splited)!=6):
                return None
            
            converted_split = []
            for i in range (len(splited)-1):
                try:
                    converted_split.append(int(splited[i]))
                except Exception as e:
                    return None
            
            pos = max(min(math.floor((converted_split[0]*4)/512) + 1, 4), 1)
            time = converted_split[2]
        
            out.append([pos, time])

        return out

    file = open(path, 'r', encoding='utf-8', errors='ignore')
    lines = file.readlines()

    offset = 0
    for i in range(len(lines)):
        if "[TimingPoints]" in lines[i] and len(lines)>i:
            try:
                offset = int(lines[i+1].split(",")[0])
            except Exception as e:
                return None
            
        if "[HitObjects]" in lines[i]:
            if(i==len(lines)):
                return None
            objects = parseObjects(lines[i+1:])
            for obj in objects:
                obj[1] = obj[1] - offset

            return [objects, offset]
    
    return None


def main(args = sys.argv):
    if(len(args)!=2):
        print('only 1 arg requred')
        return
    
    if not os.path.isfile(args[1]):
        print("Not a file")
        return
    
    map = parseMap(args[1])
    
    if(map==None):
        print("parsing error")
        return
    
    print(str(map[0]).replace('], ', '],\n'))
    pyperclip.copy(str(map[0]).replace('], ', '],\n'))
    print("copied to clipboard! offset:",map[1])


if __name__ == "__main__":
    main()