import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export async function renderData(){
    const endpoint = "/api/";
    let statusData=[];
    const userCount = {};
    async function getDataTask(endPoint){
        try{
            const response = await fetch(`${endPoint}tasks`);
            const data = await response.json();
            console.log("data del getdata", data)
            data.forEach(task => {
                // Here i add the status of each task in an array
                statusData.push(task.status);
                // Here i count the users 
                const user = task.assigned || "Unassigned";
                userCount[user]= (userCount[user] || 0) + 1;

            });
        }catch(error){
            console.error("error:", error);
        }
    }


    await getDataTask(endpoint)


    // Here i create the Doughnut of status of the task
    console.log("Array status content: ", statusData)
    
    const completed =statusData.filter(condition => condition == "Completed").length;
    const pending =statusData.filter(condition => condition == "Pending").length;
    console.log("completed",completed)

  const ctx = document.getElementById('doughnut-status');

  // Guardar la instancia en una variable
  const taskChart = new Chart(ctx, {
      type: "doughnut",
      data:{
          labels: ["Done", "Pending"],
          datasets:[{
              data: [completed, pending],
              backgroundColor:["#F5E70F","#D6300D"]
          }]
      },
      options: {
          responsive: true,
          plugins:{
              legend: {position: "bottom"}
          }
      }
  });


// Here i create the 
const labels = Object.keys(userCount);
const data = Object.values(userCount);

const userAssignedctx = document.getElementById('bar-assigned');


const  assignedTask =  new Chart(userAssignedctx, {
    type: "bar",
    data:{
        labels: labels,
        datasets:[{
            label: "Numero de tareas",
            data: data,
            backgroundColor:["#F5E70F","#D6300D", "#002470"]
        }]
    },
    options:{
        responsive: true,
        scales:{
            y:{beginAtZero:true}
        }
    }
})

}
