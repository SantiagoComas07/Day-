
import Swal from 'sweetalert2';
import { deleteTask } from '../services/services';



export function taskUpload(titleAlert){
    Swal.fire({
  title: titleAlert,
  icon: "success",
  draggable: true
});
}


// Manejar el delete y cancel
export function taskDelete(endPointJson, id){
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async (result) => {
  if (result.isConfirmed) {
    await deleteTask(endPointJson, id);
    Swal.fire({
      title: "Deleted!",
      text: "Your task has been deleted.",
      icon: "success"
    });
  }
});
}