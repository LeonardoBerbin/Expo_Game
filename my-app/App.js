import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const radianesAGrados = radianes => {
  return (radianes * 180) / Math.PI;
};

const App = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let subscription;
    const _subscribe = async () => {
      subscription = Accelerometer.addListener(accelerometerData => {
        const { x, y, z } = accelerometerData;
        const angle = radianesAGrados(Math.atan2(y, Math.sqrt(x * x + z * z)));
        setAngle(angle);
      });
    };

    _subscribe();

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ángulo de Inclinación (grados):</Text>
      <Text>{angle.toFixed(2)}</Text>
    </View>
  );
};

export default App;
