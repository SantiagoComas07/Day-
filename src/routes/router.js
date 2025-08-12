import {renderHome} from '../js/home.js';
import {renderNotFound} from '../js/notFound.js';
import {renderTaskManager} from '../js/task.js';

const routes = {
    "/": {
        path: "src/views/home.html",
        setup: renderHome
    },
    "/task": {
        path: "src/views/task-manager.html",
        setup: renderTaskManager
    },
    "/notFound":{
        path: "src/views/notFound.html",
        setup: renderNotFound
    }
};


export  async function renderRouter(){
    const app = document.getElementById("app");
    const path = window.location.pathname;
    const route = routes[path] || routes['/notFound'];
    try{
        const response = await fetch(route.path);
        const content = await response.text();

        if(!response.ok){
            throw new Error("There is an error with the response");
        };


        app.innerHTML="";
        app.innerHTML= content;


        if(route.setup){
            route.setup();
        };

    }catch(error){
        console.error("There is an error in the renderRouter: ", error);
    }
}


export function redirecTo(path){
    window.history.pushState({},"",`${path}`);
    return renderRouter();
}

window.addEventListener("popstate", renderRouter);



