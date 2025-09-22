import { getAllTask, postTask, getPersons } from "../services/services";

export  async function renderTaskManager() {
    // endPoint
    const endpoint = "/api/";

    // HTML element
    const send = document.getElementById("send-post");

    const persons = await getPersons()
    let select = document.getElementById('assigned');
    persons.map(item=>{        
        let opt = document.createElement('option');
        opt.value = item.id;
        opt.textContent = item.name;
        select.appendChild(opt);
    })

    send.addEventListener("click", async(event) => {
        event.preventDefault();
        console.log("Funciona")
        await postTask(endpoint);
    });


};