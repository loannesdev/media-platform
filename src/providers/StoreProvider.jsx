import { Provider } from "react-redux";
import store from "~/redux/store";

export default function storeProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
