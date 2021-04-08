import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { store } from 'react-notifications-component';
import Table from 'react-bootstrap/Table'
import DeleteIcon from '@material-ui/icons/Delete';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import jwt from 'jwt-decode'


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '20%',
        height:'20%'
      },
    },
  }));

export default function Products() {
    const token = localStorage.getItem('token')
    const decodedToken = jwt(token)
    const id = decodedToken._id
    const classes = useStyles();
    const {register,handleSubmit} = useForm()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('');
    const handleChange = (event) => {
        setCategory(event.target.value);
      };

    const onSubmit = async (data) =>{
        const formProduct = new FormData();
        formProduct.append("picture", data.picture[0]);
        formProduct.append("description", data.description);
        formProduct.append("price", data.price);
        formProduct.append("name", data.name);
        formProduct.append("id_category", category );

        if (decodedToken.isValid) {
            await axios.post('http://localhost:5000/product/addProduct',formProduct,{
         headers : {
             "auth-token" : token
         }
     })
        .then(function (response) {
            getProducts()
            store.addNotification({
                title: "Success !",
                message: "Product Added",
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
                });

          })
          .catch(function (error) {
            console.log(error);
    })
        } else {
            store.addNotification({
                title: "Error !",
                message: "Your account is not valid yet ! please wait for an admin to valid your account !",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
                });
        }
    }

    useEffect(() => {
        getProducts()
        getCategories()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

   async function getProducts() {
      await axios.get('http://localhost:5000/product/getProductsByUserId/'+id)
       .then(response =>{
           const allProducts = response.data
           setProducts(allProducts)
       }).catch(error =>{
           console.log(error);
       })
   }

   async function getCategories(){
       await axios.get('http://localhost:5000/category/getAll')
                  .then(response =>{
                      setCategories(response.data)
                  })
                  .catch(err=>{
                      console.log(err);
                  })
   }

   async function deleteProduct(id){
        await axios.delete('http://localhost:5000/product/deleteProduct/'+id)
        .then(function(response){
        getProducts()
        store.addNotification({
        title: "Success !",
        message: "Product Deleted",
        type: "success",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 5000,
            onScreen: true
        }
        });
        })
        .catch(function(error){
        console.log(error);
        })
   }
    return (
        <div className="ads-container">
        <h1 style={{textAlign:'center',color:'#487eb0'}}>Add Product</h1>
        <div className="add-ads-form"  onSubmit={handleSubmit(onSubmit)}>
            <form className={classes.root} noValidate autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
                <TextField name="name" label="Name" variant="outlined" inputRef={register} />
                <TextField name="picture" label="Product Picture" type="file"  InputLabelProps={{shrink: true}} variant="outlined" inputRef={register}/>
                <TextField name="description" label="Description"   variant="outlined" inputRef={register}/>
                <TextField name="price" label="Price" type="number" variant="outlined" inputRef={register}/>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Category"
                    name="id_category"
                    value={category}
                    onChange={handleChange}
                    >
                    {
                        categories.map(category=>{
                           return <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                        })
                    }


                    </Select>
               
                <Button variant="contained"  type="submit" style={{backgroundColor: '#487eb0' , color : 'white'}}>Add Product</Button>
                </FormControl>
            </form>
        </div>
        <h1 style={{textAlign:'center',color:'#487eb0'}}>Products List</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {products.map(product =>{
                  return <tr key={product._id}>
                  <td align="center"><img alt="" src={`/uploads/${product.picture}`}/></td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td><button   onClick={() => deleteProduct(product._id)}><DeleteIcon color="error"/></button></td>
                </tr>
                })
              }
            </tbody>
        </Table>
        
    </div>
    )
}
