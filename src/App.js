import React, { Fragment, useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import Cita from './components/Cita'


function App() {
  //array de citas
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if (!citasIniciales) { 
    citasIniciales= []
  }
  const [citas, guardarCitas] = useState(citasIniciales)
  //citas en local storage

  //useEffect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => { 
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else { 
      localStorage.setItem('citas,', JSON.stringify([]))
    }
  },[citas])

  //funcion que tome las citas actuales y agrege la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }
  // funcion que elimina una cita por su id
  const eliminarCita = id => { 
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }
  //mensaje si no hay citas
  const titulo = citas.length ===0 ? 'No hay citas' : 'Administra tus citas'
  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className='container'>
        <div className='one-half column'>

          <Formulario
            crearCita={crearCita}
          />

        </div>
        <div className='one-half column'>
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita
              key={cita.id}
              cita={cita}
              eliminarCita= {eliminarCita}
            />
          ))}
        </div>

      </div>
    </Fragment>

  );
}

export default App;
