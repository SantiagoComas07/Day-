import './src/css/style.css';

import {redirecTo, renderRouter} from './src/routes/router.js'



window.addEventListener("DOMContentLoaded", renderRouter);





// Logic for the change of view

document.querySelectorAll(".nav-link").forEach(link =>
    link.addEventListener("click", (e)=>{
        e.preventDefault();

        const path = link.getAttribute("href");
        redirecTo(path)

    })
);