import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
    <div>
        <ul>
            <li>
                <Link to={"/"}>Sign In</Link>
            </li>
            <li>
                <Link to={"/main"}>Main</Link>
            </li>
        </ul>
    </div>
);

export default Navigation;
