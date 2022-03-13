import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import CategoryModal from "../components/CategoryModal";
import store from "../store/store";
import "@testing-library/jest-native/extend-expect";

describe("test case for category modal", () => {
  const { debug, getByText, getByTestId } = render(
    <Provider store={store}>
      <CategoryModal />
    </Provider>
  );
  test("modal render on button click", () => {
    expect(getByTestId("category-open-modal-button")).toBeDefined();
    expect(getByTestId("category-modal")).toBeDefined();
    // turn on and off the category modal
    fireEvent.press(getByTestId("category-open-modal-button"));
    expect(getByTestId("category-modal")).toHaveProp("visible", true);
    fireEvent.press(getByTestId("category-close-modal-button"));
    expect(getByTestId("category-modal")).toHaveProp("visible", false);
  });
});
