import requests
from bs4 import BeautifulSoup
from mysql.connector import MySQLConnection, Error
from python_mysql_dbconfig import read_db_config
import sys

def insert_record(cnx, arr):

    query = "INSERT INTO artykuly.artykuly_pepper(Tytul, Link, Cena_oryginalna, Obnizka_w_procentach, Cena_promocyjna, Dostawa, Zdjecie, Opis,\
          uzytkownik_wystawiajacy, ilosc_komentarzy, ilosc_glosow_za_produktem, Czy_promocja_trwa, Opublikowano,\
           Kupony_promocyjne, Firma_sprzedajaca, avatar) " \
            "VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    # dodaje 3 nulle do koncowych kolumn tabeli
    arr.append(None)
    arr.append(None)
    arr.append(None)
    # print (arr)
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
    URL = F"https://www.pepper.pl/search?q={phrase}"

    page = requests.get(URL, headers = {
        'User-Agent': 'Popular browser\'s user-agent',
    })
    page_content = BeautifulSoup(page.content, "html.parser")

    results = page_content.find_all("article")
    
    for html_tag in results:
        arr=[]

        for elem in html_tag.find_all("div", {"class": "threadGrid-title"}):

            for a in elem.find_all("a", {"class":"thread-title--list"}):
                arr.append(a['title'])
                arr.append(a['href'])

            price_before=elem.find_all("span", {"class":"mute--text text--lineThrough size--all-l size--fromW3-xl"})
            if( not price_before ):
                arr.append(None)
            else:
                for span in price_before:
                    arr.append(str(span.string))

            reduction=elem.find_all("span", {"class":"space--ml-1 size--all-l size--fromW3-xl"})
            if( not reduction):
                arr.append(None)
            else:
                for span in reduction:
                    arr.append(str(span.string))

            original_price=elem.find_all("span", {"class":"thread-price"})
            if( not original_price):
                arr.append(None)
            else:
                for span in original_price:
                    arr.append(str(span.string)) # cena oryginalna

            delivery=elem.find_all("svg", {"class":"icon icon--truck"})
            if( not delivery):
                arr.append(None)
            else:
                for svg in delivery:
                    arr.append(str(svg.find_next('span').contents[0].string.strip()))
            
        for elem in html_tag.find_all("div", {"class": "threadGrid-image"}):
            for span in elem.find_all("span", {"class":"thread-listImgCell"}):
                for img in span.find_all("img"):
                    arr.append(img['src'])


        for elem in html_tag.find_all("div", {"class":"threadGrid-body"}):
            for div in elem.find("div", {"class":"userHtml userHtml-content"}):
                arr.append(str(div.string.strip()))
        
        for elem in html_tag.find_all("div", {"class":"threadGrid-footerMeta"}):

            publisher_div= elem.find("div", {"class":"footerMeta"}).findAll("img")
            comments= elem.find("div", {"class":"footerMeta"}).findAll("svg",{"class" : "icon--comments"})

            for span in publisher_div:
                publisher=span.find_next('span').contents[0]
                arr.append(str(publisher.strip()))

            for svg in comments:
                comment=svg.find_next('span').contents[0]
                arr.append(str(comment.strip()))
        
        for elem in html_tag.find_all("div", {"class":"threadGrid-headerMeta"}):
            for div in elem.find_all("div", {"class":"vote-box"}):
                arr.append(str(div.find_next('span').contents[0].string.strip()))

            promotion_go_on=elem.find_all("span", {"class":"cept-show-expired-threads"})
            if( not promotion_go_on ):
                arr.append(None)
            else:
                for span in promotion_go_on: 
                    arr.append(str(span.string))

            for svg in elem.find_all("svg", {"class":"icon--clock"}):
                arr.append(str(svg.find_next('span').contents[0].string.strip()))

        insert_record(cnx,arr)

if __name__ == "__main__":
    print("Wykonujemy skrypt pepper.py")

    db_config = read_db_config()
    cnx=None
    if len(sys.argv) <= 1 or len(sys.argv) >=3 :
        print("Podano niepoprawną ilość argumentów")
        sys.exit()
    else:
        phrase=sys.argv[1]   
    
    try:
        print('Laczenie sie z baza danych MySQL...')
        cnx = MySQLConnection(**db_config)
        if (cnx.is_connected()):
                print('Utworzono polaczenie')
        else:
            print('Polaczenie nie powiodlo sie')

        get_data_and_insert(cnx, phrase)


    except Error as e:
        print("Blad podczas laczenia sie z  MySQL", e)
    finally:
        if (cnx is not None and cnx.is_connected()):
            cnx.close()
            print("Polaczenie MySQL zostalo zakonczone")
    print("Skrypt pepper.py zakonczony")
