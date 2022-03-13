import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
} from "react-native";
import { useSelector } from "react-redux";
import * as prodData from "../../assets/products.json";

const Item = ({ title, id }) => (
  <View style={styles.item}>
    <Image
      style={styles.tinyLogo}
      source={{
        uri: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-purple-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617130317000",
      }}
    />
    <Text style={styles.title} testID={`${id}-item-text`}>
      {title}
    </Text>
  </View>
);

const Products = () => {
  let categories = useSelector((state) => {
    if (state.categories.length) {
      return state.categories;
    }
  });
  //console.log(tasks);
  useEffect(() => {
    if (!categories || categories?.length <= 0) {
      setProducts(prodData.data);
      return;
    }

    let filteredProducts = [];
    // if Product's breadcrumb categories have a union set with checked categories.
    prodData.data.map((product) => {
      let productExists = product.categoryBreadCrumb.map((productCat) => {
        return categories.includes(productCat);
      });
      if (productExists.includes(true)) {
        filteredProducts.push(product);
      }
    });
    setProducts(filteredProducts);
  }, [categories]);

  const [products, setProducts] = useState(prodData.data);
  const renderItem = ({ item }) => <Item title={item.name} id={item.id} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  title: {
    paddingLeft: 20,
    fontSize: 22,
  },
});

export default Products;
