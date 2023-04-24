import React,{ useEffect, useState, useRef, useMemo  } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Table from "../Table";

const Dashboard = () => {

  const WEBSITES_NAMES=["pepper", "amazon","olx", "allegro"]
  const NOTIFICATION_NAMES=["email", "sms","discord"]
  const CHOICES=["aktualna_oferta", "godzina_maila"]
    const navigate = useNavigate();
   // const [data, setData] = useState([]);

    const Genres = ({ values }) => {
        return (
          <>
            {values.map((genre, idx) => {
              return (
                <span key={idx} className="badge">
                  {genre}
                </span>
              );
            })}
          </>
        );
      };

    const columns = useMemo(
        () => [
            {
              Header: "Company",
              accessor: "company" // accessor is the "key" in the data
            },
            {
              Header: "Contact",
              accessor: "contact"
            },
            {
              Header: "Country",
              accessor: "country"
            }
          ],
          []
        );
        
    const dataa = React.useMemo(
        () => [
        {
            company: "Alfred",
            contact: "Maria Anders",
            country: "Germany"
        },
        {
            company: "Centro comercial Moctezuma",
            contact: "Francisco Chang",
            country: "Mexico"
        },
        {
            company: "Ernst Handel",
            contact: "Roland Mendel	",
            country: "Austria"
        }
        ],
        []
  );
    const [checked, setChecked] = useState([]);
    const [checkedNotification, setCheckedNotification] = useState([]);
    const [phrase_var, setPhrase] = useState("");
    const [requests_number, set_requests_number] = useState("");


    const [checked2, setChecked2] = useState(false);
    const [text, setText] = useState("");
    const actualOfferCheckbox = useRef();
    const timeCheckbox = useRef();

    const handleClickButton = () => {
        navigate('/configuration');
    } 

    const handleCheck = (event) => {
        // console.log(event.target)
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
      };

      const handleCheckNotification = (event) => {
        // console.log(event.target)
        var updatedList = [...checkedNotification];
        if (event.target.checked) {
          updatedList = [...checkedNotification, event.target.value];
        } else {
          updatedList.splice(checkedNotification.indexOf(event.target.value), 1);
        }
        setCheckedNotification(updatedList);
      };

    const getActualTime= ()=>{
        const today = new Date();
        const time = `${today.getHours()}:${today.getMinutes()}`;
        return time;
    }
      
    const isChecked = (item) =>checked.includes(item) ? "checked-item" : "not-checked-item";
    var checkedItems = checked.length? checked.reduce((total, item) => {return total + ", " + item;}): "";

    const isCheckedNotifications = (item) =>checkedNotification.includes(item) ? "checked-item" : "not-checked-item";
    var checkedItemsNotifications = checkedNotification.length? checkedNotification.reduce((total, item) => {return total + ", " + item;}): "";

    const [inputText, setInputText] = useState("");
    let inputHandler = (event) => {
        //convert input text to lower case
        var lowerCase = event.target.value.toLowerCase();
        // setInputText(lowerCase);
        console.log("texkst",lowerCase)
    };



    useEffect(() => {
        const checkUser = () => {
            if (!localStorage.getItem("login")) {
                navigate("/");
            }
        };

        checkUser();
    }, [navigate]);

    const handleSignOut = () => {
        localStorage.removeItem("login");
        localStorage.removeItem("phone");
        localStorage.removeItem("email");
        navigate("/");
    };

    const [dataFromBackend, setDataFromBackendVar] = useState([]);
    // let dataFromBackend=null;
     function getUserConfig() {
      

      return fetch(`http://localhost:9005/getConfiguration/${localStorage.getItem("login")}`, {
            method: 'GET'
        }).then( async response => {

          const dataObj= await  response.json();
          if (!response.ok) {
              const error = (dataObj && dataObj.message) || response.statusText;
              return Promise.reject(error);
          }
          // console.log(dataObj.data.id)
          
          return dataObj.data;
      })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
    });
    
      // return  data
      // .then((dataObj) => {

      //   // if(data.message==='Rejestracja nie powiodła się') alert(data.error);
      //   //       else {
      //   //   alert("Konto zostało utworzone pomyślnie!");
      //   //           navigate("/");
      //   //       }
      //   for (const key in dataObj.data) {

      //     if(dataObj.data[key] ){
      //       WEBSITES_NAMES.forEach(el=>{
      //         if(el===key) websites.push(key);
      //       })
      //       NOTIFICATION_NAMES.forEach(el=>{
      //         if(el===key) notifications.push(key);
      //       })

      //       // eslint-disable-next-line no-loop-func
      //       CHOICES.forEach(el=>{
      //         if(el===key) actual_or_mail_hour=key;
      //       })
      //     }
      //   }
      //   // console.log(websites)
      //   // console.log(notifications)
      //   // console.log(actual_or_mail_hour)
      //   var myJsonString = JSON.stringify(websites);
      //   console.log(myJsonString)
      //   return myJsonString
      // })
      
    }
    async function getData(json_data) {

      let websites=[];
      let notifications=[];
      let actual_or_mail_hour=null;
      for (const key in json_data) {

            if(json_data[key] ){
              WEBSITES_NAMES.forEach(el=>{
                if(el===key) websites.push(key);
              })
              NOTIFICATION_NAMES.forEach(el=>{
                if(el===key) notifications.push(key);
              })
  
              // eslint-disable-next-line no-loop-func
              CHOICES.forEach(el=>{
                if(el===key) actual_or_mail_hour=key;
              })
            }
      }
          // console.log(websites)
          // console.log(notifications)
          // console.log(actual_or_mail_hour)
          var Obj = {             
            websites: [],
            notifications: [],
            actual_or_mail_hour: '',
            phrase: json_data['phrase'],
            request_number: json_data['request_number'],
        };
        console.log(Obj)
        Obj.websites.push(websites);
        Obj.notifications.push(notifications);
        Obj.actual_or_mail_hour=actual_or_mail_hour;

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
          console.log("czy dostałęm dane",data)
          setDataFromBackendVar(data.data)
          return data;//tut mamy konfigurację usera
      })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
      });
    }
    
    const [isActive, setIsActive] = useState(false);
  const handleSubmit = async (e) => {
    // const arr=checked.concat(checkedNotification);
    // if(checked.length===0 || checkedNotification.length===0  ) {
    //     alert("Wybierz przynajmniej dostepne opcje!")
    //     return;
    // }
    e.preventDefault();
    let phrase=phrase_var;
    let request_number=requests_number

    let  user_config=await getUserConfig()
    console.log(user_config)
    user_config.phrase = phrase;
    user_config.request_number = request_number;
    // console.log( user_config )
    const dataFetch= await getData(user_config);
    setIsActive(current => !current);

    // setDataFromBackendVar([dataFromBackend, dataFetch])
    // dataFromBackend=dataFetch.data
    // console.log(dataFromBackend)
    // window.location.reload(false);
    
    // console.log(dataFetch.data)
    
    // const obj={
    //     olx:false,
    //     amazon:false,
    //     allegro:false,
    //     pepper: false,
    //     sms:false,
    //     email:false,
    //     discord:false,
    //     aktualna_oferta:false,
    //     godzina_maila:'',
    //     user_id:0
    // }
    // let keys = Object.keys(obj);

    // for (let i = 0; i < arr.length; i++) {
    //     if(keys.includes(arr[i].toLowerCase())){
    //         obj[arr[i].toLowerCase()]=true;
    //     }
    // }

    // if(checked2) obj['godzina_maila']=text;
    // if(checkedActualOffer) obj['aktualna_oferta']=true;
    // obj['user_id']=getUser();
    
    // saveConfigurationToDatabase(obj);
  }
  
    
    return (
        <>
        <div >
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
                
                
                {/* <div className="main"> */}
                    <h1 className="searchbarTitle">Szukana fraza</h1>
                    <div className="search">
                        <TextField
                        id="outlined-basic"
                        variant="outlined"
                        value={phrase_var}
                        onChange={(e) => {
                          setPhrase(e.target.value);
                        }}
                        fullWidth
                        label="Szukaj"
                        />
                    </div>
                {/* </div> */}
                <div>
                  Ilośc zapytań 
                  <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    min="0"
                    onChange={(e) => {
                      set_requests_number(e.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    
                  />

                  <button onClick={handleSubmit}>ZAŁADUj </button>

                </div>
                {/* {console.log(typeof dataFromBackend)}
                {console.log(Object.keys(dataFromBackend).length)}

                {console.log(dataFromBackend)} */}
          {/* { (dataFromBackend!=null ||  !dataFromBackend || !Object.keys(dataFromBackend).length===0 ) ? ( */}
              <tbody className={isActive ? 'set_active' : 'no_active'}>
                <tr>
                  <th>Tytul</th>
                  <th>Cena_oryginalna</th>
                  <th>Cena_promocyjna</th>
                  <th>Czy_promocja_trwa</th>
                  <th>Dostawa</th>
                  <th>Firma_sprzedajaca</th>
                  <th>Kupony_promocyjne</th>
                  <th>Link</th>
                  <th>Obniżka w %</th>
                  <th>Opis</th>
                  {/*<th>Opublikowano</th>
                  <th>Zdjecie</th>
                  <th>Avatar</th>
                  <th>Ilosc komentarzy</th>
                  <th>Uzytkownik wystawiajacy</th> */}
                </tr>
              
                {
                  dataFromBackend.map((item, index) => (
                    <tr key={index}>
                      <td>{item.Tytul}</td>
                      <td>{item.Cena_oryginalna}</td>
                      <td>{item.Cena_promocyjna}</td>
                      <td>{item.Czy_promocja_trwa}</td>
                      <td>{item.Kupony_promocyjne}</td>
                      <td>{item.Dostawa}</td>
                      <td>{item.Opis}</td>
                      <td>{item.Link}</td>
                      <td>{item.Obnizka_w_procentach}</td>
                    {/* <td>{item.Opis}</td>
                      <td>{item.Opublikowano}</td>
                      <td>{item.Zdjecie}</td>
                      <td>{item.avatar}</td>
                      <td>{item.ilosc_komentarzy}</td>
                      <td>{item.uzytkownik_wystawiajacy}</td> */}

                    </tr>
                  )) 
                }
              </tbody>
            {/* ):(
              <div >EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE {console.log(dataFromBackend)}</div>
            ) */}
          {/* } */}
            </div>
        </div>
        </>
    ); 
};
export default Dashboard;