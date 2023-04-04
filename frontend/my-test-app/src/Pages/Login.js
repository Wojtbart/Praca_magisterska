import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import '../style.css'

async function loginUser(credentials) {
    console.log(credentials)
    return fetch('http://localhost:9005/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }



function LoginForm( { setToken } ) {
    // const navigate = useNavigate();
	const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    

    // const [authenticated, setauthenticated] = useState(localStorage.getItem("authenticated"));
    
    // const users = [{ username: "Jane", password: "testpassword" }];

    const handleSubmit = async (e) => {
        // console.log(e.target.value)

        e.preventDefault()
        // console.log(e)
        // const account = users.find((user) => user.username === username);
        // console.log(account)

        // if (account && account.password === password) {
        //     setauthenticated(true)
        //     localStorage.setItem("authenticated", true);
        //     console.log("git")
        //     console.log(setauthenticated)
        //     console.log("git2")
        //     navigate("/dashboard");
        // }
        console.log("siema")
        const token = await loginUser({
            username,
            password
        });

        setToken(token);
        // navigate("/dashboard");
    }
    return(
        <div>    
            <form onSubmit={handleSubmit} className="form">
                <h2 className='formTitle'>LOGOWANIE</h2>
                {/* <div className='form-body'> */}
                    {/* <div> */}
                        <label className="form__label" >Login
                        <input
                            type="text"
                            name="Login"
                            className="form__input"
                            // value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        </label>
                    {/* </div> */}
                    {/* <div> */}
                        <label className="form__label">Password
                        <input
                            type="password"
                            name="Hasło"
                            className="form__input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </label>
                    {/* </div> */}
                    <div className="footer">
					    <button type="submit"  className="btn">Zaloguj się</button>
				    </div>
                {/* </div> */}
            </form>
            </div>
    );
}


LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
  };

export default LoginForm;

