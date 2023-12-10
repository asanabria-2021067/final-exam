import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { useState, useEffect } from 'react';


import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../../firebase-config"; // importamos la conexion a firebase 
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"; // importamos los metodos de firebase para agregar, actualizar y eliminar documentos
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from '@mui/material/Modal';
import AddUsers from './AddUsers';
import EditUsers from './EditUsers';
import { useAppStore } from '../../../appStore'; // importamos el store de zustand: useAppStore y setRows zustand store: estado global de la aplicacion 
import Skeleton from '@mui/material/Skeleton';
import { Usuarios } from '../../db/Usuarios';
import { apiUsuarios } from './api/apiUsuarios';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // 10, 25, 100 // cantidad de filas por pagina
  const empCollectionRef = collection(db, "products"); // referencia a la coleccion de firebase
  const [formid, setFormid] = useState("");
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const handleOpen = () => setOpen(true); // funcion para abrir el modal
  const handleEditOpen = () => setEditOpen(true); // funcion editar 
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setUserEdit({
    nombre: null 
  });
  const [rows, setRows] = useState([])
  const [userEdit, setUserEdit] = useState({})


  const viewUsuariosList = async () => {
    const getListUsuariosFromApi = await apiUsuarios();
    setRows(getListUsuariosFromApi);
  };

  useEffect(() => {
    viewUsuariosList();
  }, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        const updatedUsers = Usuarios.filter((user) => user.id !== id);

    // Actualiza el arreglo local
    setRows(updatedUsers);
  
    // Muestra una alerta
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    viewUsuariosList();
      }
    });
  };


  const filterData = (v) => { // filtrar los datos de la tabla
    if (v) { // si el valor es diferente de vacio entonces filtrar
      setRows([v]); // guardar el valor en rows para mostrarlo en la tabla
    } else {
      setRows([]); // si el valor es vacio entonces mostrar todos los datos
      viewUsuariosList(); // actualizar la lista de usuarios
    }
  };

  // -------------- Editar datos -----------------
const handleEditDates = async(value) =>{
  console.log(value);
  await setUserEdit(value)
}


  return (
    <>
      <div>
        {/* Modal para Crear producto */}
        <Modal
          open={open}
          //onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddUsers closeEvent={handleClose} />
          </Box>
        </Modal>

        {/* Modal para Editar producto */}
        <Modal
          open={userEdit.nombre != null}
          //onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditUsers closeEvent={handleEditClose} dates={userEdit}  />
          </Box>
        </Modal>
      </div>

      {rows.length > 0 && (
        <Paper sx={{ width: '98%', overflow: 'hidden', padding: "12px" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px", textAlign:"center", fontSize: "30px" }}
          >
            Users List
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" display={"flex"} alignItems={"center"} justifyContent={"center"} spacing={1} className="mx-5 mb-2">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
              Add
            </Button>
          </Stack>
          <Box height={10} />

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                <TableCell
                    align='left'
                    style={{ minWidth: "100px" }}
                  >
                    Img
                  </TableCell>
                  <TableCell
                    align='left'
                    style={{ minWidth: "100px" }}
                  >
                    Nombre
                  </TableCell>
                  <TableCell
                    align='left'
                    style={{ minWidth: "100px" }}
                  >
                    Edad
                  </TableCell>
                  <TableCell
                    align='left'
                    style={{ minWidth: "100px" }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    align='left'
                    style={{ minWidth: "100px" }}
                  >
                    Actions
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}  >
                        <TableCell align='left'>
                          <img src={row.img} alt="..." className='img-rounded' style={{width: "50px", height: "50px", borderRadius:"50%"}} />
                        </TableCell>
                        <TableCell align='left'>
                          {row.nombre}
                        </TableCell>
                        <TableCell align='left'>
                          {row.edad}
                        </TableCell>
                        <TableCell align='left'>
                          {row.correo}
                        </TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "darkblue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={() =>
                                handleEditDates(row)
                              }
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      {
        rows.length === 0 && (
          <>
            <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
              <Box height={20} />
              <Skeleton variant='retangular' width={'100%'} height={30} />
              <Box height={40} />
              <Skeleton variant='retangular' width={'100%'} height={60} />
              <Box height={20} />
              <Skeleton variant='retangular' width={'100%'} height={60} />
              <Box height={20} />
              <Skeleton variant='retangular' width={'100%'} height={60} />
              <Box height={20} />
              <Skeleton variant='retangular' width={'100%'} height={60} />
              <Box height={20} />
              <Skeleton variant='retangular' width={'100%'} height={60} />
              <Box height={20} />
            </Paper>
          </>
        )
      }
    </>
  );
}