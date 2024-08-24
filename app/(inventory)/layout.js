import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";


export default function inventoryLayout({ children }) {
  let user = [
    {
      "name": "John Doe",
      "picture": "/img/user/Untitled-1.jpg"
    }
  ]
  
  return (
    <>
      <div>
        <Sidebar profile={user[0]} />
        <div className="relative md:ml-64">
          <div className="h-min">
            <Navbar data={user[0]} />
          </div>
          <div className="p-4 md:p-10 mx-auto w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
