import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { login as loginUser} from "../../services/authService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await loginUser(email, password);

        if (response.error) {
            console.error(response.message);
            alert(response.message);
        }else{
            console.log(response);
            login(response);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>LMS Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;