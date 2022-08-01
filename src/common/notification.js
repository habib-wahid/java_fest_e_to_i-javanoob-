
import {Notification,NotificationManager} from "react-notifications";
export default function Notifications(){

    const createNotification = ()=>{
        return NotificationManager.info("this is info");
    }

    return(
        createNotification
    )
}