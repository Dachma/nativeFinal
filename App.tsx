import React from 'react';
import LoginPage from './components/LoginPage';
import ProductsPage from './components/ProductsPage';
import allReducers from './reducers';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Cart from './components/Cart';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(allReducers);

function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
          <Stack.Screen
            options={{headerShown: false}}
            name="LoginPage"
            component={LoginPage}
          />
          <Stack.Screen name="ლეპტოპები" component={ProductsPage} />
          <Stack.Screen name="ჩემი კალათა" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
