import { View, StyleSheet } from 'react-native';
import Scene from './game/Scene.js';

const App = () => {
  return (
    <View style={styles.container}>
      <Scene/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
