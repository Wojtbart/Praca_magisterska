import requests
import json
from mysql.connector import MySQLConnection, Error
from python_mysql_dbconfig import read_db_config
import sys
import urllib3
urllib3.disable_warnings()

CLIENT_ID = "9096efe8383644ee91a44d1de4c637f6"  # Client_ID aplikacji
CLIENT_SECRET = "mDwdm9XPlp0EElARDCOFkrTxbjZGG3x8dEb1tGC2MmEgSB6fWlKtOY9NmkuFQe1p" #Client_Secret aplikacji
TOKEN_URL = "https://allegro.pl.allegrosandbox.pl/auth/oauth/token"

def get_access_token():
    try:
        data = {'grant_type': 'client_credentials'}
        access_token_response = requests.post(TOKEN_URL, data=data, verify=False, allow_redirects=False, auth=(CLIENT_ID, CLIENT_SECRET))
        tokens = json.loads(access_token_response.text)
        access_token = tokens['access_token']
        return access_token
    except requests.exceptions.HTTPError as err:
        raise SystemExit(err)

def get_main_categories(token):
    try:
        url = "https://api.allegro.pl.allegrosandbox.pl/sale/categories"
        headers = {'Authorization': 'Bearer ' + token, 'Accept': "application/vnd.allegro.public.v1+json"}
        main_categories_result = requests.get(url, headers=headers, verify=False)
        return main_categories_result
    except requests.exceptions.HTTPError as err:
        raise SystemExit(err)
   
def insert_record(cnx, product_name, image_link, has_promotion, quantity, price_in_PLN, popularity, delivery_in_PLN, seller_name):

    query = "INSERT INTO artykuly.artykuly_allegro(product_name,image_link,has_promotion, quantity, price_in_PLN, popularity, delivery_in_PLN, seller_name ) " \
            "VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
    args = (product_name,image_link,has_promotion, quantity, price_in_PLN, popularity, delivery_in_PLN, seller_name)

    try:
        cursor = cnx.cursor()
        cursor.execute(query, args)

        cnx.commit()
    except Error as error:
        print("Błąd przy funkcji insert!! ",error)
    finally:
        cursor.close()

def get_data_and_insert(cnx,object_list, key_name):
     for item in object_list[key_name]:
                if 'sellingMode' not in item :
                    item['sellingMode']=None
                if 'popularity' not in item['sellingMode'] :
                    item['sellingMode']['popularity']=None


                if  not item['images']:
                    item['images']=None  
                else:
                    for subitem in item['images']:
                        if 'url' in subitem :
                            item['images']=subitem['url']

                insert_record(cnx,item["name"],item["images"], item['promotion']['emphasized'], item["stock"]['available'], item['sellingMode']['price']['amount'],
                              item['sellingMode']['popularity'],item['delivery']['lowestPrice']['amount'], item["seller"]["login"])
                              
                print(item["name"], item["images"], item['promotion']['emphasized'], item["stock"]['available'], item["seller"]["login"],item['sellingMode']['popularity'],
                    item['sellingMode']['price']['amount'], item['delivery']['lowestPrice']['amount'])

def find_offers(token,phrase,limit):
    try:
        url = "https://api.allegro.pl.allegrosandbox.pl/offers/listing?phrase="f"{phrase}&fallback=false&limit="f"{limit}""&searchMode=DESCRIPTIONS"
        headers = {'Authorization': 'Bearer ' + token, 'Accept': "application/vnd.allegro.public.v1+json"}

        result = requests.get(url, headers=headers, verify=False)
        items = result.json()
        print(items)
        object_list = items['items']

        db_config = read_db_config()
        cnx=None

        try:

            print('Łączenie się z bazą danych MySQL...')
            cnx = MySQLConnection(**db_config)
            if (cnx.is_connected()):
                 print('Utworzono połączenie')
            else:
                print('Połączenie nie powiodło się')

            get_data_and_insert(cnx, object_list,'promoted')

            get_data_and_insert(cnx, object_list,'regular')


        except Error as e:
            print("Błąd podczas łaczenia się z  MySQL", e)
        finally:
            if (cnx is not None and cnx.is_connected()):
                cnx.close()
                print("Połączenie MySQL zostało zakończone")

    except requests.exceptions.HTTPError as err:
        raise SystemExit(err)   

if __name__ == "__main__":
    access_token = get_access_token()
    print(access_token)
    if len(sys.argv) <= 1 or len(sys.argv) >=3 :
        print("Podano niepoprawną ilość argumentów")
        sys.exit()
    else:
        phrase=sys.argv[1] 
    find_offers( access_token, phrase, 100)
