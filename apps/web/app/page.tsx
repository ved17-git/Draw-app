import Login from "./(auth)/login/page";
import { cookies } from "next/headers";
import LogoutButton from "../Components/LogoutButton";
import Room from "../Components/Room";


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
         <Room token={token.value}/>
       </div>
    </>
  );
}
