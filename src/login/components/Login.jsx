import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await loginSchema.validate({ correo, password }, { abortEarly: false });

      if (true) {
        Swal.fire({
          icon: "success",
          title: "Genial!",
          text: "Ha iniciado sesión con éxito!",
          confirmButtonText: "Ok",
        }).then((r) => {
          if (true) {
            if (r.isConfirmed) {
              navigate("/dashboard")
            }
          }
        });
      }
    } catch (error) {
      let mensaje = "Por favor, complete todos los campos.";

      if (error.name === "ValidationError") {
        mensaje = error.errors[0];
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: mensaje,
      });
    }
  };

    function handleSuccess(response) {
      console.log(response);
    }
  
    function handleError(error) {
      console.log(error);
    }

  const loginSchema = yup.object().shape({
    correo: yup
      .string()
      .email("Ingrese un correo electrónico válido.")
      .required("Ingrese su correo electrónico."),
    password: yup.string().required("Ingrese su contraseña."),
  });

  return (
    <>
      <div id="loginBg">
        <MDBContainer fluid>
          <MDBRow className='d-flex justify-content-center align-items-center' style={{height:"auto"}}>
            <MDBCol col='12'>
              <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                  <h2 className="fw-bold mb-3 text-uppercase text-center" style={{ fontSize: "35px" }}>Inicio de sesión</h2>
                  <p className="text-white-50 mb-4">¡Ingrese su correo y contraseña!</p>
                  <form className="formLogin" onSubmit={handleSubmit}>
                    <div className="align-items-center justify-content-center">
                      <MDBInput wrapperClass='mb-4 mx-auto ms-auto w-100 ' labelClass='text-white' label='Correo'
                        id='formControlLg' type='email' size="lg"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)} />
                      <MDBInput wrapperClass='mb-2 mx-auto ms-auto w-100' labelClass='text-white' label='Contraseña'
                        id='formControlLg' type='password' size="lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    </div>
                    <p className="small mb-4 pb-lg-2"><a className="text-white-50" href="/">Forgot password?</a></p>
                    <div className="d-flex align-items-center justify-content-center">
                      <button className='ms-2 px-5' color='white' size='lg'
                        type="submit" style={{ backgroundColor: "#1b3641", width: "80%", color: "white", padding: "4%", borderRadius: "25px" }}>
                        Login
                      </button>
                    </div>
                  </form>
                  <div>
                    <p className="mb-0 mt-4">¿No tienes cuenta? <a href="/registro" className="fw-bold aRegistro">Registrate aquí</a></p>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
};