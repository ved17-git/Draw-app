import Login from "./(auth)/login/page";
import { cookies } from "next/headers";
import { logout } from "./(auth)/logout/action";
import LogoutButton from "../Components/LogoutButton";


export default async function Home() {

  const cookieStore=await cookies()
  const token=cookieStore.get("token")

  if(!token){
    return <Login/>
  }


      
  return (
    <>
       <div>
         create room
         <LogoutButton/>
        
       </div>
    </>
  );
}
