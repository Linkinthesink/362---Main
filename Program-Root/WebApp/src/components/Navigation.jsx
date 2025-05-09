import { Link } from "react-router-dom";
function Navigation(){
    return (
        <nav className ="app-nav">
            <Link to = "/">Home Page</Link>
            <Link to = "/Login">Login</Link>
            <Link to = "/GroupCollection">User Groups</Link>
        </nav>
    )
}

export default Navigation;