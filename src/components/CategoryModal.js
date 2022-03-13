import React, { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as catData from "../../assets/categories.json";
import { UPDATE_CATEGORY } from "../store/reducers/categoryReducer";
import Categories from "./Categories";

const CategoryModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const categoriesData = catData.data;
  const [checkedCats, setCheckedCats] = useState([]);

  useEffect(() => {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: checkedCats,
    });
  }, [checkedCats]);

  const dispatch = useDispatch();

  return (
    <View>
      <Modal
        animationType="slide"
        presentationStyle="fullScreen"
        visible={modalVisible}
        testID="category-modal"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <Button
            onPress={() => setModalVisible(!modalVisible)}
            title="X"
            color="#841584"
            testID="category-close-modal-button"
          />
          <View style={styles.container}>
            {categoriesData.map((category) => {
              return (
                // Using parent component to manage the state of checked categories
                // because changing the state  would cause rerender and wouldn't store the checked categories properly.
                <Categories
                  key={category.id}
                  {...category}
                  checkedCats={checkedCats}
                  setCheckedCats={setCheckedCats}
                />
              );
            })}
          </View>
        </View>
      </Modal>
      <Button
        onPress={() => setModalVisible(!modalVisible)}
        title="Filter"
        color="#841584"
        testID="category-open-modal-button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default CategoryModal;
