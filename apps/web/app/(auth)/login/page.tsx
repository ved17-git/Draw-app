"use client"
import { login } from "./actions";
import { useActionState } from "react";

function Login() {
   
   const [data, action, isLoading]=useActionState(login, undefined)

  return (
    <>
      <div>Login</div>
        
            <form action={action}>
                <input type="email" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <button type="submit" className="bg-black text-white p-2 rounded-xl">
                {isLoading? "Loading...":"Login"}
                </button>
                {data? data:null}
            </form>
       
    </>
  );
}

export default Login;
