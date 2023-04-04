import React from 'react';
import './App.css';

function Header() {

    const logout = () => {
        localStorage.clear();
        window.location.reload(false);        
    };

    const isLoggedIn = localStorage.getItem('token') ? true : false;

    return(
        <nav className="bg-dark navbar-dark navbar">
            <div className="col-12 d-flex justify-content-center text-white">
                <h3 className='HeaderTitle' >Notificationer :)</h3>
            

                { isLoggedIn ? (
                <>
                    {/* <div className="row col-2 d-flex justify-content-right text-white"> */}
                        {/* <h6 >Użytkownik zalogowany</h6> */}
                        <button className='logout' onClick={logout}>Wyloguj się</button> 
                    {/* </div> */}
                </>
                ):(
                    <></>
                )}
            </div>
        </nav>
    );
}
export default Header;