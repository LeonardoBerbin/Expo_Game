/* Escena y lofica cental del video juego */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import StaticObject from './StaticObject.js';

// Valores constantes
const
h = Dimensions.get('window').width,
w = Dimensions.get('window').height,
stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#eee'
  }
});

const map = [
 {
  size: { w: 50, h: 50},
  position: { x: 50, y: 50 }
 },
  {
  size: { w: 100, h: 50},
  position: { x: 50, y: 0 }
 },
 {
  size: { w: 400, h: 50},
  position: { x: 500, y: 50 }
 },
 {
  size: { w: 110, h: 50},
  position: { x: 1000, y: 0 }
 },
 {
  size: { w: 500, h: 50},
  position: { x: 1000, y: 100 }
 },
 {
  size: { w: 250, h: 50},
  position: { x: 1000, y: 100 }
 },
 {
  size: { w: 300, h: 50},
  position: { x: 2000, y: 50 }
 }
]

const Scene = () => {
  /* Definicion de time como el estado
   * Responsable de mantener el renderizado
   * Suma una unidad por cada renderizado
  */
  const [time, setTime] = useState(0);

  /* Definicion de valores referenciale
   * mapRef: Referencia del mapa
   * speedRef: Velocidad de desplazamiento
   * directionRef: Direccion de desplazamiento
  */
  const mapRef = useRef(map.map(e => e));
  const speedRef = useRef(1.5);
  const directionRef = useRef(0);

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
    mapRef.current
    .forEach(e => {
       e.position.x += speedRef.current * directionRef.current;
    });
    
    setTime(prev => prev + 1);
  });
	
  // renderizado
  return (
    <View style={stylesheet.container}>
      {
      mapRef.current
       .filter(e => e.position.x < w && e.position.x + e.size.w > 0)
       .map((e, i) => <StaticObject key={i} datasheet={e}/>)
      }
    </View>
  );
};

export default Scene;
