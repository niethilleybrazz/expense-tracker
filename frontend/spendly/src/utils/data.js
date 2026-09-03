import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut ,
} from 'react-icons/lu'

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard"
    },
    {
        id: "02",
        label: "Renda/Entradas",
        icon: LuWalletMinimal,
        path: "/income"
    },
    {
        id: "03",
        label: "Despezas",
        icon: LuHandCoins,
        path: "/expense"
    },
    {
        id: "06",
        label: "Sair",
        icon: LuLogOut,
        path: "logout"
    }
]