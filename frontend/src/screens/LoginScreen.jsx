import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import {useDispatch,useSelector} from 'react-redux'
import FormContainer  from "../components/FormContainer.jsx";
import { useLoginMutation } from "../slices/userApiSlice.js";
import {setCredentials} from '../slices/authSlice.js'
import {toast} from 'react-toastify'
import Loader from "../components/Loader";


export const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector( (state) => state.auth );

  useEffect( () => {

    if(userInfo) {

      navigate('/profile');

    }

  }, [ navigate, userInfo ] );

  const submitHandler = async (e) => {

    e.preventDefault();

    try {
      
      const responseFromApiCall = await login( { email, password } ).unwrap();

      dispatch( setCredentials( { ...responseFromApiCall } ) );
      
      navigate('/');

    }catch(err){

      toast.error( err?.data?.message || err?.error );

    }

  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3"> Sign In </Button>
      </Form>

      { isLoading && <> <Loader/> </>}

      <Row className="py-3">
        <Col> New Customer? <Link to={`/register`}>Register</Link></Col>
      </Row>
      
    </FormContainer>
  );
};

export default LoginScreen;