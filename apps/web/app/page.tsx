import Login from "./(auth)/login/page";
import { cookies } from "next/headers";
import { logout } from "./(auth)/logout/action";


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
         <form action={logout}>
           <button type="submit" className="bg-red-500 p-1 rounded-lg text-white">Logout</button> 
         </form>
       </div>
    </>
  );
}
