"use client"
import React from "react";
import { logout } from "../app/(auth)/logout/action";
import { useActionState } from "react";


function LogoutButton() {

  const [data,action,isLoading]=useActionState(logout,undefined)

  return (
    <>
        <form action={action}>
            <button type="submit" className="bg-red-500 p-2 rounded-lg text-white">
            {isLoading?"Loading...":"Logout"}
            </button> 
            {data? "logout error":null}
        </form>
    </>
  );
}

export default LogoutButton;
