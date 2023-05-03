import React, { useEffect, useState, useRef} from "react";
import { useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";

const Dashboard = () => {

  const navigate = useNavigate();

  const WEBSITES_NAMES=["pepper", "amazon", "olx", "allegro"]
  const NOTIFICATION_NAMES=["email", "sms", "discord"]
  const CHOICES=["aktualna_oferta", "godzina_maila"]

  const [phrase, setPhrase] = useState("");
  const [requestsNumber, setRequestsNumber] = useState("");
  const [dataFromServicePepper, setDataFromServicePepper] = useState([]);
  const [dataFromServiceOlx, setDataFromServiceOlx] = useState([]);
  const [dataFromServiceAllegro, setDataFromServiceAllegro] = useState([]);
  const [dataFromServiceAmazon, setDataFromServiceAmazon] = useState([]);

  const [isActiveTablePepper, setIsActiveTablePepper] = useState(false);
  const [isActiveTableOlx, setIsActiveTableOlx] = useState(false);
  const [isActiveTableAmazon, setIsActiveTableAmazon] = useState(false);
  const [isActiveTableAllegro, setIsActiveTableAllegro] = useState(false);

  const pepperTable = useRef();
  
  useEffect(() => {
    const checkUser = () => {
        if (!localStorage.getItem("login")) {
            navigate("/");
        }
    };

    checkUser();
  }, [navigate]);

  const handleClickButton = () => {
    navigate('/configuration');
  } 

  const handleSignOut = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("phone");
    localStorage.removeItem("email");
    navigate("/");
  };

  function getUserConfig() {
      
    return fetch(`http://localhost:9005/getConfiguration/${localStorage.getItem("login")}`, {
      method: 'GET'
    }).then( async response => {

        const dataObj= await response.json();
        if (!response.ok) {
            const error = (dataObj && dataObj.message) || response.statusText;
            return Promise.reject(error);
        }
        return dataObj.data;
    })
    .catch(error => {
      this.setState({ errorMessage: error.toString() });
      console.error('Wystąpił błąd!', error);
    });
  }

  async function getData(json_data) {

    let websites=[];
    let notifications=[];
    let actual_or_mail_hour=null;
    
    for (const key in json_data) {
      if(json_data[key] ){

        WEBSITES_NAMES.forEach(el=>{
          if(el===key) websites.push(key);
        });

        NOTIFICATION_NAMES.forEach(el=>{
          if(el===key) notifications.push(key);
        });

        // eslint-disable-next-line no-loop-func
        CHOICES.forEach(el=>{
          if(el===key) actual_or_mail_hour=key;
        });
      }
    }

    var Obj = {             
      websites: [],
      notifications: [],
      actual_or_mail_hour: '',
      phrase: json_data['phrase'],
      request_number: json_data['request_number'],
    };
    Obj.websites.push(websites);
    Obj.notifications.push(notifications);
    Obj.actual_or_mail_hour=actual_or_mail_hour;
    console.log("websites",websites)
    console.log("OBJECT: ",JSON.stringify(Obj))

    return fetch(`http://localhost:9005/getData`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Obj)
    })
    .then(async response => {

      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      if(data.pepper_data.length!==0){
        setIsActiveTablePepper(current => !current);
        data.pepper_data.sort(function(a, b){
          return a.id - b.id;
        });
        setDataFromServicePepper(data.pepper_data);
      }

      if(data.olx_data.length!==0){
        setIsActiveTableOlx(current => !current);
        data.olx_data.sort(function(a, b){
          return a.id - b.id;
        });
        setDataFromServiceOlx(data.olx_data);
      }

      if(data.allegro_data.length!==0){
        setIsActiveTableAllegro(current => !current);
        data.allegro_data.sort(function(a, b){
          return a.id - b.id;
        });
        setDataFromServiceAllegro(data.allegro_data);
      }

      if(data.amazon_data.length!==0){
        setIsActiveTableAmazon(current => !current);
        data.amazon_data.sort(function(a, b){
          return a.id - b.id;
        });
        setDataFromServiceAmazon(data.amazon_data);
      }

      return data;
    })
    .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('Wystąpił błąd!', error);
    });
  }
    

  const handleReset = async (e) => {

    e.preventDefault();

    setPhrase('')
    setRequestsNumber(0)
    // dataFromServicePepper=[];
    // dataFromServiceOlx=[];
    // dataFromServiceAmazon=[];
    // dataFromServiceAllegro=[];

    // isActiveTablePepper=false;
    // isActiveTableOlx=false;
    // isActiveTableAmazon=false;
    // isActiveTableAllegro=false;
    console.log(pepperTable.current)

  }
  
  const handleSubmit = async (e) => {

    e.preventDefault();

    let phrase_value=phrase;
    let request_number=requestsNumber;
    console.log(request_number)
    let  user_config = await getUserConfig();

    user_config.phrase = phrase_value;
    user_config.request_number = request_number;

    await getData(user_config);
  }
  
    
  return (
    <>
      <div>
          <nav className="bg-dark navbar-dark navbar">
            <div className="col-12 d-flex justify-content-center text-white">
              <h3 className='HeaderTitleDashboard' >NOTIFICATIONER  </h3>
              <button className="btn goToConfiguration" type="button" onClick={handleClickButton}>
                Przejdź do konfiguracji
              </button>
              <button className='signOutBtn' onClick={handleSignOut}>WYLOGUJ SIE</button>
            </div>
          </nav>

          <div className="container" > 
              <h1 className="searchbarTitle">Szukana fraza</h1>
              <div className="search">
                <div className="input-dashboard">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={phrase}
                    onChange={(e) => {
                      setPhrase(e.target.value);
                    }}
                    fullWidth
                    label="Szukaj"
                  />
                </div>

                <div className="input-dashboard">
                  <p >Ilośc zapytań </p>
                  <TextField
                    className="input-dashboard"
                    id="outlined-number"
                    label="Liczba"
                    type="number"
                    onChange={(e) => {
                      setRequestsNumber(e.target.value);
                    }}
                    InputProps={{
                      inputProps: { min: 0, max: 20 }
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
                <div>
                <button className="btn loadButton" disabled={!requestsNumber || !phrase } onClick={handleSubmit}>ZAŁADUJ</button>
                <button className="btn resetBtn" onClick={handleReset} >RESET</button>
                </div>
              </div> 

            <table ref={pepperTable} className={isActiveTablePepper ? 'set_active' : 'no_active'}>
              <caption>PEPPER</caption>
              <thead>
                <tr>
                  <th>Tytuł</th>
                  <th>Cena oryginalna</th>
                  <th>Cena promocyjna</th>
                  <th>Czy promocja trwa</th>
                  <th>Dostawa</th>
                  <th>Opis</th>
                  <th>Link</th>
                  <th>Obniżka w %</th>
                  <th>Opublikowano</th>
                  <th>Zdjęcie</th>
                  <th>Ilość komentarzy</th>
                  <th>Użytkownik wystawiający</th> 
                </tr>
              </thead>
              <tbody>
                {
                  dataFromServicePepper.map((item, index) => (
                    <tr key={index}>
                      <th>{item.Tytul}</th>
                      <td >{item.Cena_oryginalna===''|| !item.Cena_oryginalna  ? 'BRAK' : item.Cena_oryginalna}</td>
                      <td >{item.Cena_promocyjna===''|| !item.Cena_promocyjna  ? 'BRAK' : item.Cena_promocyjna}</td>
                      <td >{item.Czy_promocja_trwa===''|| !item.Czy_promocja_trwa  ? 'TAK' : item.Czy_promocja_trwa}</td>
                      <td >{item.Dostawa===''|| !item.Dostawa  ? 'BRAK' : item.Dostawa}</td>
                      <td className="description_product">{item.Opis===''|| !item.Opis  ? 'BRAK' : item.Opis}</td>
                      <td >{item.Link===''|| !item.Link  ? 'BRAK' : <a className="table-link" target="_blank" rel="noopener noreferrer" href={item.Link}>Link</a>}</td>
                      <td >{item.Obnizka_w_procentach===''|| !item.Obnizka_w_procentach  ? 'BRAK' : item.Obnizka_w_procentach}</td>
                      <td >{item.Opublikowano}</td>
                      <td ><a className="table-link" target="_blank" rel="noopener noreferrer" href={item.Zdjecie} >Zdjęcie</a></td>
                      <td >{item.ilosc_komentarzy===''|| !item.ilosc_komentarzy  ? 'BRAK' : item.ilosc_komentarzy}</td>
                      <td >{item.uzytkownik_wystawiajacy}</td> 
                    </tr>
                  )) 
                }
              </tbody>
            </table>

            <table className={isActiveTableAmazon ? 'set_active' : 'no_active'}>
              <caption>Amazon</caption>
              <thead>
                <tr>
                  <th>Tytuł</th>
                  <th>Link</th>
                  <th>Zdjęcie</th>
                  <th>Ocena</th>
                  <th>Dostawa w dniu</th>
                  <th>koszt dostawy</th>
                  <th>Cena oryginalna</th>
                  <th>Cena promocyjna</th>
                  <th>Ilosc komentarzy</th>
                  <th>Ilośc dostępnych</th> 
                </tr>
              </thead>
              <tbody>
                {
                  dataFromServiceAmazon.map((item, index) => (
                    <tr key={index}>
                      <th>{item.Tytul}</th>
                      <td >{item.Link===''|| !item.Link  ? 'BRAK' : <a className="table-link" target="_blank" rel="noopener noreferrer" href={item.Link}>Link</a>}</td>
                      <td ><a className="table-link" target="_blank" rel="noopener noreferrer" href={item.Zdjecie} >Zdjęcie</a></td>
                      <td >{item.Ocena_w_gwiazdkach===''|| !item.Ocena_w_gwiazdkach  ? 'BRAK' : item.Ocena_w_gwiazdkach}</td>
                      <td >{item.Dostawa===''|| !item.Dostawa  ? 'BRAK' : item.Dostawa}</td>
                      <td >{item.Czy_darmowa_dostawa===''|| !item.Czy_darmowa_dostawa  ? 'TAK' : item.Czy_darmowa_dostawa}</td>
                      <td >{item.Cena_oryginalna===''|| !item.Cena_oryginalna  ? 'BRAK' : item.Cena_oryginalna}</td>
                      <td >{item.Cena_promocyjna===''|| !item.Cena_promocyjna  ? 'BRAK' : item.Cena_promocyjna}</td>
                      <td >{item.Ilosc_komentarzy===''|| !item.Ilosc_komentarzy  ? 'BRAK' : item.Ilosc_komentarzy}</td>
                      <td >{item.Ilosc_dostepnych===''|| !item.Ilosc_dostepnych  ? 'BRAK' : item.Ilosc_dostepnych}</td> 
                    </tr>
                  )) 
                }
              </tbody>
            </table>

            <table className={isActiveTableOlx ? 'set_active' : 'no_active'}>
              <caption>OLX</caption>
              <thead>
                <tr>
                  <th>Tytuł</th>
                  <th>Cena</th>
                  <th>Lokalizacja</th>
                  <th>Link</th>
                  <th>Zdjęcie</th>
                  <th>Stan</th>
                </tr>
              </thead>
              <tbody>
                {
                  dataFromServiceOlx.map((item, index) => (
                    <tr key={index}>
                      <th>{item.Tytul}</th>
                      <td >{item.Cena===''|| !item.Cena  ? 'BRAK' : item.Cena}</td>
                      <td >{item.Lokalizacja===''|| !item.Lokalizacja  ? 'BRAK' : item.Lokalizacja}</td>
                      <td >{item.Link===''|| !item.Link  ? 'BRAK' : <a className="table-link" target="_blank" rel="noopener noreferrer" href={item.Link}>Link</a>}</td>
                      <td ><a className="table-link" target="_blank" rel="noopener noreferrer" href={item.Zdjecie} >Zdjęcie</a></td>
                      <td >{item.Stan===''|| !item.Stan  ? 'BRAK' : item.Stan}</td>
                    </tr>
                  )) 
                }
              </tbody>
            </table>


            <table className={isActiveTableAllegro ? 'set_active' : 'no_active'}>
              <caption>ALLEGRO</caption>
              <thead>
                <tr>
                  <th>Tytuł</th>
                  <th>Link</th>
                  <th>Czy jest w promocji</th>
                  <th>Ilość</th>
                  <th>Cena</th>
                  <th>Popularność</th>
                  <th>Dostawa</th>
                  <th>Użytkownik wystawiający</th>
                </tr>
              </thead>
              <tbody>
                {
                  dataFromServiceAllegro.map((item, index) => (
                    <tr key={index}>
                      <th>{item.product_name}</th>
                      <td ><a className="table-link" target="_blank" rel="noopener noreferrer" href={item.image_link} >Zdjęcie</a></td>
                      <td >{item.has_promotion===''|| !item.has_promotion  ? 'BRAK PROMOCJI' : "PROMOCJA"}</td>
                      <td >{item.quantity===''|| !item.quantity  ? 'BRAK' : item.quantity}</td>
                      <td >{item.price_in_PLN===''|| !item.price_in_PLN  ? 'BRAK' : item.price_in_PLN +" zł"}</td>
                      <td >{item.popularity===''|| !item.popularity  ? 'BRAK' : item.popularity}</td>
                      <td >{item.delivery_in_PLN===''|| !item.delivery_in_PLN  ? 'BRAK' : item.delivery_in_PLN +" zł"}</td>
                      <td >{item.seller_name===''|| !item.seller_name  ? 'BRAK' : item.seller_name}</td>
                    </tr>
                  )) 
                }
              </tbody>
            </table>

          </div>
      </div>
    </>
  ); 
};

export default Dashboard;