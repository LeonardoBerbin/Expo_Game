/* logica central y manejo de escenario*/
import React, { useState, useEffect, useRef } from 'react';
import { View, PanResponder} from 'react-native';
import { Accelerometer } from 'expo-sensors';

// Componentes prediseñados
import Player from './Player.js'
import StaticObject from './StaticObject.js';

// Complementos
import collision from './utils/collision.js'

// Estilos 
const stylesheet = {
  flex: 1,
  position: 'relative',
  backgroundColor: '#eee'
};

const map = [
 {
  size: { w: 80, h: 10},
  position: { x: 0, y: 0 }
 },
 {
  size: { w: 80, h: 30},
  position: { x: 80, y: 0 }
 },
 {
  size: { w: 50, h: 10},
  position: { x: 160, y: 0 }
 },
 {
  size: { w: 80, h: 40},
  position: { x: 220, y: 0 }
 },
 {
  size: { w: 250, h: 10},
  position: { x: 20, y: 70 }
 },
 {
  size: { w: 20, h: 60},
  position: { x: 320, y: 0 }
 },
  {
  size: { w: 10, h: 10},
  position: { x: 290, y: 70 }
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
   * playerRef: Referencia del player
  */
  const mapRef = useRef(map.map(e => e));
  const speedRef = useRef(0);
  const playerRef = useRef(null);
  
  // Permite la extraccion de datos del componente Player
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
        speedRef.current = Math.sign(-y) * 1;
      });
    };
    _subscribe();
    return () => {
      subscription && subscription.remove();
    };
  }, []);
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderGrant: () => playerRef.current.gravity.jump()
  });

  // Actualiza la interfaz cada milisegundo
  requestAnimationFrame(() => {
   // Espera la primera entrega de datos de Player
   if(playerRef.current){
    // Obtiene el desplazamiento maximo en x con collision 
    const movement = collision.x(mapRef.current, playerRef.current, speedRef.current);
    
    // Actualiza la position de todos los objetos
    mapRef.current
    .forEach(e => e.position.x += movement.max);
    };
   
   setTime(prev => prev + 1);
  });
	
	// Limita los componentes a renderizar 
	const mapLimited = mapRef.current
  .filter(e => e.position.x < 100 && e.position.x + e.size.w > 0)
  .map((e, i) => <StaticObject key={i} datasheet={e}/>);
  
  // renderizado
  return (
    <View style={stylesheet}
          {...panResponder.panHandlers}>
      {/* Renderizar y asignar callback a playerRef */}
      <Player sendStatus={getStatusPlayer} 
              map={mapRef.current}/>
      { mapLimited }
    </View>
  );
};

// Exportar
export default Scene;
