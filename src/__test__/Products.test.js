import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Products from "../components/Products";
import store from "../store/store";

describe("initial render", () => {
  const { debug, getByTestId } = render(
    <Provider store={store}>
      <Products />
    </Provider>
  );

  test("testing if products are rendering", () => {
    // Nokia G20
    expect(getByTestId("GFsYoShlQ5zYyALViJku-item-text")).toBeDefined();
    // iphone 8 256GB
    expect(getByTestId("CvS5bvMQBEi04fl8n05f-item-text")).toBeDefined();
  });
});
