export const formatearCantidad = (cantidad) => {
  return cantidad.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}

export const generarId = () => {
    const id = Math.random().toString(36).substring(2); 
    return id;
  }

  export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);
    const opciones = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
  }