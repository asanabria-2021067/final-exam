import axios from "axios";
import Swal from "sweetalert2";

const URL = "https://proyecto-gestor-hoteles-back-end-gilt.vercel.app/api/usuarios/";

export const apiUsuarios = async () => {
  try {
    const listaUsuarios = await axios.get(`${URL}mostrar`);
    console.log(listaUsuarios.data);
    return listaUsuarios.data;
  } catch (error) {
    console.error(error);
  }
};

export const createUsuario = async (nombre, correo, password, edad, img, identificacion, rol ) => {
    console.log(nombre.usuario);
    try {
      const { usuarioGuardadoDB } = await axios.post(
        `${URL}agregarSuperAdmin`,
        {
          nombre: nombre.usuario.nombre,
           edad: nombre.usuario.edad,
           correo: nombre.usuario.correo,
            password: nombre.usuario.password,
             identificacion: nombre.usuario.identificacion, 
          img: nombre.usuario.img
        },
        );
      return true;
    } catch (error){
        console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo agregar el usuario.",
      });
    }
  };
  
  export const updateUsuario = async (id,
    nombre, precio, descripcion, 
  ) => {
    console.log(id);
    try {
      const usuarioEditado = await axios.put(
        `${URL}editarSuperAdmin/${id.id}`,
        {
          nombre: id.nombre,
          id: id.id,
          edad: id.edad, 
          correo: id.descripcion, 
          password: id.password, 
          identificacion: id.identificacion, 
          img: id.img, 
          rol: id.rol
        }
      );
      return usuarioEditado.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo editar el servicio!",
      });
    }
  };
  