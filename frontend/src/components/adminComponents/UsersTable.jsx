import { useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { AiFillDelete,AiFillEdit } from "react-icons/ai";
import {Button,Modal,Form as BootstrapForm} from 'react-bootstrap'

import { useAdminUpdateUserMutation } from '../../slices/adminApiSlice';
import { toast } from "react-toastify";
import { useDeleteUserDataMutation } from '../../slices/adminApiSlice';
const PROFILE_IMAGE_DIR_PATH = 'http://localhost:5000/UserProfileImages/'
import { RegisterModal } from './RegisterModal';
import './userTable.css'

export const UsersTable = ({users,refetchData}) => {
  console.log(users);
    const [showRegisterModal,setShowURegisterModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const [userIdToUpdate,setUserIdToUpdate] = useState('')
    const [userNameToUpdate,setUserNameToUpdate] = useState('')
    const [userEmailToUpdate,setUserEmailToUpdate] = useState('')
    const [showUpdateModal,setShowUpdateModal] = useState(false)

  const closeRegisterModal = () => {
    setShowURegisterModal(false)
  }

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
      };
    
      const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const [updateUserByAdmin, { isLoading:isUpdating }] = useAdminUpdateUserMutation();
    const [deleteUserByAdmin ] = useDeleteUserDataMutation();

     

    const handleOpenUpdateModal = (user)=>{

        setUserIdToUpdate(user._id)
        setUserNameToUpdate(user.name);
        setUserEmailToUpdate(user.email);
        setShowUpdateModal(true)
    }

    const handleDelete = async(user)=>{
        try{
        console.log(user._id);
        const responseFromApiCall = await deleteUserByAdmin({
            userId:user._id
        })
        console.log(responseFromApiCall);
        toast.success("User Deleted Succesfully")
        refetchData()
    } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }

    const handleUpdate = async () => {
        try {
            console.log(userIdToUpdate);
          const responseFromApiCall = await updateUserByAdmin({
            userId: userIdToUpdate,
            name: userNameToUpdate,
            email: userEmailToUpdate
          });
          toast.success("User Updated Successfully.");
          setUserIdToUpdate(null); // Clear the user ID to update
          setShowUpdateModal(false); // Close the update modal   
          refetchData()
        } catch (err) {
          toast.error(err?.data?.message || err?.error);
        }
      }
  return (
    <>
    <div className='containerS'>
    <div>
     <BootstrapForm>
        <BootstrapForm.Group className="mt-3" controlId="exampleForm.ControlInput1">
          <BootstrapForm.Label>Search users:</BootstrapForm.Label>
          <BootstrapForm.Control
            style={{ width: "500px" }}
            value={searchQuery}
            type="text"
            placeholder="Enter Name or email........"
            onChange={handleSearch}
          />
        </BootstrapForm.Group>
       
      </BootstrapForm>
      </div>
      <div className='right'> 
      <Button className="dark-button" size='sm'
             onClick={() => setShowURegisterModal(true)}
           >
            Add User
          </Button>
          </div>
    </div>

    <MDBTable align='middle'>
    <MDBTableHead>
      <tr>
        <th scope='col'>Name</th>
        <th scope='col'>Email</th>
        <th scope='col'>Edit</th>
        <th scope='col'>Delete</th>
      </tr>
    </MDBTableHead>
    <MDBTableBody>
    {filteredUsers.map((item, index) => (
      
      
      <tr key={index}>
        <td>
          <div className='d-flex align-items-center'>
            <img
              src={PROFILE_IMAGE_DIR_PATH+item.profileImageName}
              alt={item.name}
              style={{ width: '45px', height: '45px' }}
              className='rounded-circle'
            />
            <div className='ms-3'>
              <p className='fw-bold mb-1'>{item.name}</p>
            </div>
          </div>
        </td>
        <td>
          <p className='fw-normal mb-1'>{item.email}</p>
          </td>
          <td>
          <Button  variant="transparent" size='sm'
             onClick={() => handleOpenUpdateModal(item)}
           >
            <AiFillEdit/>
          </Button>
        </td>
        <td>
          <Button  variant="transparent"size='sm'
             onClick={() => handleDelete(item)}
           >
            <AiFillDelete/>
          </Button>
        </td>
       

      
      </tr>
      ))}
    </MDBTableBody>
  </MDBTable> 

<Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
<Modal.Header closeButton>
  <Modal.Title>Update User</Modal.Title>
</Modal.Header>
<Modal.Body>
  <BootstrapForm>
    <BootstrapForm.Group controlId="name">
      <BootstrapForm.Label>Name</BootstrapForm.Label>
      <BootstrapForm.Control
        type="text"
        value={userNameToUpdate}
        onChange={(e) =>
            setUserNameToUpdate(e.target.value)
        }
      />
    </BootstrapForm.Group>
    <BootstrapForm.Group controlId="email">
      <BootstrapForm.Label>Email</BootstrapForm.Label>
      <BootstrapForm.Control
        type="email"
        value={userEmailToUpdate}
        onChange={(e) =>
            setUserEmailToUpdate(e.target.value)
        }
      />
    </BootstrapForm.Group>
  </BootstrapForm>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
    Cancel
  </Button>
  <Button variant="primary"
   onClick={handleUpdate} disabled={isUpdating}
   >
    {isUpdating ? "Updating..." : "Update"}
  </Button>
</Modal.Footer>
</Modal>
{showRegisterModal && 
<RegisterModal 
showModal={showRegisterModal}
closeModal={closeRegisterModal}
refetchData={refetchData}

/>}

</>
  )
}