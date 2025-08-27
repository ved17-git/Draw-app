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
         {/* <Room token={token.value}/> */}

         <div className="mt-3">
            <input type="text" placeholder="Join Room" className="border-[1px]" />
            <button type="submit" className="bg-black text-white">Join Room</button>
         </div>

       </div>
    </>
  );
}
