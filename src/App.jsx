import { useEffect, useState } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal';
import {generarId} from './helpers';
import ListadoGastos from './components/ListadoGastos';
import Filtro from './components/Filtro';

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto') ?? 0)
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );
  const [editarGasto, setEditarGasto] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  useEffect(() => {
    if(Object.keys(editarGasto).length > 0){
      setModal(true); 
      setTimeout(() => {
        setAnimarModal(true);
      }, 300)
    }
  }, [editarGasto])



  const handleModal = () => {
    setModal(true);
    setEditarGasto({}); 
    setTimeout(() => {
      setAnimarModal(true);
    }, 300)
    }
    

  const guardarGasto = (gasto) => {
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState => 
        gastoState.id === gasto.id ? gasto : gastoState 
    )
      setGastos(gastosActualizados);
    } else{
    gasto.id = generarId();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto])
    setEditarGasto({});
    }
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => 
      gasto.id !== id);
      setGastos(gastosActualizados);
    }

    useEffect(()  => {
      localStorage.setItem('presupuesto', presupuesto ?? 0);
    }, [presupuesto])

    useEffect(() => {
      const presupuestoLS = Number(localStorage.getItem('presupuesto'));
      if(presupuesto > 0){
        setIsValidPresupuesto(true);
      }
    }, [])

    useEffect(() => {
      if(gastos.length > 0){
        localStorage.setItem('gastos', JSON.stringify(gastos)) ?? [];

      }
    }, [gastos])

    useEffect(() => {
      if(filtro){
        const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
        setGastosFiltrados(gastosFiltrados);
      }
    }, [filtro])
      

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
      presupuesto= {presupuesto}
      setPresupuesto= {setPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      gastos={gastos}
      setGastos={setGastos}
      />
      {isValidPresupuesto && 
        (
        <>
          <main>
          <Filtro
          filtro={filtro}
          setFiltro= {setFiltro}
          />
            <ListadoGastos gastos={gastos} setEditarGasto= {setEditarGasto} eliminarGasto={eliminarGasto} filtro={filtro} gastosFiltrados={gastosFiltrados}/>
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt= 'icono nuevo gasto'
              onClick={handleModal}
            />
          </div>
        </>)}

        {modal && <Modal 
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  editarGasto={editarGasto}
                  setEditarGasto={setEditarGasto}
                  />}

    </div>
  )
    }


export default App
