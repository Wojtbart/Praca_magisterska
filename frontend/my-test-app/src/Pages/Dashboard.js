import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

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
        navigate("/");
    };
    
    return (
        <div className='dashboard'>
            <h2 style={{ marginBottom: "30px" }}>Howdy, {localStorage.getItem("login")}</h2>
            <button className='signOutBtn' onClick={handleSignOut}>
                WYLOGUJ SIE
            </button>
        </div>
    ); 
};
export default Dashboard;