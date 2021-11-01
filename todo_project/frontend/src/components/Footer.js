import React from "react";

const Footer = ({footer_texts}) =>{
    return(
        <div class="footer">
            <div>
                Adress: {footer_texts.adress}
            </div>
            <div>
                Phone: {footer_texts.phone}
            </div>
            <div>
                Other: {footer_texts.other}    
            </div>   
        </div>
    )
}

export default Footer