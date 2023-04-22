import React,{ useEffect, useState, useRef, useMemo  } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Table from "../Table";

const Dashboard = () => {
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
        
    const data = React.useMemo(
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

    const [checked2, setChecked2] = useState(false);
    const [text, setText] = useState("");
    const actualOfferCheckbox = useRef();
    const timeCheckbox = useRef();

    const handleClickButton = () => {
        navigate('/configuration');
    } 

    const handleCheck = (event) => {
        console.log(event.target)
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
      };

      const handleCheckNotification = (event) => {
        console.log(event.target)
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
        setInputText(lowerCase);
        console.log(lowerCase)
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
    async function getData() {
        
      fetch(`http://localhost:9005/getData}`, {
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
          console.error('There was an error!', error);
      });
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
                        onChange={inputHandler}
                        fullWidth
                        label="Szukaj"
                        />
                    </div>
                {/* </div> */}
                <div>
                  Ilośc zapytań 
                  <label>
                    <input name="input"
                        type="text"
                        disabled={false}
                        value="123">
                    </input>
                  </label>

                  <button>
                    ZAŁADUj
                  </button>

                </div>


                <Table columns={columns} data={data} />
            </div>
        </div>
        </>
    ); 
};
export default Dashboard;