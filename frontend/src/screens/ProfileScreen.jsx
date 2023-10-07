import { useState,useEffect } from "react";

import { Form, Button } from "react-bootstrap";
import FormContainer  from "../components/FormContainer";
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {setCredentials} from '../slices/authSlice'
import { useUpdateUserMutation } from "../slices/userApiSlice";
const PROFILE_IMAGE_DIR_PATH = 'http://localhost:5000/UserProfileImages/'
export const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [profileImageName, setProfileImageName] = useState("");


 
  const dispatch = useDispatch();

  const { userInfo } = useSelector( (state) => state.auth );

  const [updateUserProfile,{isLoading}] = useUpdateUserMutation()


  useEffect( () => {
    setName(userInfo.name)
    setEmail(userInfo.email)
    setProfileImageName(userInfo.profileImageName)
  }, [userInfo.setName,userInfo.setEmail,userInfo.profileImageName ] );


  const submitHandler = async (e) => {  
   
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[A-Za-z\s'-]+$/

    if(!nameRegex.test(name)){
      toast.error('Name is not valid')
      return
    }
    if(!emailRegex.test(email)){
      toast.error("Email Not Valid")
      return
    }
    if(password !== confPassword){
      toast.error('Password Do Not Matxh')
    }else{
        try {
          const formData = new FormData();

          formData.append('name', name);
          formData.append('email', email);
          formData.append('password', password);
          formData.append('profileImageName', profileImageName);
          console.log(formData);
      const responseFromApiCall = await updateUserProfile(formData).unwrap();
      console.log(responseFromApiCall);
      dispatch(setCredentials({...responseFromApiCall}))
      toast.success('Prfile Updated Succesfully')
        } catch (err) {
            toast.error( err?.data?.message || err?.error );
        }
   
    }
   
  };
  return (
    <FormContainer>
          {userInfo.profileImageName && (
        <img
          src={PROFILE_IMAGE_DIR_PATH + userInfo.profileImageName}
          alt={userInfo.name}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            marginTop: "5px",
            marginLeft: "115px",
            marginBottom: "10px",
          }}
        />
      )}
      <h1>Update Details</h1>
      <Form onSubmit={submitHandler}>

      <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>


    

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="profileImage">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setProfileImageName(e.target.files[0])}
              ></Form.Control>
            </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
            Update
        </Button>

      
      </Form>
    </FormContainer>
  );
};