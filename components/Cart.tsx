/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

function Cart({productsInfo}) {
  const [totalAmount, setTotalAmount] = useState(0);

  const renderProducts = () => {
    const products = productsInfo.products;
    return products.map((el, index) => {
      return (
        <View style={styles.productWrapper} key={index}>
          <View>
            <Image
              style={styles.image}
              source={{uri: el.image}}
              alt="product image"
            />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.headline}>{el.headline}</Text>
            <View style={styles.prices}>
              <Text style={styles.price}>{el.price.toFixed(2)} ₾</Text>
              {el.startingPrice !== el.price ? (
                <Text style={styles.startingPrice}>{el.startingPrice} ₾</Text>
              ) : null}
            </View>
          </View>
        </View>
      );
    });
  };

  const countTotalAmount = () => {
    let amount = 0;
    productsInfo.products.map(el => {
      amount = amount + el.price;
    });
    setTotalAmount(amount);
  };

  useEffect(() => {
    countTotalAmount();
  }, []);

  if (productsInfo.products.length === 0) {
    return <View />;
  }

  return (
    <ScrollView style={styles.cartPage}>
      <View>{renderProducts()}</View>
      <View style={styles.totalAmount}>
        <Text style={styles.totalAmountText}>ჯამური ღირებულება</Text>
        <Text style={styles.totalAmountNum}>{totalAmount.toFixed(2)} ₾</Text>
      </View>
      <TouchableOpacity style={styles.order}>
        <View>
          <Text style={styles.orderText}>შეკვეთის გაფორმება</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cartPage: {
    flex: 1,
    gap: 10,
  },
  emptyCart: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
  },
  productWrapper: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 128,
    height: 128,
    resizeMode: 'contain',
  },
  productInfo: {
    flex: 1,
    width: '100%',
    padding: 15,
    gap: 10,
    marginTop: 10,
  },
  headline: {
    color: 'black',
    fontWeight: 'bold',
  },
  prices: {
    flex: 1,
    flexDirection: 'row',
    gap: 15,
    paddingTop: 10,
  },
  price: {
    color: 'black',
    fontWeight: 'bold',
  },
  startingPrice: {
    textDecorationLine: 'line-through',
  },
  totalAmount: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    padding: 20,
    borderBottomColor: 'black',
    backgroundColor: 'white',
  },
  totalAmountText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalAmountNum: {
    fontSize: 16,
    position: 'absolute',
    right: 20,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  order: {
    flex: 1,
    alignSelf: 'center',
    width: '75%',
    backgroundColor: '#b4d984',
    borderRadius: 8,
    marginTop: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  orderText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

//

const mapStateToProps = state => {
  return {
    productsInfo: state.productsInfo,
  };
};

export default connect(mapStateToProps)(Cart);
