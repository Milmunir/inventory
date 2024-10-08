import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import { PrismaClient } from "@prisma/client";
import { getactiveuser } from "../lib/session";
import Script from "next/script";

const prisma = new PrismaClient

export default async function inventoryLayout({ children }) {
  const user = await getactiveuser()
  return (
    <>
      {/* <Script src="https://cdn.jsdelivr.net/npm/chart.js" /> */}
      <div>
        <Sidebar profile={user} />
        <div className="relative md:ml-64">
          <div className="h-min">
            <Navbar data={user} />
          </div>
          <div className="p-4 md:p-10 mx-auto w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
