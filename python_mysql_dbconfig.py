from configparser import ConfigParser
import os

# tutaj sciezke muszę podawać na sztywno
# path=os.path.dirname(os.path.abspath(__file__))+'\config.ini' #WINDOWS
path=os.path.dirname(os.path.abspath(__file__))+'/config.ini' #LINUX

def read_db_config(filename=path, section='mysql'):

    parser = ConfigParser()
    parser.read(filename)

    db = {}
    if parser.has_section(section):
        items = parser.items(section)
        for item in items:
            db[item[0]] = item[1]
    else:
        raise Exception('{0} nie znaleziono w pliku {1} '.format(section, filename))

    return db