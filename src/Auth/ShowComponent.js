import PublicRoute from "../routers/PublicRoute";
import PatientRoutes from "../routers/PatientRoutes";
import DoctorRoutes from "../routers/DoctorRoutes";
import AdminRoutes from "../routers/AdminRoutes";
import useAuth from "./useAuth";

const ShowComponent = () => {
  const auth = useAuth();
  
  let showComponent = null;
 
  if(auth.user === null){
    showComponent = <PublicRoute/>
  }else if(auth.user.role === "patient"){
    showComponent = <PatientRoutes/>
  }else if(auth.user.role === "doctor"){
    showComponent = <DoctorRoutes/>
  }else if(auth.user.role === "admin"){
    showComponent = <AdminRoutes/>
  }

  return showComponent; 
}

export default ShowComponent
