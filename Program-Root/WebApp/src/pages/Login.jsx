import { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';

export const LoginPage = () => {

    const [userName, setName] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();

    const login = async () => {
        const user = {userName, password}
        const response = await fetch(
            '/users' + '?userName=' + userName + '&password=' + password, {
                method: 'GET',
                }
        );
        if(response.status === 200){
            alert("Sucsessfully logged In");
        } else{
            alert(`Failed to log in ${response.status}`)
        }
        navigate('/GroupCollection');
    
    };

    return (
        <div className="page">
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Enter Username"
                value={userName}
                onChange={e => setName(e.target.value)} /> <br/> 
            <input
                type="text"
                value={password}
                placeholder="Enter Password"
                onChange={e => setPassword(e.target.value)} /> <br/> 
            <button
                onClick={login}
            >Login</button>
        </div>
    );
}

export default LoginPage;