import  { useEffect, useState } from 'react'
import { UsersTable } from '../../components/adminComponents/UsersTable.jsx'
import { useGetUserDataMutation } from '../../slices/adminApiSlice.js'


export const UserManagementScreen = () => {
  const [usersData, setUsersData] = useState([])
  const [refetch,setRefetch] = useState(false)

  const refetchData = ()=>{
    setRefetch(!refetch)
  }

  const [userDataFromApi, { isLoading }] = useGetUserDataMutation();


  useEffect(() => {
    
    try {

      const fetchData = async () => {
        const responseFromApiCall = await userDataFromApi();
        const usersArray = responseFromApiCall.data;
        setUsersData(usersArray);
      };
  
      fetchData();
    } catch (error) {
      toast.error(error);
      console.error("Error fetching users:", error);

    }

  }, [refetch]);

  return (
    <>
        <UsersTable users={usersData} 
          refetchData = {refetchData}
        />
    </>
  )
}