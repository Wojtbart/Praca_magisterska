import React, {useState} from 'react';
import '../style.css';
import { useNavigate  } from 'react-router-dom';
import TextField from "@mui/material/TextField";

function RegistrationForm() {
	const navigate = useNavigate();

	const [name, setName] = useState(''); 
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [login, setLogin] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [succesfullMessage, setSuccesfullMessage] = useState('');

	const onInputChange = e => {
		handleInputChange(e)
	}

	const handleInputChange = (e) => {
		const {id , value} = e.target;
		if(id === "name"){
			setName(value);
		}
		if(id === "surname"){
			setSurname(value);
		}
		if(id === "email"){
			setEmail(value);
		}
		if(id === "password"){
			setPassword(value);
		}
		if(id === "confirmPassword"){
			setConfirmPassword(value);
		}
		if(id === "phone"){
			setPhone(value);
		}
		if(id === "login"){
			setLogin(value);
		}
	}
	
	const [formError, setFormError] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleSubmit  = (e) => {
		e.preventDefault();

		//WALIDACJA FORMULARZA
		let inputError = {
			emails: "",
			passwords: "",
			confirmPasswords: "",
		};
	  
		if (!email && !password) {
			setFormError({
				...inputError,
				email: "Wpisz poprawny adres e-mail",
				password: "Hasło nie powinno być puste",
			});
			return
		}

		if (!email) {
			setFormError({
				...inputError,
				email: "Wpisz poprawny adres e-mail",
			});
			return
		}
		
		if (confirmPassword !== password) {
			setFormError({
				...inputError,
				confirmPassword: "Hasła muszą się zgadzać",
			});
			return;
		}

		if (!password) {
			setFormError({
				...inputError,
				password: "Hasło nie powinno być puste",
			});
			return
		}
		setFormError(inputError);

		//REJESTRACJA przez API  
		let obj = {
			login: login,
            name : name,
            surname:surname,
            email:email,
            password:password,
            phone:phone	
        }  

		fetch('http://localhost:9005/registerUser', {
			method: 'POST',
			headers:{
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(obj)
		})
		.then((res) => res.json())
		.then((data) => {

			if(data.message==='Rejestracja nie powiodła się') setErrorMessage(data.error);
            else {
				setSuccesfullMessage("Konto zostało utworzone pomyślnie!");
            }
        })
        .catch((err) => console.error(err));	
	}

	const gotoLoginPage = () => navigate("/");

	return (
	<>
		<form onSubmit={handleSubmit} className="form">
			<h2 className='formTitle'>REJESTRACJA</h2>
			
			<div className="form-body">
				<p className="error-message first-error">{errorMessage}</p>
				<div className="login">
					<TextField
						id="login"
						type="text"
						variant="outlined"
						name="Login"
						value={login == null ? '' : login}
						onChange={(event) => {onInputChange(event)}}
						fullWidth
						required
						inputProps={{ minLength: 5 }}
						className="form__input"
						label="Login"
					/>
				</div>

				<div className="username">
					<TextField
						type="text"
						className="form__input"
						id="name"
						variant="outlined"
						value={name == null ? '' : name}
						required
						onChange={(event) => {onInputChange(event)}}
						fullWidth
						name="Name"
						label="Imię"
					/>
				</div>

				<div className="surname">
					<TextField
						type="text"
						className="form__input"
						id="surname"
						variant="outlined"
						value={surname == null ? '' : surname}
						required
						onChange={(event) => {onInputChange(event)}}
						fullWidth
						name="Surname"
						label="Nazwisko"
					/>
				</div>

				<div className="email">
					<TextField
						type="email"
						className="form__input"
						id="email"
						variant="outlined"
						inputProps={{ pattern: "^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" }}
						value={email == null ? '' : email}
						required
						onChange={(event) => {onInputChange(event)}}
						fullWidth
						name="email"
						label="Email"
					/>
					<p className="error-message">{formError.email}</p>
				</div>

				<div className="password">
					<TextField
						id="password"
						type="password"
						variant="outlined"
						name="password"
						value={password == null ? '' : password}
						onChange={(event) => {onInputChange(event)}}
						fullWidth
						required
						inputProps={{ minLength: 8 }}
						className="form__input"
						label="Hasło"
					/>
					<p className="error-message">{formError.password}</p>
				</div>

				<div className="confirm-password">
					<TextField
						type="password"
						className="form__input"
						id="confirmPassword"
						variant="outlined"
						value={confirmPassword == null ? '' : confirmPassword}
						required
						onChange={(event) => {onInputChange(event)}}
						inputProps={{ minLength: 8 }}
						fullWidth
						name="confirmPassword"
						label="Potwierdż hasło"
					/>
					<p className="error-message">{formError.confirmPassword}</p>
				</div>

				<div className="phone">
					<TextField
						type="tel"
						className="form__input"
						id="phone"
						variant="outlined"
						inputProps={{ pattern: "[+]{1}[0-9]{11,14}" }}
						value={phone == null ? '' : phone}
						required
						onChange={(event) => {onInputChange(event)}}
						fullWidth
						name="phone"
						label="Numer telefonu (wraz z +48)"
					/>
				</div>
			</div>

			<div className="footer">
				<button type="submit"  className="btn">Zarejestruj</button>
			</div>
			<p className="succesfull-message">{succesfullMessage}</p>
			<p className='link'>
				Masz już konto?{" "}
				<span className='linkBtn' onClick={gotoLoginPage}>Zaloguj się</span>
			</p>
		</form>
	</>
  	);
}

export default RegistrationForm;