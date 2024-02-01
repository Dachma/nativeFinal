/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import cartIcon from '../images/cart-icon.png';
import {useDispatch, useSelector} from 'react-redux';

function ProductsPage({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const productCount = useSelector(state => state.productsInfo.products.length);

  async function getProducts() {
    const {data: response} = await axios.get(
      'https://veli.store/_next/data/fdMYoHvQkb3JgXO6OYObC/ka/category/teqnika/kompiuteruli-teqnika/leptopebi/783.json?type=teqnika&type=kompiuteruli-teqnika&type=leptopebi&type=783',
    );
    setData(response.pageProps.data.products);
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = product => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        headline: product.headline,
        image: product.image,
        price: product.stock.price,
        startingPrice: product.stock.start_price,
      },
    });
  };

  const renderProducts = () => {
    return data.map((el, index) => {
      return (
        <View key={index} style={styles.productBox}>
          <View style={styles.imgContainer}>
            <Image style={styles.image} source={{uri: el.image}} alt="laptop" />
          </View>
          <View style={styles.productInfo}>
            <View style={styles.prices}>
              <Text style={styles.productPrice}>
                {el.stock.price.toFixed(2)} ₾
              </Text>
              {el.stock.start_price !== el.stock.price ? (
                <Text style={styles.startingPrice}>
                  {el.stock.start_price} ₾
                </Text>
              ) : null}
            </View>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.productHeadline}>
              {el.headline}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(el)}>
            <Text style={styles.addText}>კალათაში შენახვა</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <ScrollView>
        <View style={styles.productsContainer}>{renderProducts()}</View>
      </ScrollView>
      <TouchableOpacity
        style={styles.cart}
        onPress={() => navigation.navigate('ჩემი კალათა')}>
        <View style={styles.cartImage}>
          <Image source={cartIcon} alt="cart" />
          <Text style={styles.myCart}>My Cart</Text>
          <View style={styles.countCircle}>
            <Text style={styles.countText}>{productCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    paddingBottom: 80,
  },
  productBox: {
    width: '50%',
    borderWidth: 3,
    borderColor: '#f5f5f5',
    padding: 12,
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 158,
    height: 128,
    resizeMode: 'contain',
  },
  productInfo: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    margin: 0,
    gap: 20,
  },
  prices: {
    flex: 1,
    flexDirection: 'row',
    gap: 15,
    paddingTop: 10,
  },
  startingPrice: {
    textDecorationLine: 'line-through',
  },
  productImage: {
    borderRadius: 20,
  },
  productPrice: {
    fontWeight: 'bold',
    color: 'black',
  },
  productHeadline: {
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#82b224',
    justifyContent: 'flex-end',
    marginTop: 10,
    borderRadius: 8,
  },
  addText: {
    textAlign: 'center',
    padding: 8,
    color: 'black',
    fontWeight: '600',
  },
  cart: {
    width: '100%',
    backgroundColor: 'black',
    borderWidth: 1,
    padding: 12,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  cartImage: {
    alignItems: 'center',
  },
  myCart: {
    color: 'white',
    textAlign: 'center',
  },
  countCircle: {
    position: 'absolute',
    top: -5,
    right: 170,
    backgroundColor: '#FF8469',
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: 'white',
  },
});

export default ProductsPage;
