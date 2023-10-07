import { Navbar, Nav, Container,NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';


const Header = () => {
  const {userInfo} = useSelector((state)=>state.auth)
  const [logoutApiCall] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async() =>{
    console.log('logout');
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/')
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>MERN App</Navbar.Brand>
        </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
            {userInfo ? (<>
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                <NavDropdown.Item>
                Profile
                </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                Logout
                </NavDropdown.Item>
          
              </NavDropdown>

            </>) :
            
             (<>
              <LinkContainer to='/login'> 
              <Nav.Link>
                <FaSignInAlt /> Sign In
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/register'> 
              <Nav.Link>
                <FaSignOutAlt /> Sign Up
              </Nav.Link>
            </LinkContainer>
            </>) }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;