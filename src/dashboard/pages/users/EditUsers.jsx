import { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { db } from "../../../firebase-config"; // importamos la conexion a firebase
import { collection, updateDoc, addDoc, getDocs, doc } from "firebase/firestore"; // importamos los metodos de firebase para agregar, actualizar y eliminar documentos
import Swal from 'sweetalert2';
import { useAppStore } from '../../../appStore'; // importamos el store de zustand
import { updateUsuario } from './api/apiUsuarios';


export default function EditUsers({ dates, closeEvent }) {
    console.log(dates);
  const [state, setState] = useState(dates);
  console.log(state);
   
    const handleSubmit = (event) => {
        event.preventDefault();
        updateUsuario(state);
      };
    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>
                Editar Usuarios...
            </Typography>
            <IconButton
                style={{ position: 'absolute', right: '0', top: '0' }}
                onClick={closeEvent}
            >
                <CloseIcon />
            </IconButton>
            <Box height={20} />
            <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-black">Nombre</label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          value={state.nombre}
          onChange={(event) =>
            setState({
              usuario: {
                ...state,
                nombre: event.target.value,
              },
            })
          }
        />
      </div>

      <div className="form-group">
        <label className="text-black">Correo</label>
        <br />
        <input
          type="text"
          className="form-control"
          value={state.correo}
          onChange={(event) =>
            setState({
                usuario: {
                ...state,
                correo: event.target.value,
              },
            })
          }
        />
      </div>
      
      <div className="form-group">
        <label className="text-black">Identificacion</label>
        <br />
        <input
          type="text"
          className="form-control"
          value={state.identificacion}
          onChange={(event) =>
            setState({
                usuario: {
                ...state,
                identificacion: event.target.value,
              },
            })
          }
        />
      </div>
      <div className="form-group">
        <label className="text-black">Edad</label>
        <br />
        <input
          type="text"
          className="form-control"
          value={state.edad}
          onChange={(event) =>
            setState({
                usuario: {
                ...state,
                edad: event.target.value,
              },
            })
          }
        />
      </div>
      <div className="form-group">
        <label className="text-black">Imagen</label>
        <input
          type="text"
          className="form-control"
          name="creador"
          value={state.img}
          onChange={(event) =>
            setState({
                usuario: {
                ...state,
                img: event.target.value,
              },
            })
          }
        />
      </div>
      <div className="container text-center">

        <button id='btn-enviar' type="submit" className="btn">
          Enviar
        </button>
      </div>
    </form>
            <Box sx={{ m: 4 }} />

        </>
    )
}
