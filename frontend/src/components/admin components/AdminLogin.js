import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useHistory} from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios'

// import "toastr/build/toastr.css";
import './login.css';
import bg from './image/undraw_mobile_interface_wakp.svg';
import avatar from './image/undraw_profile_pic_ic5t (1).svg';





export default function Admin() {
  
  let history = useHistory();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [value, setValue] = useState('admin');
  
  if (localStorage.getItem('token')) {
    history.push('/Admin/Dashboard')
  }
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const onClick = async () =>{
    if (value === 'superadmin') {
    await axios.post('http://localhost:5000/superAdmin/login',{
        email  : email,
        password : password
    })
    .then(function (response) {
        localStorage.setItem('token', response.data)
        history.push('/Admin/Dashboard')
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
    } else
    if (value === 'admin') {
    await axios.post('http://localhost:5000/admin/login',{
        email  : email,
        password : password
    })
    .then(function (response) {
        localStorage.setItem('token', response.data)
        history.push('/Admin/Dashboard')
      })
      .catch(function (error) {

        console.log(error.response.data);


            
          });
    
    }
}

  return (

    <Grid className="container">

      <div className="img">
			<img src={bg}/>
		</div>
      <Grid >
        
        <div >
        	<img src={avatar} width="100px" className="title"/>
       		<h2 className="title">Welcome</h2>
        	<div className="login-content">
          <form  noValidate>

            <TextField      

              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              onChange={e=> setEmail(e.target.value)}
              
            />
            
            <TextField variant="outlined" margin="normal" required fullWidth  name="password" label="Password" type="password"id="password"
              onChange={e=> setPassword(e.target.value)}
            />
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange} row>
              <FormControlLabel value="admin" control={<Radio color="primary"/>} label="Admin" />
              <FormControlLabel value="superadmin" control={<Radio color="primary"/>} label="Super Admin" />
            </RadioGroup>
          </FormControl>
            <Button className="btn"
              type="button"
              fullWidth
              variant="contained"
          
              onClick={onClick}
            >
              Log in
            </Button>
           
          </form>
         
        </div>
         </div>
      </Grid>
    </Grid>

        
    

  );
}