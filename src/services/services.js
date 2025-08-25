import { taskUpload, taskDelete } from "../js/alerts";

//Get request
export async function getAllTask(endPointJson) {
    const contain = document.getElementById("contain");
    try {
        const response = await fetch(`${endPointJson}tasks`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error("There was an error in the response  request")
        }
        contain.innerHTML = "";
        data.forEach(element => {
            contain.innerHTML += `
               <article class=" w-50 max-h-70 h-54 m-5 p-4 bg-white rounded-xs shadow-md shadow-blue-200">
      <h3 class="text-blue-900 font-extrabold m-1">${element.title}</h3>
      <p>assigned: ${element.assigned}</p>
      <p>Due Date: ${element.duedate}</p>
      <p>Description: ${element.description}</p>
      <p>Status: <span class="text-yellow-400"> ${element.status} </span> </p>
      <div class="my-2">
        <button class="edit-task bg-yellow-400 px-2 py-0.5 rounded-xs hover:cursor-pointer hover:bg-blue-200 text-white font-bold" data-id-edit="${element.id}">Edit</button>
        <button class=" delete-task bg-red-500 px-2 py-0.5 rounded-xs hover:cursor-pointer hover:bg-blue-200 text-white font-bold" data-id-delete="${element.id}">Delete</button>
      </div>
    </article>
            `;
        });
        // Delete process

        const deleteId = document.querySelectorAll(".delete-task");
        console.log(deleteId)

        deleteId.forEach(element => {
            element.addEventListener("click", async (event) => {
                console.log("Funciona el click")
                sendUpdate.style.display = "none";
                const id = event.target.getAttribute("data-id-delete")
                // Alert
                taskDelete(endPointJson, id);
            });
        });

        //Edit process
        const editId = document.querySelectorAll(".edit-task");
        const sendUpdate = document.getElementById("send-update");
        const sendPost = document.getElementById("send-post");

        let idFound;
        sendPost.style.display = "block";
        sendUpdate.style.display = "none";
        console.log(editId);
        editId.forEach(element => {
            element.addEventListener("click", async (event) => {
                event.preventDefault();
                sendUpdate.style.display = "block ";
                sendPost.style.display = "none";
                const id = event.target.getAttribute("data-id-edit");
                idFound = id
                const titleTask = document.getElementById("title-task");
                const assignedTask = document.getElementById("assigned");
                const dueDataTask = document.getElementById("due-data");
                const descriptionTask = document.getElementById("description");
                const statusTask = document.getElementById("status");
                const datas = await getById(endPointJson, id)
                console.log(datas)
                titleTask.value = datas.title;
                assignedTask.value = datas.assigned;
                dueDataTask.value = datas.duedate;
                descriptionTask.value = datas.description;
                statusTask.value = datas.status;
            });
        });




        sendUpdate.addEventListener("click", async (event) => {
            event.preventDefault();
            await putTask(endPointJson, idFound);
            idFound = null
        });





    } catch (error) {
        console.error("Error in request getAllTask", error);
    }
}



// Post item

export async function postTask(endPointJson) {
    // HTML elements
    const titleTask = document.getElementById("title-task");
    const assignedTask = document.getElementById("assigned");
    const dueDataTask = document.getElementById("due-data");
    const descriptionTask = document.getElementById("description");
    const statusTask = document.getElementById("status");

    // New task
    const task = {
        title: titleTask.value || null,
        assigned: assignedTask.value || null,
        duedate: dueDataTask.value || null,
        description: descriptionTask.value || null,
        status: statusTask.value || null
    }

    try {
        const response = await fetch(`${endPointJson}tasks`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        if (response.ok) {
            console.log("The task has been added sussccesfully");
            // Alert
            taskUpload("The task has been added sussccesfully");
        } else {
            throw new Error("There was an error in the moment of upload the task ")
        }
        //This is for show the element without render the page
        await getAllTask(endPointJson);
    } catch (error) {
        console.error("Error in postTask", error)
    }
};


//getByid
async function getById(endPointJsonGet, idElementGet) {
    try {
        const response = await fetch(`${endPointJsonGet}tasks/${idElementGet}`);
        const data = await response.json();
        return data || null;

    } catch (error) {
        console.error("There was an error in response getById", error);
    }
}

// clearInputs

function clearInputs() {
    document.getElementById("title-task").value = "";
    document.getElementById("assigned").value = "";
    document.getElementById("due-data").value = "";
    document.getElementById("description").value = "";
    document.getElementById("status").value = "pending";
}



//Put task
async function putTask(endPointJson, idElement) {
    // HTML elements
    const titleTask = document.getElementById("title-task");
    const assignedTask = document.getElementById("assigned");
    const dueDataTask = document.getElementById("due-data");
    const descriptionTask = document.getElementById("description");
    const statusTask = document.getElementById("status");


    // New task
    const updateTask = {
        id: idElement,
        title: titleTask.value || null,
        assigned: assignedTask.value || null,
        duedate: dueDataTask.value || null,
        description: descriptionTask.value || null,
        status: statusTask.value || null
    }
    try {
        const response = await fetch(`${endPointJson}tasks/${idElement}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateTask)
        });
        if (response.ok) {
            console.log("The task has updated successfully");
            // Alerts
            taskUpload("The task has been updated sussccesfully");

        }
        await getAllTask(endPointJson);
        clearInputs()
    } catch (error) {
        console.error("There is an error in putTask", error);
    }
}

//Delete task

export async function deleteTask(endPointJson, idElement) {
    try {
        const response = await fetch(`${endPointJson}tasks/${idElement}`, {
            method: "DELETE",

        });
        if (response.ok) {
            console.log("The task has been deleted sussccesfully");

        } else {
            console.warn("There was an error in the moment of delete the task ");
        }
        getAllTask(endPointJson);
    } catch (error) {
        console.error("There is an erro in the response deleteTask", error);
    }
}


