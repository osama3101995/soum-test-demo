import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CATEGORY } from "../store/reducers/categoryReducer";

const Categories = (params) => {
  let checkedCats = params.checkedCats;
  let setCheckedCats = params.setCheckedCats;
  return (
    <View style={{ marginLeft: 10 }} key={params.id}>
      <View style={styles.container}>
        {/* Value of the checkbox will be true if the ID of the category would be available in the checkedCats array. */}
        <Checkbox
          testID={`${params.id}-checkbox`}
          value={checkedCats.includes(params.id)}
          onValueChange={() => {
            let finalCheckedCats = checkedCats;
            finalCheckedCats = checkedCats.includes(params.id)
              ? checkedCats.filter((item) => item !== params.id)
              : [...checkedCats, params.id];
            setCheckedCats(finalCheckedCats);
          }}
        />
        <Text style={styles.text}>{params.name}</Text>
      </View>
      {/* Running a recursive for subcategory functionality */}
      {params.subCategories.length
        ? params.subCategories.map((category) => {
            return (
              <Categories
                key={category.id}
                {...category}
                checkedCats={checkedCats}
                setCheckedCats={setCheckedCats}
              />
            );
          })
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    padding: 10,
  },
});

export default Categories;
