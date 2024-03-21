
   
    import { Link, useNavigate } from "react-router-dom";
    import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import NenuLink from "../../sitdebar/NenuLink";
import { PiListPlusLight } from "react-icons/pi";
import { GoChecklist } from "react-icons/go";
const SideBarActions = () => {
    const {roles,company,fullname,image}=useAuth()

      const navigate = useNavigate();
      const studentMenuActions = [
        {
            title: "בחנים",
            list: [
              {
                title: "ראשי",
                path:"/dash/actions",
              },
              {
                title: "בחנים",
                path: "wordLsList",
              },
            ],
          }]
      const teacherMenuActions =
       [ {
          title: "בחנים",
          list: [
            {
              title: "ראשי",
              path: "/dash/actions",
            },
            {
              title: "יצירת בוחן חדש",
              path: "add",
              icon: <PiListPlusLight />
            },
            {
              title: "בחנים",
              path: "wordLsList",
              icon:<GoChecklist/>
            },
          ],
        }]
    const menuItems=roles==="Teacher"?teacherMenuActions:studentMenuActions
      // const user = {
      //   username: "username",
      //   fullname: "שם מלא ",
      //   company: "שם חברה ",
      //   image: "",
      // };
      console.log(menuItems,"menu");

      return (
        <div className="side-bar">
          <div className="side-bar-user">
            <img src={company?.image || "/logo612.jpg"} alt="" width="50" height="50" />
            {/* <img src={user.image || "/3.png"} alt="" width="50" height="50" /> */}
    
            <div className="side-bar-user-details">
              <span className="side-car-user-username">{fullname} </span>
              {/* <span className="side-car-user-username">{user.fullname} </span> */}
              <span className="side-car-user-title">{company?.name} </span>
              {/* <span className="side-car-user-title">{user.company} </span> */}
              <span className="side-car-user-title">{roles} </span>
              <Link to={"/dash/actions/choose"}>classAndSchool</Link>

            </div>
          </div>
          <ul className="side-bar-menu-list">
    {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="side-bar-menu-cat"> {cat.title} </span>
            {cat.list.map((itme) => (
              <NenuLink itme={itme} key={itme.title} />
            ))}
          </li>
        ))}

          </ul>
          <button  className="side-bar-logout">
          <Link to={"/dash"}>
            יציאה
            </Link>
          </button>
        </div>
      );
    
    };
    
        

export default SideBarActions
