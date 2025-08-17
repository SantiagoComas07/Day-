


//Get request
export async function getAllTask(endPointJson){
    const contain = document.getElementById("contain");
    try{
        const response = await fetch(`${endPointJson}/tasks`);
        console.log(response)
        const data = await response.json();
        console.log(data)
        if(!response.ok){
            throw new Error("There was an error in the response  request")
        }
        //Here contain is initialized 
        contain.innerHTML = "";
        data.forEach(element => {
            contain.innerHTML +=`
               <article class=" w-50 max-h-70 h-54 m-5 p-4 bg-white rounded-xs shadow-md shadow-blue-200">
      <h3 class="text-blue-900 font-extrabold m-1">${element.title}</h3>
      <p>assigned: ${element.assigned}</p>
      <p>Due Date: ${element.duedate}</p>
      <p>Description: ${element.description}</p>
      <p>Status: ${element.status}</p>
      <div class="my-2">
        <button class="bg-yellow-400 px-2 py-0.5 rounded-xs hover:cursor-pointer hover:bg-blue-200 text-white font-bold" data-id-edit="${element.id}">Edit</button>
        <button class="bg-red-500 px-2 py-0.5 rounded-xs hover:cursor-pointer hover:bg-blue-200 text-white font-bold" data-id-delete="${element.id}">Delete</button>
      </div>
    </article>
            `;
        });
        console.log(contain)
    }catch(error){
        console.error("Error in request getAllTask", error);
    }
}
