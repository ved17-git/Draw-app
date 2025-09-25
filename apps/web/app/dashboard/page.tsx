"use server";
import { BACKEND_URL } from "app/config";
import { cookies } from "next/headers";
import AllRooms from "./DashboardPage";

async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${BACKEND_URL}/getRooms`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    console.log("data not found");
    return;
  }

  const data = await res.json();
  const existingRooms=data.room

  return (
    <>
      <AllRooms existingRooms={existingRooms} />
    </>
  );
}

export default Dashboard;
