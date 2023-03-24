import requests
import json
from getpass import getpass
from mysql.connector import MySQLConnection, Error
from python_mysql_dbconfig import read_db_config
import urllib3
urllib3.disable_warnings()

CLIENT_ID = "9096efe8383644ee91a44d1de4c637f6"  # Client_ID aplikacji
CLIENT_SECRET = "mDwdm9XPlp0EElARDCOFkrTxbjZGG3x8dEb1tGC2MmEgSB6fWlKtOY9NmkuFQe1p" #Client_Secret aplikacji
TOKEN_URL = "https://allegro.pl.allegrosandbox.pl/auth/oauth/token"
#access_token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJhbGxlZ3JvOmFwaTpvcmRlcnM6cmVhZCIsImFsbGVncm86YXBpOnByb2ZpbGU6d3JpdGUiLCJhbGxlZ3JvOmFwaTpzYWxlOm9mZmVyczp3cml0ZSIsImFsbGVncm86YXBpOnNhbGU6c2V0dGluZ3M6d3JpdGUiLCJhbGxlZ3JvOmFwaTpwcm9maWxlOnJlYWQiLCJhbGxlZ3JvOmFwaTpyYXRpbmdzIiwiYWxsZWdybzphcGk6c2FsZTpzZXR0aW5nczpyZWFkIiwiYWxsZWdybzphcGk6ZGlzcHV0ZXMiLCJhbGxlZ3JvOmFwaTpzYWxlOm9mZmVyczpyZWFkIiwiYWxsZWdybzphcGk6b3JkZXJzOndyaXRlIl0sImFsbGVncm9fYXBpIjp0cnVlLCJleHAiOjE2NzcyMzUzNzgsImp0aSI6IjZhZWM5ODAyLWY5ODYtNGFjZS1hM2M1LWQ5MWY1OGRlMzFlZCIsImNsaWVudF9pZCI6IjkwOTZlZmU4MzgzNjQ0ZWU5MWE0NGQxZGU0YzYzN2Y2In0.dMwSLIb3Asn5Hcr5Z0y7s74YJasN9ogV2ll88SLnCaqyj7HSlV--qX9He_DGRUmAhHP4_nvL8M2ll_Rgw7evxezaQdk776SwNun-Wxjrq4gvb81EMl705kLs3ZeZTf9zdyeB-loyb5moC4sKI-_3igUvUjeDR4mbNzXcyKvsivxyP0-IyJxFCw5nzJ4kqhkki9SOYOGiqRyn6p7Pqg_BR_Nhzqbp1tpu31HOLP5EJm59GyNIFz61KdVt7BFCxXGftWQfbwY14nLtEZOoMCiu3yeoRaSen8Vd5kE7e12XmYxVdRATGSTnjdmXXLkbz928x9sc7K7Ea_mv8sOowUPoYBls2W-ENtCYaWQ0Pa8HiZfntO1lzH4etSLIglNCIjVWClrC7cCbMlsIv2xa1BdLJHS6ak_izupZmvkwasBGvPCsi7ft7Pw98Cr-sK2vi2I-Kf8EvrLp4EeTkyLrLH_Or0WcKFfadMRfdR6FOvmNzwEhIyG2x8TAEEdO4"

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

# def find_first_leaf(parent_id, token):
#     try:
#         url = "https://api.allegro.pl.allegrosandbox.pl/sale/categories"
#         headers = {'Authorization': 'Bearer ' + token, 'Accept': "application/vnd.allegro.public.v1+json"}
#         query = {'parent.id': parent_id}
#         categories_result = requests.get(url, headers=headers, params=query, verify=False)
#         categories = categories_result.json()
#         categories_list = categories['categories']
#         first_category = categories_list[0]
#         if first_category['leaf']:
#             return categories
#         else:
#             return find_first_leaf(first_category['id'], token)
#     except requests.exceptions.HTTPError as err:
#         raise SystemExit(err)
    

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

# def delete_duplicates(cnx):

#     query="""SELECT product_name, COUNT(product_name),
#     quantity, COUNT(quantity),
#     price_in_PLN, COUNT(price_in_PLN),
#     seller_name, COUNT(seller_name)
# FROM
#     artykuly_allegro
# GROUP BY 
#     product_name, 
#     quantity, 
# 	price_in_PLN,
#     seller_name
# HAVING 
#        (COUNT(product_name) > 1) AND 
#        (COUNT(quantity) > 1) AND 
#        (COUNT(price_in_PLN) > 1) AND
#        (COUNT(seller_name) > 1) """

#     try:
#         cursor = cnx.cursor()
#         cursor.execute(query)
#         databaseIds = cursor.fetchall()
#         print(databaseIds)

#         cnx.commit()
#     except Error as error:
#         print("Błąd przy funkcji ",error)
#     finally:
#         cursor.close()

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

            # json_formatted_str = json.dumps(object_list, indent=2,sort_keys=True)
            # print(json_formatted_str)

            get_data_and_insert(cnx, object_list,'promoted')

            get_data_and_insert(cnx, object_list,'regular')

            # delete_duplicates(cnx)

        except Error as e:
            print("Błąd podczas łaczenia się z  MySQL", e)
        finally:
            if (cnx is not None and cnx.is_connected()):
                cnx.close()
                print("Połączenie MySQL zostało zakończone")

    except requests.exceptions.HTTPError as err:
        raise SystemExit(err)

def main():
    access_token = get_access_token()
    find_offers( access_token, 'zetor 7245', 100)

if __name__ == "__main__":
    main()

# import numpy as np
import matplotlib.pyplot as plt
# #make this example reproducible.
# # np.random.seed(1)

# #create numpy array with 1000 values that follow normal dist with mean=10 and sd=2
# # data = np.array([13.24869073,  8.77648717,  8.9436565 ,  7.85406276, 11.73081526])
# data = np.random.normal(size=1000, loc=10, scale=2)


# #create histogram
# plt.hist(data, color='lightgreen', ec='black', bins=15)
# plt.savefig("mygraph.png")

# import pandas as pd
# df = pd.read_csv('rozklad_dla_9.txt')
# data = pd.read_csv('rozklad_dla_9.txt',sep='\s+',header=None)
# data = pd.DataFrame(data)

# x1 = df.loc[df.cut=='Ideal', 'depth']
# x2 = df.loc[df.cut=='Fair', 'depth']
# x3 = df.loc[df.cut=='Good', 'depth']

# kwargs = dict(alpha=0.5, bins=100)

# plt.hist(x1, **kwargs, color='g', label='Ideal')
# plt.hist(x2, **kwargs, color='b', label='Fair')
# plt.hist(x3, **kwargs, color='r', label='Good')
# plt.gca().set(title='Frequency Histogram of Diamond Depths', ylabel='Frequency')
# plt.xlim(50,75)
# plt.legend();

# import matplotlib.pyplot as plt
# x = data[0]
# y = data[1]
# z= data[2]

# plt.plot(x, z,'b--')
# plt.plot(x, y,'r--')

# # plt.show()
# plt.savefig("mygraph.png")

# # a = data[0]
# # b = data[2]
# # plt.plot(x, y,'r--')
# # # plt.show()
# # plt.savefig("mygraph2.png")

