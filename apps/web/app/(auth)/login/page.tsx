import { login } from "./actions";


function Login() {
  return (
    <>
      <div>Login</div>
        
    <form action={login}>
         
         <input type="email" name="email" placeholder="email" />
         <input type="password" name="password" placeholder="password" />
         <button type="submit" className="bg-black text-white p-2 rounded-xl">Login</button>

    </form>
       
    </>
  );
}

export default Login;
