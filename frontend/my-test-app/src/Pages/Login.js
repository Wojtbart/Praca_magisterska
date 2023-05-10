import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import '../style.css'

function LoginForm() {
    
    const navigate = useNavigate();
	const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    function loginUser() {

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
			if(data.message==='Nie udało się zalogować') setErrorMessage(data.error);
            else {
				// alert("Udało się poprawnie zalogować!");
                localStorage.setItem("login", data.login);
                localStorage.setItem("phone", data.phone);
                localStorage.setItem("email", data.email);
                navigate("/dashboard")
            }
        })
        .catch((err) => console.error(err));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        loginUser();
    }

    const gotoSignUpPage = () => navigate("/register");

    return(
        <>    
            <form onSubmit={handleSubmit} className="form">

                <h2 className='formTitle'>LOGOWANIE</h2>

                <div className="form-body">
                <p className="error-message first-error">{errorMessage}</p>
                    <div className="login">
                        <TextField
                            id="login"
                            type="text"
                            variant="outlined"
                            name="Login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            fullWidth
                            required
                            className="form__input"
                            label="Login"
                        />
                    </div>

                    <div className="password">
                        <TextField
                            id="password"
                            type="password"
                            variant="outlined"
                            name="Hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                            minLength={8}
                            className="form__input"
                            label="Hasło"
                        />

                    </div>
                </div>

                <div className="footer">
                    <button type="submit"  className="btn">Zaloguj się</button>
                </div>
                
                <p className='link'>
                    Nie masz konta?{" "}
                    <button className='linkBtn' onClick={gotoSignUpPage}>
                        Zarejestruj się
                    </button>
                </p>
            </form>
        </>
    );
}

export default LoginForm;

