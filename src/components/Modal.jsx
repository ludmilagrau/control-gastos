import CerrarBtn from '../img/cerrar.svg'
import {useState, useEffect} from 'react';
import Mensaje from './Mensaje';

const Modal = ({
  setModal, 
  animarModal, 
  setAnimarModal, 
  guardarGasto, 
  editarGasto,
  setEditarGasto
}) => {

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [id, setId] = useState('')
  const [fecha, setFecha] = useState('');

useEffect(() => {
  if(Object.keys(editarGasto).length > 0){
      setNombre(editarGasto.nombre);
      setCantidad(editarGasto.cantidad);
      setCategoria(editarGasto.categoria);
      setId(editarGasto.id);
      setFecha(editarGasto.fecha);
    }
}, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    if([nombre, cantidad, categoria].includes('')){
      setMensaje('Todos los campos son obligatorios')
      return;
    }

    guardarGasto({nombre, 
                  cantidad, 
                  categoria,
                  id,
                  fecha
                });
                
    ocultarModal();
  }

  const ocultarModal = () => {
    setAnimarModal(false);
    setEditarGasto({});
    setTimeout(() => {
     setModal(false)
    }, 500);

  }

  

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img 
        src={CerrarBtn}
        alt='cerrar modal'
        onClick={ocultarModal}

        />
      </div>  

      <form className={`formulario ${animarModal ? 'animar' : 'cerrar'}`} onSubmit={handleSubmit}>
        <legend>{editarGasto.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>  
        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>} 
        <div className='campo'>
          <label htmlFor='nombre'>Gasto</label>
          <input
          id='nombre'
          type='text'
          placeholder='Añade el nombre del gasto'
          onChange={(e) => setNombre(e.target.value)}
          value={nombre}
          />
        </div>
        <div className='campo'>
          <label htmlFor='cantidad'>Cantidad</label>
          <input
          id='cantidad'
          type='number'
          placeholder='Añade la cantidad'
          onChange={(e) => setCantidad(Number(e.target.value))}
          value={cantidad}
          />
        </div>
        <div className='campo'>
          <label htmlFor='categoria'>Categoría</label>
          <select 
          id='categoria'
          onChange={(e) => setCategoria(e.target.value)}
          value={categoria}
          >
            <option value=''>-- Seleccione --</option>
            <option value='ahorro'>Ahorro</option>
            <option value='comida'>Comida</option>
            <option value='casa'>Casa</option>
            <option value='gastos'>Gastos varios</option>
            <option value='ocio'>Ocio</option>
            <option value='salud'>Salud</option>
            <option value='suscripciones'>Suscripciones</option>
          </select>
        </div>
        <input
        type='submit'
        value={editarGasto.nombre ? 'Guardar cambios' : 'Añadir gasto'}
        />
      </form> 
    </div>
    
  )
}

export default Modal;