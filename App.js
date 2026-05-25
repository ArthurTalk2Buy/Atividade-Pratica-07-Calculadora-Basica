import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CalcProvider } from './src/shared/CalcContext';
import Tela1 from './src/telas/tela1';
import Tela2 from './src/telas/tela2';
import Tela3 from './src/telas/tela3';
import Tela4 from './src/telas/tela4';
import Tela5 from './src/telas/tela5';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <CalcProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Soma"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="Soma" component={Tela1} />
            <Stack.Screen name="Multiplicacao" component={Tela2} />
            <Stack.Screen name="Divisao" component={Tela3} />
            <Stack.Screen name="Subtracao" component={Tela4} />
            <Stack.Screen name="Resultado" component={Tela5} />
          </Stack.Navigator>
        </NavigationContainer>
      </CalcProvider>
    </SafeAreaProvider>
  );
}
