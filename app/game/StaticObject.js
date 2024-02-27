/* Objetos estaticos */

import React from 'react';
import { View } from 'react-native';

const StaticObject = (props) => {
  // Obtener hoja de datos
  const { datasheet } = props

  // Establecer estilos
  const stylesheet = {
    width: datasheet.size.h + '%',
    height: datasheet.size.w + '%',
    backgroundColor: '#000',
    // Posicionamiento en funcion de datasheet
    position: 'absolute',
    top: datasheet.position.x + '%',
    left: datasheet.position.y + '%'
  };

  // renderizado
  return(
    <View style={stylesheet} />
  );
};

// Exportar
export default StaticObject;
