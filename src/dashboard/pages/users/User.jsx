
import NavBar from '../../nav/NavBar';
import SideNav from '../../nav/SideNav'
import Box from '@mui/material/Box';
import UserList from './UsersList';

export default function User() {

  return (
    <>
      <NavBar />
      <Box height={70} />
      <Box sx={{ display: 'flex' }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <UserList />
        </Box>
      </Box>

    </>
  )
}
