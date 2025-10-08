import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          // No user found - Auth screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // User is logged in - App screens
          <>
            <Stack.Screen 
              name="ProductList" 
              component={ProductListScreen}
              options={{ title: 'ShopEZ Products' }}
            />
            <Stack.Screen 
              name="ProductDetail" 
              component={ProductDetailScreen}
              options={{ title: 'Product Details' }}
            />
            <Stack.Screen 
              name="Cart" 
              component={CartScreen}
              options={{ title: 'Your Cart' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}