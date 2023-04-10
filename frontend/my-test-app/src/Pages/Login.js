import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
// import PropTypes from 'prop-types';
import '../style.css'




//{ setToken } 
function LoginForm( ) {
    
	const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    function loginUser() {
        
        // console.log(credentials)
        fetch('http://localhost:9005/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
				login,
				password,
			}),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error_message) {
                alert(data.error_message);
            } else {
                //👇🏻 Logs the username to the console
                console.log(data.data);
                //👇🏻 save the username to the local storage
                localStorage.setItem("login", data.data.login);
                //👇🏻 Navigates to the 2FA route
                navigate("/dashboard");
            }
        })
        .catch((err) => console.error(err));
    }

    

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
        loginUser();
        console.log({ login, password });
        // const token = await loginUser({
        //     login,
        //     password
        // });

        // setToken(token);
        // navigate("/dashboard");
    }
    const gotoSignUpPage = () => navigate("/register");

    return(
        <div>    
            <form onSubmit={handleSubmit} className="form">
                <h2 className='formTitle'>LOGOWANIE</h2>
                {/* <div className='form-body'> */}
                    {/* <div> */}
                        <label className="form__label" htmlFor='login'>Login
                        <input
                            type="text"
                            name="Login"
                            id='login'
                            value={login}
                            required
                            className="form__input"
                            // value={username}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                        </label>
                    {/* </div> */}
                    {/* <div> */}
                        <label className="form__label" htmlFor='password'>Password
                        <input
                            type="password"
                            name="Hasło"
                            id='password'
                            minLength={8}
                            required
                            value={password}
                            className="form__input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </label>
                    {/* </div> */}
                    <div className="footer">
					    <button type="submit"  className="btn">Zaloguj się</button>
                        <p>
                            Nie masz konta?{" "}
                            <span className='link' onClick={gotoSignUpPage}>
                                Zarejestruj się
                            </span>
                        </p>
				    </div>
                {/* </div> */}
            </form>
            </div>
    );
}


// LoginForm.propTypes = {
//     setToken: PropTypes.func.isRequired
// };

export default LoginForm;

