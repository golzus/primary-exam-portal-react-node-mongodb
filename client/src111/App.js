import{BrowserRouter as Router,Routes,Route, Outlet}from 'react-router-dom'
import SiteLayout from './components/Layout/site/SiteLayout'
import DashLoyout from './components/Layout/dash/DashLoyout'
import CompanyList from './features/companies/list/CompanyList'
import AddCompany from './features/companies/add/AddCompany'
import SingleCompany from './features/companies/view/SingleCompany'
const App = () => {
  return(
    <Router>
<Routes>
<Route path='/'element={<SiteLayout/>}>
  <Route index element={<h1>site</h1>} />
  <Route path='/dash' element={<DashLoyout/>}/>
  <Route index element={<h1>Dashboard</h1>}/>
 {/* <Route path="users" element={<Outlet/>}> */}
{/* <Route index element={<UserList/>}/> */}
{/* <Route path=':userId'element={<SingleUser/>}/> */}
{/* </Route> */}
<Route path='/dash/companies' element={<Outlet/>}>
<Route path='/dash/companies' element={<CompanyList/>}/>
  <Route path=':companyId' element={<SingleCompany/>}/>
  </Route>
  <Route path='/dash/companies/add' element={<AddCompany/>}/>

  </Route>
</Routes>


    </Router>
  )
}

export default App