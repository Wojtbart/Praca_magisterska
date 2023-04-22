import React, {useState} from 'react';
import '../style.css';
import { useNavigate  } from 'react-router-dom';

function RegistrationForm() {
	const navigate = useNavigate();

	const [name, setName] = useState(''); 
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [login, setLogin] = useState('');

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

			if(data.message==='Rejestracja nie powiodła się') alert(data.error);
            else {
				alert("Konto zostało utworzone pomyślnie!");
                navigate("/");
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

				<div className="login">
					<label className="form__label" htmlFor="login">Login</label>
					<input
						type="text"
						className="form__input"
						id="login"
						minLength={5}
						required
						value={login == null ? '' : login}
						onChange={(event) => {onInputChange(event)}}
					/>
				</div>

				<div className="username">
					<label className="form__label" htmlFor="name">Imię</label>
					<input
						type="text"
						className="form__input"
						id="name"
						value={name == null ? '' : name}
						required
						onChange={(event) => {onInputChange(event)}}
					/>
				</div>

				<div className="surname">
					<label className="form__label" htmlFor="surname">Nazwisko</label>
					<input
						type="text"
						className="form__input"
						id="surname"
						value={surname == null ? '' : surname}
						required
						onChange={(event) => {onInputChange(event)}}
					/>
				</div>

				<div className="email">
					<label className="form__label" htmlFor="email">E-mail</label>
					<input
						type="email"
						className="form__input"
						id="email"
						name='email'
						required
						pattern='^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$'
						value={email == null ? '' : email}
						onChange={(event) => {onInputChange(event)}}
					/>
					<p className="error-message">{formError.email}</p>
				</div>

				<div className="password">
					<label className="form__label" htmlFor="password">Hasło</label>
					<input
						type="password"
						className="form__input"
						id="password"
						minLength={8}		
						required			
						value={password == null ? '' : password}
						onChange={(event) => {onInputChange(event)}}
					/>
					<p className="error-message">{formError.password}</p>
				</div>

				<div className="confirm-password">
					<label className="form__label" htmlFor="confirmPassword">Potwierdź hasło</label>
					<input
						type="password"
						className="form__input"
						id="confirmPassword"
						minLength={8}	
						required
						value={confirmPassword == null ? '' : confirmPassword}
						onChange={(event) => {onInputChange(event)}}
					/>
					<p className="error-message">{formError.confirmPassword}</p>
				</div>

				<div className="phone">
					<label className="form__label" htmlFor="phone">Telefon (+48)</label>
					<input
						type="tel"
						className="form__input"
						id="phone"
						pattern="[+]{1}[0-9]{11,14}" 
						required
						value={phone == null ? '' : phone}
						onChange={(event) => {onInputChange(event)}}
					/>
				</div>
			</div>

			<div className="footer">
				<button type="submit"  className="btn">Zarejestruj</button>
			</div>
			<p className='link'>
				Masz już konto?{" "}
				<span className='linkBtn' onClick={gotoLoginPage}>Zaloguj się</span>
			</p>
		</form>
	</>
  	);
}

export default RegistrationForm;