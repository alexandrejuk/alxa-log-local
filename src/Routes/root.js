import Home from '../Pages/Home'
import MyTeam from '../Pages/MyTeam'
import Implements from '../Pages/Implements/Manager'
import ImplementDetail from '../Pages/Implements/Detail'
import UpdateMyPassword from '../Pages/UpdateMyPassword'
import MyInfo from '../Pages/MyInfo'


const RootRoutes = [
  {
    component: Home,
    title: 'DASHBOARD',
    path: '/logged/dashboard',
    exact: true,
  },
  {
    component: MyInfo,
    title: 'MINHA CONTA',
    path: '/logged/account-myinfo',
    exact: true,
    goBack: true
  },
  {
    component: UpdateMyPassword,
    title: 'ALTERAR SENHA',
    path: '/logged/account-password',
    exact: true,
    goBack: true
  },
  {
    component: Implements,
    title: 'IMPLEMENTOS',
    path: '/logged/implement/manager',
    exact: true,
    goBack: false
  },
  {
    component: ImplementDetail,
    title: 'DETALHES',
    path: '/logged/implement/detail/:id',
    exact: true,
    goBack: true
  },
  {
    component: MyTeam,
    title: 'MINHA EQUIPE',
    path: '/logged/account-myteam',
    exact: true,
    goBack: true
  },
]

export default RootRoutes
