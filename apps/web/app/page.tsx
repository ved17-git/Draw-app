import Login from "./(auth)/login/page";
import { cookies } from "next/headers";
import LogoutButton from "../Components/LogoutButton";
import JoinRoom from "../Components/JoinRoom/JoinRoom";


export default async function Home() {

  const cookieStore=await cookies()
  const token=cookieStore.get("token")

  if(!token){
    return <Login/>
  }


      
  return (
    <>
       <div>
          
         <LogoutButton/>


         <JoinRoom token={token.value}/>



       </div>
    </>
  );
}
