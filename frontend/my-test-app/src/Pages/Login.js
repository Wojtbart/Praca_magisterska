import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import '../style.css'

function LoginForm() {
    
    const navigate = useNavigate();
	const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
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
			if(data.message==='Nie udało się zalogować') alert(data.error);
            else {
				alert("Udało się poprawnie zalogować!");
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

                    <div className="login">
                        <label className="form__label" htmlFor='login'>Login</label>
                        <input
                            type="text"
                            name="Login"
                            id='login'
                            value={login}
                            required
                            className="form__input"
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>

                    <div className="password">
                        <label className="form__label" htmlFor='password'>Hasło</label>
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

