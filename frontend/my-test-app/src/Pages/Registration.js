import React, {useState} from 'react';
import '../style.css';
import { useNavigate  } from 'react-router-dom';

function RegistrationForm() {
	const navigate = useNavigate();

	const [name, setName] = useState(null); //odpowiednik document.getElementById("demo").value
	const [surname, setSurname] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [phone, setPhone] = useState(null);

	const navigateToContacts = () => {
		// 👇️ navigate to /contacts
		navigate('/login');
	  };

	const handleInputChange = (e) => {
		const {id , value} = e.target;
		if(id === "firstName"){
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
	}

	const handleSubmit  = (e) => {
		console.log(name,surname,email,password,confirmPassword,phone);
		let obj = {
            name : name,
            surname:surname,
            email:email,
            password:password,
            phone:phone,
        }  
		console.log('obj', obj);
		fetch('http://localhost:9005/registerUser', {
			method: 'POST',
			headers:{
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(obj)
		}).then(function(response) {
			console.log(response)
			return response.json();
		});
 
   		e.preventDefault();
	}


  return (
	<>
		
		<form onSubmit={handleSubmit} className="form">
			<h1 className='formTitle'>REJESTRACJA</h1>
		<div className="form-body">
				<div className="username">
				<label className="form__label" htmlFor="firstName">Imię</label>
				<input
					type="text"
					className="form__input"
					id="firstName"
					value={name == null ? '' : name}
					placeholder="imię"
					onChange={(event) => handleInputChange(event)}
					/>
				</div>
				<div className="surname">
				<label className="form__label" htmlFor="surname">Nazwisko</label>
				<input
					type="text"
					className="form__input"
					id="surname"
					value={surname == null ? '' : surname}
					placeholder="Nazwisko"
					onChange={(event) => handleInputChange(event)}
					/>
				</div>
				<div className="email">
				<label className="form__label" htmlFor="email">E-mail</label>
				<input
					type="email"
					className="form__input"
					id="email"
					placeholder="Email"
					value={email == null ? '' : email}
					onChange={(event) => handleInputChange(event)}
				/>
				</div>
				<div className="password">
				<label className="form__label" htmlFor="password">Hasło</label>
				<input
					type="password"
					className="form__input"
					id="password"
					placeholder="Hasło"
					value={password == null ? '' : password}
					onChange={(event) => handleInputChange(event)}
				/>
				</div>
				<div className="confirm-password">
				<label className="form__label" htmlFor="confirmPassword">Potwierdź hasło</label>
				<input
					type="password"
					className="form__input"
					id="confirmPassword"
					placeholder="Hasło"
					value={confirmPassword == null ? '' : confirmPassword}
					onChange={(event) => handleInputChange(event)}
				/>
				</div>
				<div className="phone">
				<label className="form__label" htmlFor="phone">Telefon</label>
				<input
					type="tel"
					className="form__input"
					id="phone"
					placeholder="Telefon"
					pattern="[+]{1}[0-9]{11,14}" 
					required
					value={phone == null ? '' : phone}
					onChange={(event) => handleInputChange(event)}
				/>
				</div>
				<div className="footer">
					<button type="submit"  className="btn">Zarejestruj</button>
				</div>
		</div>
		</form>
		<div >
			<button onClick={navigateToContacts}>Zaloguj się</button>
		</div>
	</>
  );
}

export default RegistrationForm;