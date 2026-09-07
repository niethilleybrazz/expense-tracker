import { useContext } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    navigate("/login")
  }

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout()
      return
    }
    navigate(route)
  }

  return (
    <div className="w-64 h-[calc(100vh-61px)] border-r border-borders p-5 sticky top-15.25 z-30">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img src={user.profileImageUrl || ""} alt="Imagem de Perfil" className="w-20 h-20 rounded-full" />
        ) : <></>}

        <h5 className="text-text font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
          activeMenu === item.label ? "text-text bg-contrast-100" : "text-text-fade hover:text-text"  
          } py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl text-text" />
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default SideMenu