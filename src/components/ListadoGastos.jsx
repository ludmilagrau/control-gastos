import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, 
    setEditarGasto, 
    eliminarGasto,
    filtro,
    gastosFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>
    {
      filtro ? (
        <>
          <h2>{gastosFiltrados.length > 0 ? 'Gastos' : 'No hay gastos en esta categoría'}</h2>
          {gastosFiltrados.map(gasto => (
          <Gasto
          gasto={gasto}
          key={gasto.id}
          setEditarGasto= {setEditarGasto}
          eliminarGasto= {eliminarGasto}
          />))}
        </>
      ) : 

      <>
        <h2>{gastos.length > 0 ? 'Gastos' : 'Aún no hay gastos. ¡Carga uno!'}</h2>
          {(gastos.map(gasto => (
            <Gasto
            gasto={gasto}
            key={gasto.id}
            setEditarGasto= {setEditarGasto}
            eliminarGasto= {eliminarGasto}
            />
          
          )))}
      </>
    }
    </div>
  )
}

export default ListadoGastos