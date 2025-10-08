import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';
import { database } from '../firebaseConfig';
import { ref, set, push } from 'firebase/database';
import { auth } from '../firebaseConfig';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [addingToCart, setAddingToCart] = useState(false);

  const addToCart = async () => {
    if (!auth.currentUser) {
      Alert.alert('Error', 'Please login to add items to cart');
      return;
    }

    setAddingToCart(true);
    try {
      const userCartRef = ref(database, `carts/${auth.currentUser.uid}/items`);
      const newItemRef = push(userCartRef);
      
      await set(newItemRef, {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      });

      Alert.alert('Success', 'Product added to cart!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add product to cart');
    }
    setAddingToCart(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <Text style={styles.sectionTitle}>Category</Text>
        <Text style={styles.category}>{product.category}</Text>
        
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={addToCart}
          disabled={addingToCart}
        >
          <Text style={styles.addToCartButtonText}>
            {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#666',
  },
  category: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  addToCartButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;