/* Logica y manejo del player */

import React, { useRef } from 'react';
import { View } from 'react-native';

const Player = (prop) => {
  // Estado actual del player 
  const status = useRef({
   position: {x: 40, y: 5},
   size: {w: 5, h: 20}
  });
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
  
  prop.sendStatus(status.current);
  // renderizado
  return(
    <View style={stylesheet} />
  );
};

// Exportar
export default Player;
