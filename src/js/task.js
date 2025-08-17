import { getAllTask } from "../services/services";

export function renderTaskManager(){
// endPoint
const endpoint = "/api/";

getAllTask(endpoint);

}