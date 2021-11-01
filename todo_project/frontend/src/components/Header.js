import React from "react";

const Menu_element = ({menu_item}) => {
    return (
        <div href={menu_item.link}>
            {menu_item.name}
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