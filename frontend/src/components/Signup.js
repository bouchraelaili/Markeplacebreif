import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { store } from 'react-notifications-component';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { useHistory} from "react-router-dom";
import axios from 'axios'
// import './admin components/login.css';
import bg from './seller components/image/undraw_mobile_interface_wakp.svg';
import avatar from './seller components/image/undraw_profile_pic_ic5t (1).svg';





export default function Signup() {
  let history = useHistory();
  const [value, setValue] = useState('seller');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () =>{

    if (value === 'seller') {
        await axios.post('http://localhost:5000/seller/register',{
            full_name: name,
            email: email,
            phone: phone,
            password:password,
            address: address,
            identity: identity
            })
            .then(function (response) {
                store.addNotification({
                    title: "Success !",
                    message: "Your account has been created !",
                    type: "success",
                    insert: "top",
                    container: "bottom-right",
                
                  
                    });
                    history.push('/Seller/Dashboard')

                })
                .catch(function (error) {
                    store.addNotification({
                        title: "Error !",
                        type: "danger",
                        insert: "top",
                        container: "bottom-right",
                      
                       
                        });
        })
    } else if(value === 'buyer'){
        await axios.post('http://localhost:5000/buyer/register',{
            full_name: name,
            email: email,
            phone: phone,
            address: address,
            password: password
            })
            .then(function (response) {
                store.addNotification({
                    title: "Success !",
                    message: "Your account has been created !!!!!",
                    type: "success",
                    insert: "top",
                    container: "bottom-right",
                   
                    
                    });
                    history.push('/Buyer/Dashboard')

                })
                .catch(function (error) {
                    store.addNotification({
                        title: "Error !",
                        message: error.response.data,
                        type: "danger",
                        insert: "top",
                        container: "bottom-right",
                        
                        });
        })
    }
   }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="container" >

      <div className="img" >
			<img src={bg}/>
	</div>
      <Grid >
        
        <div >
        	<img src={avatar} width="100px" className="title"/>
       		<h2 className="title"> Sign up</h2>
        	<div className="login-content"></div>
      
        <form  noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="full_name"
            label="Full Name"
            name="full_name"
            autoFocus
            onChange={(event)=>{setName(event.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            autoFocus
            onChange={(event)=>{setPhone(event.target.value)}}
          />
          <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event)=>{setPassword(event.target.value)}}
              />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoFocus
            onChange={(event)=>{setAddress(event.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event)=>{setEmail(event.target.value)}}
          />
         {
             value==='buyer' ? (
                <FormControl
                
              />
             ) : (
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fiscal identity"
                label="Fiscal Identity"
                name="fiscal identity"
                autoFocus
                onChange={(event)=>{setIdentity(event.target.value)}}
              />
             )
         }
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange} row>
              <FormControlLabel value="buyer" control={<Radio style={{ color: '#1a1a1a'}}/>} label="Buyer" />
              <FormControlLabel value="seller" control={<Radio style={{ color: '#1a1a1a'}}/>} label="Seller" />
            </RadioGroup>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className="btn"
            onClick={onSubmit}
          >
            Sign up
          </Button>
        </form>
        </div>
      </Grid>
    </div>
  );
}