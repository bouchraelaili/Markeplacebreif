import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Categories from './Categories'
import Sellers from './Sellers';
import Buyers from './Buyers';
import DeliveryMen from './DeliveryMen';
import { Link,Route } from "react-router-dom";





export default function AdminDashboard({history}) {

  const logOut = () => {

    history.push('/Admin')
    localStorage.removeItem("token");

    };
  
  if (!localStorage.getItem("token")) {
    history.push('/Admin')
  }

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
   
      

        <div>
           <div className="wrapper">
    <div className="sidebar">
        <h2>Admin</h2>
        <ul>
            
            <li><Link to="/Admin/Sellers">Sellers</Link></li>
            <li><Link to="/Admin/Buyers">Buyers</Link></li>
            <li><Link to="/Admin/Delivery">Delivery</Link></li>
            <li><Link to="/Admin/Dashboard">Category</Link></li>
            <li><Link to="/Admin/Admins">Admins</Link></li>
        </ul> 
        <div className="social_media">
        <IconButton color="inherit" onClick={logOut}>
              <ExitToAppIcon /> Log out
        </IconButton>
      </div>
        
    </div>
    <div className="main_content">
        <div className="header">
      
          </div>  
        <div className="info">
        <Grid container spacing={3}>
            <Route path="/Admin/Dashboard" exact component={Categories}/>
            <Route path="/Admin/Sellers" exact component={Sellers}/>
            <Route path="/Admin/Buyers" exact component={Buyers}/>
            <Route path="/Admin/Delivery" exact component={DeliveryMen}/>

            </Grid>
      </div>
    </div>
</div>
           
               
        </div>



  );
}