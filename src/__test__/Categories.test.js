import { fireEvent, render, screen } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Categories from "../components/Categories";
import CategoryModal from "../components/CategoryModal";
import Products from "../components/Products";
import store from "../store/store";

describe("test case for Categories", () => {
  test("testing if one category is rendered properly", () => {
    const category = {
      id: "98HYXBZllUaKPykQvPkb",
      name: "Mobile Phones",
      subCategories: [
        {
          id: "eNmlRvauJB9Y5eJlCCX4",
          name: "Apple",
          subCategories: [],
        },
      ],
    };
    const { debug, getByText } = render(
      <Categories
        {...category}
        key={category.id}
        checkedCats={[]}
        setCheckedCats={() => {}}
      ></Categories>
    );
    expect(getByText("Apple")).toBeDefined();
  });

  const Wrapper = () => {
    return (
      <Provider store={store}>
        <CategoryModal></CategoryModal>
        <Products></Products>
      </Provider>
    );
  };

  test("testing if all components are rendering like they are suppose to", () => {
    const { debug, getByTestId, getByText, queryByText } = render(<Wrapper />);

    expect(getByText("Apple")).toBeDefined();
    expect(getByText("Mobile Phones")).toBeDefined();
    expect(getByText("iphone 8 256GB")).toBeDefined();
    expect(getByText("Nokia G20")).toBeDefined();
  });

  test("checking if filtering if working when clicking the checkbox", () => {
    const { debug, getByTestId, getByText, queryByTestId } = render(
      <Wrapper />
    );
    const iphoneCheckbox = getByTestId("eNmlRvauJB9Y5eJlCCX4-checkbox");
    fireEvent.press(iphoneCheckbox);
    expect(getByText("iphone 8 256GB")).toBeDefined();
    // Nokia G20
    expect(queryByTestId("GFsYoShlQ5zYyALViJku-item-text")).not.toBeTruthy();

    // Making sure that the nokia product reappears afterwards.
    fireEvent.press(iphoneCheckbox);
    // Nokia G20
    expect(queryByTestId("GFsYoShlQ5zYyALViJku-item-text")).toBeDefined();
  });
});
