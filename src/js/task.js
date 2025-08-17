import { getAllTask, postTask, deleteTask } from "../services/services";

export function renderTaskManager() {
    // endPoint
    const endpoint = "/api/";

    // HTML element
    const send = document.getElementById("send-post");

    getAllTask(endpoint);

    send.addEventListener("click", async(event) => {
        event.preventDefault();
        console.log("Funciona")
        await postTask(endpoint);
    });



};