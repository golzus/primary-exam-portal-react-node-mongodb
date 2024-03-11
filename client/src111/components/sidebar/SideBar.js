import { MdDashboard,
   MdSupervisedUserCircle,
  MdPendingActions,
  MdOutlineSettings,
  MdHelpCenter,
  MdOutlineBusinessCenter,
  MdLogout
  } from "react-icons/md";
import "./sidebar.css";
import MenuLink from "./MenuLink";
const SideBar = () => {
  const menuItem=[{
    title:"pages",
    list:[
      {
        title:"ראשי",
        path:"/dash",
        icon:<MdDashboard/>   
        },
        {
          title:"users",
          path:"/dash/users",
          icon:<MdSupervisedUserCircle/>,
        },
        {
          title:"חברות",
          path:"/dash/companies",
          icon:<MdOutlineBusinessCenter/>,
        },
        {
          title:"פעולות",
          path:"/dash/actions",
          icon:<MdPendingActions/>
        }
    ]
  },
{
  title:"משתמש",
  list:[
    {
      title:"help",
      path:"/dash/help",
      icon:<MdHelpCenter/>
    }
  ]
}
];
const user={
username:"username",
fullname:"fullname",
company:"company",
image:""
}
return(
  <div className="side-bar">
    <div className="side-bar-user">
      <img src={user.image||"/novatat.JPG"}
      alt=""
      width={"50"}
      height={"50"} className="side-bar-user-image"/>
      <div className="side-bar-user-details">
        <span className="side-bar-user-username">{user.fullname}</span>
        <span className="side-bar-user-title">{user.company}</span>
      </div>
    </div>
    <ul className="side-bar-menu-list">
      {menuItem.map(cat=>(
<li key={cat.title}>
  <span className="side-bar-menu-cat">{cat.title}</span>
  {cat.list.map(item=>(
    <MenuLink item={item}key={item.title}/>
  ))}
</li>
      ))}
    </ul>
  </div>
)
};

export default SideBar;
