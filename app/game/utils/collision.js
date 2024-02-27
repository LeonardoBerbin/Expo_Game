/* Detecta colisiones entre objeto 
 * La funcion retornada acepta tres argumentos
 * array: arreglo de objetos en el mapa
 * object: objeto colisionable
 * speed: velocidad de desplazamiento
 *
 * Nota: Tanto los obejtos del mapa como el objetos colisionable deben poseer las propiedades position, size tal como se estipulan
*/
const base = (a, b, c, d) => {
   return (array, object, speed) => {
    // Ajustar condicion segun el eje 
    const condition = a === 'x' ? (speed >= 0) : (speed <= 0);
    
     // Encuentra el objeto mas cercano
    const closest = array.filter(e => {
      if(condition) return (
        e.position[a] + e.size[b] <= object.position[a]
        && e.position[c] < object.position[c] + object.size[d]
        && e.position[c] + e.size[d] > object.position[c]
      );
      else return (
        e.position[a] >= object.position[a] + object.size[b]
        && e.position[c] < object.position[c] + object.size[d]
        && e.position[c] + e.size[d] > object.position[c]
      );
    })
    .sort((e, f) => condition ?  f.position[a] - e.position[a] : e.position[a]  - f.position[a])[0];
    
    // Retoma el valor preestablecido cuando no hay coincidencias 
    if(!closest) 
    return {
     max: speed,
     closest
    };
    
    // Calcula las distancias 
    const distance_1 = Math.abs(closest.position[a] + closest.size[b] - object.position[a]);
    const distance_2 = Math.abs(object.position[a] + object.size[b] - closest.position[a]);
  
    // Obtiene la distancia más coherente
    const closestDistance = Math.min(distance_1, distance_2)

    // Limita el movimiento al valor mínimo entre la distancia más coherente y la velocidad
    const movement = Math.min(closestDistance, Math.abs(speed));

    // Devuelve el movimiento limitado
    return {
     max: movement * Math.sign(speed),
     closest
    };
  };
};

/* Exporta un objeto con dos funciones obtenidas de la funcion base
 * Los argumentos usados permiten reproducir la misma funcion tanto en el eje x como en el eje y
 * Se asume que x - y, w - h son propiedades validas de position y size respectivamente
*/
export default collision = {
 x: base('x', 'w', 'y', 'h'),
 y: base('y', 'h', 'x', 'w')
};
