import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Svg, { Rect } from 'react-native-svg';

const radianesAGrados = radianes => {
  return (radianes * 180) / Math.PI;
};

const Scene = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    let subscription;
    const _subscribe = async () => {
      subscription = Accelerometer.addListener(accelerometerData => {
        const { y, z } = accelerometerData;
        const angle = radianesAGrados(Math.atan2(y, Math.sqrt(y * y + z * z)));
        setPosition(prevPosition => prevPosition + Math.round(angle/3));
      });
    };

    _subscribe();

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#111'}}>
      <Svg width="100%" height="100%">
        <Rect
          x={0}
          y={position}
          width={50}
          height={50}
          fill="black"
        />
      </Svg>
    </View>
  );
};

export default Scene;
