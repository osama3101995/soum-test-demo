import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/store/store";

import CategoryModal from "./src/components/CategoryModal";
import Products from "./src/components/Products";
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <CategoryModal></CategoryModal>
        <Products></Products>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
