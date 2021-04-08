import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './components/admin components/AdminLogin'
import AdminDashboard from './components/admin components/AdminDashboard'
import SellerDashboard from './components/seller components/SellerDashboard'
import Home from './components/Buyer components/Home'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Buyer components/NavBar'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Admin" exact component={AdminLogin}/>
        <Route path="/Admin/Dashboard" exact component={AdminDashboard}/>
        <Route path="/Admin/Buyers" exact component={AdminDashboard}/>
        <Route path="/Admin/Sellers" exact component={AdminDashboard}/>
        <Route path="/Admin/Delivery" exact component={AdminDashboard}/>
        <Route path="/Admin/Admins" exact component={AdminDashboard}/>
        <Route path="/Seller/Dashboard" exact component={SellerDashboard}/>
        <Route path="/Seller/Info" exact component={SellerDashboard}/>
        <Route path="/Seller/Products" exact component={SellerDashboard}/>
        <Route path="/Seller/Packs" exact component={SellerDashboard}/>
        <Route path="/Home" exact component={Home}/>
        {/* <Route path="/Login" exact component={login}/> */}
        {/* <Route path="/Signup" exact component={signup}/> */}
        {/* <Route path="/ResetPassword" exact component={Home}/> */}
        <Route path="/navbar" exact component={Navbar}/>


      </Switch>
  </Router>
  );
}

export default App;
