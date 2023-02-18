import logo from './logo.svg';
import './App.css';
import { Routes, Route, useParams, useAsyncError } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import {db} from "./firebase-config"
import { storage } from './firebase-config';
import { collection, getDocs,doc, setDoc,addDoc,query  } from "firebase/firestore"; 
import { getStorage,ref, uploadBytes,getDownloadURL,uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
function Product() {
  let params = useParams();
  let navigate = useNavigate();
  const [category,setcategory]=useState("")
  const [breedname,setbreedname]=useState("")
  const [age,setage]=useState("")
  const [about,setabout]=useState("")
  const [price,setprice]=useState("")
  const [status,setstatus]=useState("")
  const [image,setimage]=useState(null)
  
  const postpet=async()=>{
    let imageurlfire;
    if(category!="" && breedname!="" && age!="" &&about!=""&&price!=""&&status!=""&&image!=null){
          
         
         const storageRef = ref(storage, `products/${image.name}`);
         const uploadTask = await uploadBytesResumable(storageRef, image);
         await getDownloadURL(storageRef) .then((url) => {imageurlfire=url})
        
      const addata=await addDoc(collection(db, "SELLINGPRODUCTS"), {
        NAME:params.mobile,
        CONTACT:params.username,
        CATEGORY:category,
        PRODUCTNAME:breedname,
        EXPIRY:age,
        CERTIFIED:status,
        PRICE:price,
        COMMENTS:about,
        IMAGE:imageurlfire
    })
    if(addata.id==null){
        navigate("/failed");
    }
    else{
    
      navigate("/success");
    }
      
    }
    else{
      alert("Please fill out all the field's")
    }
  }
  return (
    <Container>
      <center><h2>Provide Details For Product</h2></center>
        <Form className='mt-5'>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Category</Form.Label>
                  <Form.Select defaultValue="select..." onChange={(e)=>setcategory(e.target.value)}>
                  <option>select Product breed...</option>
                    <option>Birds</option>
                    <option>Cat</option>
                    <option>Dogs</option>
                    <option>Ducks</option>
                    <option>Rabbits</option>
                    <option>Horse's</option>
                    <option>Cow's</option>
                    <option>Squril's</option>
                    <option>Parrot's</option>
                    <option>Hen's</option>
                  </Form.Select>
                </Form.Group>


              
           
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Product Name" onChange={(e)=>setbreedname(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Poduct Expiry</Form.Label>
              <Form.Control type="date" placeholder="Enter date" onChange={(e)=>setage(e.target.value)}/>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>About Product</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="short description" onChange={(e)=>setabout(e.target.value)}/>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter price" onChange={(e)=>setprice(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Status</Form.Label>
              <Form.Select defaultValue="Choose..." onChange={(e)=>setstatus(e.target.value)}>
              <option>select certification</option>
                <option>Not Certified</option>
                <option>Certified</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Pet Image</Form.Label>
              <Form.Control type="file" onChange={(e)=>setimage(e.target.files[0])} />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Seller Name</Form.Label>
              <Form.Control type="text" value={params.username} disabled />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Seller Mobile</Form.Label>
              <Form.Control type="text" value={params.mobile} disabled/>
            </Form.Group>
          </Row>

          <Button variant="primary"  onClick={postpet}>
            Submit
          </Button>
      </Form>
    </Container>
    
 
  );
}

export default Product;
