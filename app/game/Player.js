/* Logica y manejo del player */
import React, { useRef } from 'react';
import { View } from 'react-native';

// complementos
import gravity from './utils/gravity.js';

const Player = (props) => {
  // Estado actual del player 
  const status = useRef({
   position: {x: 40, y: 10},
   size: {w: 5, h: 10}
  });
  
  // Evalua si gravity es una propiedad del player
  // De no serlo, llama a gravity para su asignacion, caso contrario, llama a init (esto permitira que init se ejecute constantemente mientras el comoponente se renderice)
  if(props.map.length){
     if(!status.current.gravity)
     gravity(props.map, status.current, 3);
     else 
     status.current.gravity.init();
  };
 
  // Establecer estilos
  const stylesheet = {
    width: status.current.size.h + '%',
    height: status.current.size.w + "%",
    backgroundColor: '#f0f',
    // Posicionamiento en funcion de datasheet
    position: 'absolute',
    top: status.current.position.x + '%',
    left: status.current.position.y + '%'
  };
  
  // Envio de datos actualizados
  props.sendStatus(status.current);
  
  // renderizado
  return(
    <View style={stylesheet}/>
  );
};

// Exportar
export default Player;
