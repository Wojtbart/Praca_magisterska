import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef  } from "react";
import { RiLoginBoxFill, RiMailCheckFill, RiPhoneFill } from "react-icons/ri";

const ConfigurationPage = () => {

    const navigate = useNavigate();

    const checkList = ["OLX", "Amazon", "Pepper", "Allegro"];
    const notificationSystems= ["SMS", "Email", "Discord"];

    const [checked, setChecked] = useState([]);
    const [checkedNotification, setCheckedNotification] = useState([]);

    const [checked2, setChecked2] = useState(false);
    const [checkedActualOffer, setCheckedActualOffer] = useState(false);

    const [checked3, setChecked3] = useState(false);
    const [text, setText] = useState("");
    const [text3, setText3] = useState("");
    const actualOfferCheckbox = useRef();
    const timeCheckbox = useRef();
    const minutesCheckbox = useRef();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    
    const [configuration, setConfiguration] = useState([]);

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const handleCheckNotification = (event) => {
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
    const isCheckedNotifications = (item) =>checkedNotification.includes(item) ? "checked-item" : "not-checked-item";

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

    const goToDashboardPage = () => navigate("/dashboard");

    async function getUser() {
        
        return fetch(`http://localhost:9005/getUser/${localStorage.getItem("login")}`, {
            method: 'GET'
        })
        .then(async response => {

            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data.user_id;
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('Wystąpił błąd!', error);
        });
    }
     useEffect(() => {
         getUserConfiguration();
      }, []);

    async function getUserConfiguration() {
        var configrationList = [];
        
        return fetch(`http://localhost:9005/getConfiguration/${localStorage.getItem("login")}`, {
            method: 'GET'
        })
        .then(async response => {

            const dataFromBackend = await response.json();
            if (!response.ok) {
                const error = (dataFromBackend && dataFromBackend.message) || response.statusText;
                return Promise.reject(error);
            }

            for (let item in dataFromBackend.data){
                // console.error("wsztystko",item);
                if (dataFromBackend.data[item] && dataFromBackend.data[item]!==0 && item!=="id" && item!=="user_id" ){
                    // console.log("key:",item);
                    // console.log("value:",dataFromBackend.data[item]);
                    if(item==='repeat_after_specified_time'){
                        configrationList.push("powtórz wysyłanie co "+dataFromBackend.data[item]+" min");
                    }
                    else if(item==='godzina_maila'){
                        configrationList.push("wiadomości wysyłane o "+dataFromBackend.data[item]);
                    }
                    else configrationList.push(item+", ");
                }
            }
            configrationList[configrationList.length-1]=configrationList[configrationList.length-1].replace(/,\s*$/, "");
            setConfiguration(configrationList);
            // console.log(dataFromBackend.data)
            // if("data" in dataFromBackend) return dataFromBackend.data;
            // else return null;
            

        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('Wystąpił błąd!', error);
        });
    }
    
    async function saveConfigurationToDatabase(obj) {
        
        fetch('http://localhost:9005/saveConfiguration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        })
        .then((res) => res.json())
		.then((data) => {
            // alert("Poprawnie zapisano dane w bazie!");
            setSuccess("Poprawnie zapisano dane w bazie!");
            // dodać logowanie
        })
        .catch((err) => console.error(err));
    }

    const handleSubmit = async (e) => {

        const arr=checked.concat(checkedNotification);
        if(checked.length===0 || checkedNotification.length===0  ) {
            // alert("Wybierz dostepne opcje!")
            setError("Wybierz dostepne opcje!");
            return;
        }

        e.preventDefault()

        const obj={
            olx:false,
            amazon:false,
            allegro:false,
            pepper: false,
            sms:false,
            email:false,
            discord:false,
            aktualna_oferta:false,
            godzina_maila:null,
            repeat_after_specified_time:0,
            user_id:0
        }
        let keys = Object.keys(obj);

        for (let i = 0; i < arr.length; i++) {
            if(keys.includes(arr[i].toLowerCase())){
                obj[arr[i].toLowerCase()]=true;
            }
        }

        if(checked2) obj['godzina_maila']=text;
        if(checked3) obj['repeat_after_specified_time']=parseInt(text3);
        if(checkedActualOffer) obj['aktualna_oferta']=true;

        obj['user_id']=await getUser();
        await getUserConfiguration();

        saveConfigurationToDatabase(obj);
        window.location.reload(true);
    }
    
    return (
        <>
            <div>
                <nav className="bg-dark navbar-dark navbar">
                    <div className="col-12 d-flex justify-content-center  text-white">
                        <h3 className='HeaderTitle' >NOTIFICATIONER</h3>
                        <button className='signOutBtn' onClick={handleSignOut}>WYLOGUJ SIE</button>
                    </div>
                </nav>

                <div className="container" > 
                    <section className="description sectionOne">
                        <div>
                            <h2>Twoje dane</h2>
                            <ul> 
                                <li> <RiLoginBoxFill style={{color: 'black', fontSize: '20px'}} /> Login: <span className="itemData">{localStorage.getItem("login")} </span></li>
                                <li> <RiMailCheckFill style={{color: 'green', fontSize: '20px'}} />  Adres e-mail: <span className="itemData">{localStorage.getItem("email")}</span></li>
                                <li> <RiPhoneFill style={{color: 'blue', fontSize: '20px'}} />Telefon: <span className="itemData">{localStorage.getItem("phone")}</span> </li>
                                <li > Ustawienia: <span className="itemData yourSettings">{configuration}</span> </li>
                            </ul>
                        </div>
                    </section>

                    <section className="description sectionTwo">
                        <div className="checkList">
                            <h4>Wybierz witryny z których chcesz pobrać oferty:</h4>
                            <div className="list-container">
                                {checkList.map((item, index) => (
                                    <div key={index}>
                                        <input value={item} type="checkbox" onChange={handleCheck} />
                                        <span className={isChecked(item)}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <div className="otherCheckboxes">

                        <label>
                            <input
                            name="input"
                            type="checkbox"
                            disabled={false}
                            ref={actualOfferCheckbox}
                            checked={checkedActualOffer}
                            onChange={ (e) => {
                                if(actualOfferCheckbox.current.checked){
                                    timeCheckbox.current.disabled=true;
                                    minutesCheckbox.current.disabled=true;
                                }
                                else{
                                    timeCheckbox.current.disabled=false;
                                    minutesCheckbox.current.disabled=false;
                                }
                                setCheckedActualOffer(!checkedActualOffer)
                            }}
                            />
                            Aktualne oferty
                        </label>

                        <label>
                            <input
                            name="checkbox"
                            type="checkbox"
                            checked={checked2}
                            ref={timeCheckbox}
                            onChange={() => {
                                if(checked2){
                                    setText(getActualTime())
                                }

                                if(timeCheckbox.current.checked){
                                    actualOfferCheckbox.current.disabled=true;
                                    minutesCheckbox.current.disabled=true;
                                }
                                else{
                                    actualOfferCheckbox.current.disabled=false;
                                    minutesCheckbox.current.disabled=false;
                                }
                                setChecked2(!checked2)
                            }}
                            />
                            Ustaw godzinę wysłania
                        </label>

                        <label className="timeLabel">
                            Godzina wysłania:
                            <input
                            name="input"
                            id="timeCheckbox"
                            type="time"
                            disabled={!checked2}
                            value={text}
                            onChange={e => setText(e.target.value)}
                            />
                        </label>

                        <label>
                            <input
                            name="checkbox"
                            type="checkbox"
                            checked={checked3}
                            ref={minutesCheckbox}
                            onChange={() => {

                                if(minutesCheckbox.current.checked){
                                    actualOfferCheckbox.current.disabled=true;
                                    timeCheckbox.current.disabled=true;
                                }
                                else{
                                    actualOfferCheckbox.current.disabled=false;
                                    timeCheckbox.current.disabled=false;
                                }
                                setChecked3(!checked3)
                            }}
                            />
                            Co ile minut chcesz wysyłać wiadomości
                        </label>

                        <label className="timeLabel">
                            Co ile minut:
                            <input
                            name="input"
                            id="minuteCheckbox"
                            type="number"
                            min={1}
                            max={59}
                            disabled={!checked3}
                            value={text3}
                            required
                            onChange={e => setText3(e.target.value)}
                            />
                        </label>

                    </div>

                    <section className="description sectionThree">
                        <div className="checkList">
                            <h4>Wybierz systemy powiadomień, do których chcesz wysłać wiadomość:</h4>
                            <div className="list-container">
                                {notificationSystems.map((item, index) => (
                                    <div key={index}>
                                        <input value={item} type="checkbox" onChange={handleCheckNotification} />
                                        <span className={isCheckedNotifications(item)}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    
                    <div>
                        <p className="error-message-configuration">{error}</p>
                        <p className="succesfull-message">{success}</p>
                        <button className="btn upperButton" type="button" onClick={handleSubmit}>Zapisz konfigurację</button>
                        <button className="btn backDashboard" onClick={goToDashboardPage}>Powrót do panelu</button>
                    </div>

                </div>
            </div>
        </>
    ); 
};
export default ConfigurationPage;