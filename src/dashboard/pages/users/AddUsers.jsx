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
import { collection, addDoc, getDocs } from "firebase/firestore"; // importamos los metodos de firebase para agregar, actualizar y eliminar documentos
import Swal from 'sweetalert2';
import { useAppStore } from '../../../appStore'; // importamos el store de zustand: useAppStore
import { createUsuario } from './api/apiUsuarios';


export default function AddUsers({ closeEvent }) {

    const [agregar, setAgregar] = useState({
        nombre: "", 
        correo: "", 
        password: "", 
        edad: 0,
        identificacion: "",
        img: ""
    });
    console.log(agregar)

    const handleSubmit = async(event) => {
        event.preventDefault();
        const response= await createUsuario(agregar);
        if (response){
            Swal.fire({
                icon: "success",
                title: "Se guardo el usuario exitosamente"
            })
        }
    };


    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>
                Agregar Usuario
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
                            onChange={(event) =>
                                setAgregar({
                                    usuario: {
                                        ...agregar.usuario,
                                        nombre: event.target.value,
                                    },
                                })
                            }required
                        />
                    </div>

                    <div className="form-group">
                        <label className="text-black">Correo</label>
                        <br />
                        <input
                            type="email"
                            className="form-control"
                            onChange={(event) =>
                                setAgregar({
                                    usuario: {
                                        ...agregar.usuario,
                                        correo: event.target.value,
                                    },
                                })
                            }
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="text-black">Password</label>
                        <br />
                        <input
                            type="password"
                            className="form-control"
                            onChange={(event) =>
                                setAgregar({
                                    usuario: {
                                        ...agregar.usuario,
                                        password: event.target.value,
                                    },
                                })
                            }required
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-black">Identificacion</label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                                setAgregar({
                                    usuario: {
                                        ...agregar.usuario,
                                        identificacion: event.target.value,
                                    },
                                })
                            }required
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-black">Edad</label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={(event) =>
                                setAgregar({
                                    usuario: {
                                        ...agregar.usuario,
                                        edad: event.target.value,
                                    },
                                })
                            }required
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-black">Imagen</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                                setAgregar({
                                    usuario: {
                                        ...agregar.usuario,
                                        img: event.target.value,
                                    },
                                })
                            }required
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
