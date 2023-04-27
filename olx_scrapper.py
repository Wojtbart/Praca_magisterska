import requests
from bs4 import BeautifulSoup
from mysql.connector import MySQLConnection, Error
from python_mysql_dbconfig import read_db_config
import sys

def insert_record(cnx, arr):

    query = "INSERT INTO artykuly.artykuly_olx(Tytul, Link, Zdjecie, cena, stan, lokalizacja, obserwuj) " \
            "VALUES(%s,%s,%s,%s,%s,%s,%s)"
    # dodaje 1 null do koncowej kolumny tabeli
    arr.append(None)

    try:
        cursor = cnx.cursor()
        cursor.execute(query, arr)

        cnx.commit()
        print("Wykonany insert do bazy danych!")
    except Error as error:
        print("Błąd w funkcji insert!! ",error)
    finally:
        cursor.close()

def get_data_and_insert(cnx,phrase):

    URL = F"https://www.olx.pl/oferty/q-{phrase}/"

    page = requests.get(URL, headers = {
        'User-Agent': 'Popular browser\'s user-agent',
    })
    page_content = BeautifulSoup(page.content, "html.parser")

    results = page_content.find_all("div", {"data-cy":"l-card"})

    for a in results:
        arr=[]
        title = a.find_all("h6", {"class":"css-16v5mdi"})
        link = a.find_all("a", {"class":"css-rc5s2u"})
        price = a.find_all("p", {"data-testid":"ad-price"})
        img = a.find_all("img",{"class":"css-8wsg1m"})
        new=a.find_all("span",{"title":"Nowe"})
        used=a.find_all("span",{"title":"Używane"})
        location=a.find_all("p",{"data-testid":"location-date"})
        link_to_page=''

        for elem in title:
            arr.append(str(elem.string))

        for elem in link:
            link_to_page='https://www.olx.pl'+elem['href']
            arr.append('https://www.olx.pl'+elem['href'])

        if( not img):
            arr.append(None)
        else:
            for elem in img:
                if(elem['src']=='/app/static/media/no_thumbnail.15f456ec5.svg'):

                    # tutaj moglibyśmy wchodzić na stronę każdego produktu i pobierać zdjęcie, ale wtedy tracimy na czasie
                    # new_page = requests.get(link_to_page, headers = {
                    #     'User-Agent': 'Popular browser\'s user-agent',
                    # })
                    # new_page_content = BeautifulSoup(new_page.content, "html.parser")
                    # images = new_page_content.find_all("img", {"data-testid":"swiper-image"})

                    # for img in images:
                    #     arr.append(img['src'])
                    arr.append(None)
                else:
                    arr.append(elem['src'])

        if( not price ):
            arr.append(None)
        else:
            for elem in price:
                arr.append(str(elem.text))

        if( not used ):
            if( not new ):
                arr.append(None)
            else:
                for elem in new:
                    arr.append(str(elem.text))
        else:
            if( not used ):
                arr.append(None)
            else:
                for elem in used:
                    arr.append(str(elem.text))

        if( not location ):
            arr.append(None)
        else:
            for elem in location:
                arr.append(str(elem.text))

        insert_record(cnx,arr)

if __name__ == "__main__":
    db_config = read_db_config()
    cnx=None
    if len(sys.argv) <= 1 or len(sys.argv) >=3 :
        print("Podano niepoprawną ilość argumentów")
        sys.exit()
    else:
        phrase=sys.argv[1]   
    
    try:
        print('Łączenie się z bazą danych MySQL...')
        cnx = MySQLConnection(**db_config)
        if (cnx.is_connected()):
                print('Utworzono połączenie')
        else:
            print('Połączenie nie powiodło się')

        get_data_and_insert(cnx, phrase)

    except Error as e:
        print("Błąd podczas łaczenia się z  MySQL", e)
    finally:
        if (cnx is not None and cnx.is_connected()):
            cnx.close()
            print("Połączenie MySQL zostało zakończone")

