import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Route } from 'react-router-dom';
import Stats from './Stats'
import Info from './Info';
import Products from './Products';
import Pack from './Pack';
import { Link } from "react-router-dom";







export default function SellerDashboard({history}) {

  const logOut = () => {

    history.push('/Home')
    localStorage.removeItem("token");

    };

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
            
            <li><Link to="/Seller/Dashboard">Statistics</Link></li>
            <li><Link to="/Seller/Info">Info Seller</Link></li>
            <li><Link to="/Seller/Products">Products</Link></li>
            <li><Link to="/Seller/Packs">Packs</Link></li>


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
        <Route path="#" exact component={Stats}/>
        <Route path="/Seller/Info" exact component={Info}/>
       <Route path="/Seller/Products" exact component={Products}/>
       <Route path="/Seller/Packs" exact component={Pack}/>
            </Grid>
      </div>
    </div>
</div>
      </div>

  );
}