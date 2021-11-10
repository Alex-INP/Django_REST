import React from "react";
import { Link } from "react-router-dom";

const Menu_element = ({menu_item}) => {
    return (
        <div>
            <Link to={menu_item.link}> {menu_item.name} </Link>
        </div>
    )
}

const Header = ({all_menu_items}) =>{
    return (
        <div class="header">
            {all_menu_items.map((item) => < Menu_element menu_item={item} />)}
        </div>
    )
}

export default Header