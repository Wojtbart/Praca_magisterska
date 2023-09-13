# Praca magisterska - Mikroserwisowa platforma powiadomień o ofertach sprzedażowych

**I. Cel pracy:**

Celem pracy jest przedstawienie problematyki mechanizmów wysyłających
powiadomienia do użytkowników w czasie, w jakim oni sami sobie ustalą.
Aplikacja oparta na architekturze mikroserwisowej pobiera dane z różnych
serwisów sprzedażowych tj. OLX , Amazon , Allegro czy Pepper, na
podstawie frazy wpisanej przez użytkownika oraz liczby odpowiedzi, jakie
ma zwrócić aplikacja. Następnie szuka najnowszych ofert danego produktu
i wysyła powiadomienie typu SMS, E-mail, informacje do serwisu Discord
lub na bieżąco wyświetla informacje w zależności od konfiguracji
użytkownika.

II\.

**a) Zrealizowane funkcjonalności:**

1\. Możliwość rejestracji i zalogowania się do serwisu - gdy użytkownik
poda swoje dane to będą one zapisywane w bazie MySQL .

2\. Możliwość konfiguracji poszczególnych opcji, czyli wybrania polityk
"szukania na bieżąco" aktualnych ofert sprzedażowych lub konfiguracji
powiadomień i wysyłania ich o określonym czasie.

3\. Możliwość wpisania konkretnej frazy oraz ilości żądanych zapytań w
celu uzyskania ofert dotyczących wpisanej frazy.

4\. Wyświetlanie ofert dotyczących wybranych serwisów oraz wysłanie
powiadomień w określonej godzinie lub co określony przez użytkownika
czas.

**b)Planowana rozbudowa funkcjonalności:**

\- dodanie większej liczby serwisów, z których dane będą pobierane oraz
usług, do których wiadomości te będą przesyłane.

\- planowany jest podział platformy na działy takie jak motoryzacja
(szukanie samochodów), budownictwo (szukanie domów na wynajem i na
sprzedaż), praca (oferty pracy) i wiele innych

\- dodanie nowych serwisów, do których można przesyłać wiadomości w
postaci Twittera czy Telegrama .

-dodanie przycisku, dzięki któremu w łatwy sposób będzie można usunąć
zadanie cyklicznego wysyłania wiadomości

-dodanie panelu powitalnego, w którym, będzie można wybrać opcję
rejestracji lub logowania (aktualnie jako pierwszy ekran wyświetla się
ekran logowania)

\- dołączenie dodatkowych workerów , dzięki którym można byłoby ustawić
wiele zadań powiadamiania użytkownika.

\- dodanie szablonów, w których użytkownicy będą mogli specyfikować
wygląd powiadomień.

-dodanie filtrów wyszukiwania w panelu głównym

**Ograniczenia pracy:**

\- pobieranie wiadomości z serwisu Allegro działa tylko dla środowiska
testowego i komunikuje się z API Allegro

\- Wysłanie wiadomości SMS jest możliwe tylko na mój prywatny numer
telefonu, gdyż występują ograniczenia ze strony platformy Twilio
(wysyłanie na inne numery telefonów jest płatne), numer telefonu jest
brany z pliku config.ini, w którym są przechowywane hasła do bazy
danych, różne tokeny oraz dane do poczty wysyłającej i klucze do API
Allegro

-wysyłanie wiadomości do serwisu Discord -\> najpierw użytkownik
musiałby stworzyć sobie taki serwer w serwisie Discord, a następnie
podać wygenerowany przez serwer token oraz id kanału , na który powyższa
aplikacja miałaby wysłać wiadomość (aktualnie token oraz id kanału brane
są z pliku config.ini), istnieje pomysł aby w przyszłości w konfiguracji
podać pola do zapisu token oraz id kanału

III\.

**a) Technologie wykorzystane w aplikacji serwerowej:**

\-**Node.js** -\> działa jako serwer przetwarzający wszystkie zapytania,
zwracający odpowiedzi oraz włączający skrypty napisane w języku Python;
wykorzystane biblioteki Node.js:

\--**Express.js** - wykorzystana do zbudowania interfejsu API

\--**Sequelize** - narzędzie do mapowania obiektowo-relacyjnego ( ORM )
Node.js dla MySQL .

\--**node-cron** - prosty harmonogram zadań podobny do crona dla Node.js
od wysyłania cyklicznego powiadomień

\--**discord.js** - biblioteka do wysyłania wiadomości do serwera
Discord

\--**nodemailer** - biblioteka do wysyłania wiadomości e-mail

\--**handlebars.js** - system szablonów do tworzenia spersonalizowanych
wiadomości

\--**twilio** -- biblioteka od wysłania SMS

\-**Python** -\> w Pythonie napisano skrypty służące do scrapowania
danych z sieci. Wykorzystano też biblioteki języka Python : requests i
beautiful-soup - służące do webscrapingu oraz mysql-connector-python do
połączenia z bazą MySQL .

**b) Technologie wykorzystane w aplikacji klienckiej:**

\-**React** -\> w aplikacji odpowiada za graficzny interfejs, w którym
porusza się użytkownik

\-**CSS + Bootstrap** -\> wykorzystywane do ładnego ułożenia widoku
strony oraz poprawienia wyglądu graficznego strony

**c) Inne:**

**MySQL** -- baza danych, w której przechowywane są wszystkie informacje

**Jest** -- biblioteka do testowania aplikacji Node.js

**Docker** -- środowisko kontenerowe, w której przechowywane są osobno:
baza danych, aplikacja kliencka oraz aplikacja serwerowa.

PDF z opisem pracy w repozytorium
