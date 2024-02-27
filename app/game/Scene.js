/* Escena y lofica cental del video juego */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Player from './Player.js'
import StaticObject from './StaticObject.js';

// Valores constantes
const
h = Dimensions.get('window').width,
w = Dimensions.get('window').height,
stylesheet = {
  flex: 1,
  position: 'relative',
  backgroundColor: '#eee'
};

const map = [
 {
  size: { w: 100, h: 5},
  position: { x: 0, y: 0 }
 },
]

const Scene = () => {
  /* Definicion de time como el estado
   * Responsable de mantener el renderizado
   * Suma una unidad por cada renderizado
  */
  const [time, setTime] = useState(0);

  /* Definicion de valores referenciale
   * mapRef: Referencia de los objestos del mapa
   * speedRef: Velocidad de desplazamiento
   * directionRef: Direccion de desplazamiento
   * playerRef: Referencia del player
  */
  const mapRef = useRef(map.map(e => e));
  const speedRef = useRef(0.1);
  const directionRef = useRef(0);
  const playerRef = useRef(null);
  
  const getStatusPlayer = (data) => {
    playerRef.current = data;
  };

  // Actualiza el valor de directionRef
  useEffect(() => {
    // Uso de Accelerometer
    let subscription;
    const _subscribe = async () => {
      subscription = Accelerometer.addListener(accelerometerData => {
	// Direccion opuesta a la inclinacion del dispositivo 
        const { y } = accelerometerData;
        directionRef.current = Math.sign(-y);
      });
    };
    _subscribe();
    return () => {
      subscription && subscription.remove();
    };
  }, []);

  // Actualiza la interfaz cada milisegundo
  setTimeout(() => {
   if(playerRef.current)
    mapRef.current
    .forEach(e => {
       e.position.x += speedRef.current * directionRef.current;
    });
    
    console.log(playerRef.current);
    
    setTime(prev => prev + 1);
  });
	
  // renderizado
  return (
    <View style={stylesheet}>
      {/* Renderizar y asignar callback a playerRef */}
      <Player sendStatus={getStatusPlayer}/>
      {
      mapRef.current
       .filter(e => e.position.x < 100 && e.position.x + e.size.w > 0)
       .map((e, i) => <StaticObject key={i} datasheet={e}/>)
      }
    </View>
  );
};

export default Scene;
