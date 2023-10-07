import { Navbar, Nav, Container,NavDropdown } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../../slices/adminAuthSlice';
import { useAdminLogoutMutation } from '../../slices/adminApiSlice';

const AdminHeader = () => {
  const {adminInfo} = useSelector((state)=>state.adminAuth)
  const [logoutApiCall] = useAdminLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async() =>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/admin')
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Admin</Navbar.Brand>
        </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
            {adminInfo ? (<>
              <NavDropdown title={adminInfo.email} id='username'>
                <LinkContainer to='/admin/get-user'>
                <NavDropdown.Item>
                Users List
                </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                Logout
                </NavDropdown.Item>
          
              </NavDropdown>

            </>) :
            
             (<>
              <LinkContainer to='admin/login'> 
              <Nav.Link>
                <FaSignInAlt /> Sign In
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

export default AdminHeader;