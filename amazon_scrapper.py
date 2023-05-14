import requests
from bs4 import BeautifulSoup, NavigableString, Tag
import bs4
from mysql.connector import MySQLConnection, Error
from python_mysql_dbconfig import read_db_config
import sys

COUNTER=0

def insert_record(cnx, arr):
    global COUNTER
    query = "INSERT INTO artykuly.artykuly3(Tytul, Link, Zdjecie, Ocena, Ocena_w_gwiazdkach, Dostawa, Czy_darmowa_dostawa, Cena_oryginalna,\
          Cena_promocyjna, cena_bez_zl, ilosc_komentarzy, Ilosc_dostepnych) " \
            "VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    # dodaje 1 nulle do koncowej kolumnytabeli
    arr.append(None)

    try:
        cursor = cnx.cursor()
        cursor.execute(query, arr)

        cnx.commit()
        COUNTER+=1
    except Error as error:
        print("Błąd w funkcji insert!! ",error)
    finally:
        cursor.close()

def get_data_and_insert(cnx,phrase):

    phrase_to_list = phrase.split()
    final_phrase=''

    if len(phrase_to_list)>1:
        final_phrase="+".join(str(x) for x in phrase_to_list)
    else:
        final_phrase=''.join(phrase_to_list)

    URL = F"https://www.amazon.pl/s?k={final_phrase}"

    page = requests.get(URL, headers = {
        'User-Agent': ('Mozilla/5.0 (X11; Linux x86_64)'
                    'AppleWebKit/537.36 (KHTML, like Gecko)'
                    'Chrome/44.0.2403.157 Safari/537.36'),
        'Accept-Language': 'en-US, en;q=0.5'
    })
    page_content = BeautifulSoup(page.content, "html.parser")

    not_found_result=page_content.findAll(text='Spróbuj wpisać mniej lub użyć poniższych słów kluczowych')

    if not_found_result:
        print("Nic nie znaleziono")
    else:
        results = page_content.find_all("div",{"class":"s-result-item"})

        for html_tag in results:
            arr=[]
            product_link=None
            product_name=None
            product_img=None
            product_stars_text=None
            product_stars=None
            product_delivery_to_day=None
            product_free_delivery=None
            product_price=None
            product_price_cut=None
            product_price_cut_without_symbol=None
            product_comment=None

            for div in html_tag.find_all('div',{"class":"s-card-container"}): # tu jest wszystko

                divs=div.find('div',{"class": "a-section"}) # div z informacjami i zdjeciem
                image_and_link=divs.find("div",{"class":"s-product-image-container"})
                informations=image_and_link.next_sibling #informacje o produkcie

                # OBRAZ I LINK
                for child in image_and_link:
                    link=child.find("a")
                    if( link!=-1 ):
                        if link and link.has_attr('href'):

                            product_link=str('https://www.amazon.pl'+str(link['href']))
                            img=link.find("img")
                            product_img=str(img['src'])


                # OCENY
                icons=div.find("i",{"class":"a-icon-star-small"})
                if icons:
                    stars=icons.find("span",{"class":"a-icon-alt"})
                    if stars:
                        product_stars=str(stars.text)[0:str(stars.text).find(',')+2]
                        product_stars_text=str(stars.text)


                if informations:

                    # NAZWA PRODUKTU
                    divs_informations=informations.find("div")
                    
                    if( divs_informations!=-1 ):
                        for div in divs_informations:
                            name_of_product=div.find("span",{"class":"a-text-normal"})
                            if name_of_product:
                                product_name=str(name_of_product.text)

                    # POZOSTAŁE INFORMACJE
                    if type(informations) is not bs4.element.NavigableString:
                        div_price=informations.find("div",{"class":"s-price-instructions-style"})
                        if div_price:
                            for item in div_price:
                                for elem in item:
                                    if type(elem) is not bs4.element.NavigableString:
                                        price=elem.find("span",{"class":"a-price-whole"})
                                        price_fraction=elem.find("span",{"class":"a-price-fraction"})

                                        if price_fraction and price:
                                            product_price=str(price.text+price_fraction.string).replace(u'\xa0', u' ')

                                # OBNIZKA
                                price_cut_divs=item.find("span",{"class":"a-text-price"})
                                if price_cut_divs:
                                    price_cut=price_cut_divs.find("span",{"class":"a-offscreen"}).text

                                    if price_cut:
                                        product_price_cut=str(price_cut).replace(u'\xa0', u' ')
                                        product_price_cut_without_symbol=str(price_cut)[0:str(price_cut).find(',')+3].replace(u'\xa0', u' ')
                            
                        # DOSTAWA DO DNIA
                            delivery_divs=div_price.next_sibling
                            if delivery_divs:
                                for div in delivery_divs:
                                    delivery_next_divs=div.find_all("div",{"class": "s-align-children-center"})
                                    for element in delivery_next_divs:
                                        for delivery in element.find_all("span"):
                                            if delivery.has_attr('aria-label'):
                                                if delivery['aria-label']:
                                                    product_delivery_to_day=str(delivery['aria-label'])

                                        # DARMOWA DOSTAWA
                                        free_delivery=element.next_sibling
                                        if free_delivery:
                                            for span in free_delivery.find_all("span"):
                                                if span.has_attr('aria-label'):
                                                    if span['aria-label']:
                                                        product_free_delivery=str(span['aria-label'])

                            # KOMENTARZE
                            div_price_previous_sibling=div_price.previous_sibling
                            span_tags = div_price_previous_sibling.select('span[aria-label]')

                            for a in span_tags:
                                number_of_comments=a.find("a", {"class": "a-link-normal"})
                                if number_of_comments:
                                    comment=number_of_comments.find('span').text
                                    if comment:
                                        product_comment=str(comment)

            arr.append(product_name)
            arr.append(product_link)
            arr.append(product_img)
            arr.append(product_stars)
            arr.append(product_stars_text)
            arr.append(product_delivery_to_day)
            arr.append(product_free_delivery)
            arr.append(product_price_cut)
            arr.append(product_price)
            arr.append(product_price_cut_without_symbol)
            arr.append(product_comment)
            if  not all(elem is None for elem in arr):
                insert_record(cnx,arr)
            

if __name__ == "__main__":

    print("Wykonujemy skrypt amazon_scrapper.py")

    phrase=''
    db_config = read_db_config()
    cnx=None
    if len(sys.argv) <= 1 or len(sys.argv) >=3 :
        print("Podano niepoprawną ilość argumentów")
        sys.exit()
    else:
        n = len(sys.argv)
        for i in range(1, n):
            phrase+=sys.argv[i]    
    
    try:
        cnx = MySQLConnection(**db_config)
        if (cnx.is_connected()):
                print('Utworzono polaczenie z baza danych!')
        else:
            print('Połączenie nie powiodlo sie')

        get_data_and_insert(cnx, phrase)
        print("Liczba rekordow:",COUNTER)

    except Error as e:
        print("Błąd podczas łaczenia się z  MySQL", e)
    finally:
        if (cnx is not None and cnx.is_connected()):
            cnx.close()
            print("Polaczenie z MySQL zostalo zaonczone!")