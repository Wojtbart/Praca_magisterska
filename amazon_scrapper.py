import requests
from bs4 import BeautifulSoup
from mysql.connector import MySQLConnection, Error
from python_mysql_dbconfig import read_db_config
import sys

def insert_record(cnx, arr):

    query = "INSERT INTO artykuly.artykuly3(Tytul, Link, Zdjecie, Ocena, Ocena_w_gwiazdkach, Dostawa, Czy_darmowa_dostawa, Cena_oryginalna,\
          Cena_promocyjna, cena_bez_zl, ilosc_komentarzy, Ilosc_dostepnych) " \
            "VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    # dodaje 1 nulle do koncowej kolumnytabeli
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
    URL = F"https://www.amazon.pl/s?k={phrase}"

    page = requests.get(URL, headers = {
        'User-Agent': 'Popular browser\'s user-agent',
    })
    page_content = BeautifulSoup(page.content, "html.parser")

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
            informations=image_and_link.next_sibling

            # OBRAZ I LINK
            for child in image_and_link:
                for a in child.find_all("a"):
                    product_link=str("https://www.amazon.pl"+a['href'])
                for img in child.find_all("img"):
                    product_img=str(img['src'])

            # OCENY
            icons=div.find("i",{"class":"a-icon-star-small"})
            if icons:
                stars=icons.find("span",{"class":"a-icon-alt"})
                if stars:
                    product_stars=str(stars.text)[0:str(stars.text).find(',')+2]
                    product_stars_text=str(stars.text)


            for div in informations.find_all("div"):

                # MARKA
                # divs_brand=div.find_all("div",{"class":"a-row a-size-base a-color-secondary"})
                # if divs_brand:
                #     for item in divs_brand:
                #         brand=item.find("h5")
                #         if brand:
                #             # print(brand.find("span").text)
                #             arr.append(str(brand.find("span").text))

                # NAZWA I LINK
                name_and_link=div.find("h2")
                if name_and_link:
                    name_of_product=name_and_link.find("span")
                    product_name=str(name_of_product.text)
                
                # DOSTAWA DO DNIA
                delivery_divs=div.find_all("div",{"class":"a-row a-size-base a-color-secondary s-align-children-center"})

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

                # CENA
                price_divs=div.find_all("div",{"class":"a-row a-size-base a-color-base"})
                for item in price_divs:
                    price=item.find("span",{"class":"a-price-whole"})
                    if price:
                        price_fraction=item.find("span",{"class":"a-price-fraction"}).text
                        if price.text+price_fraction:
                            product_price=str(price.text+price_fraction).replace(u'\xa0', u' ')

                    # OBNIZKA
                    price_cut_divs=item.find("span",{"class":"a-text-price"})
                    if price_cut_divs:
                        price_cut=price_cut_divs.find("span",{"class":"a-offscreen"}).text

                        if price_cut:
                            product_price_cut=str(price_cut).replace(u'\xa0', u' ')
                            product_price_cut_without_symbol=str(price_cut)[0:str(price_cut).find(',')+3].replace(u'\xa0', u' ')


            # KOMENTARZE
            span_tags = div.select('span[aria-label]')
            for a in span_tags:
                number_of_comments=a.find("a", {"class": "a-link-normal"})
                if number_of_comments:
                    comment=number_of_comments.find('span').text
                    if comment:
                        product_comment=str(comment)

        print('------------------------------------------------')
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
            # print(arr)
            # print(len(arr))
        # if arr:
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

