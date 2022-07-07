import Calendar from "./Calendar";
import { Provider } from "react-redux";
import store from "./redux/configureStore";

const App = () => {
    return (
        <Provider store={store}>
            <Calendar />
        </Provider>
    );
};

export default App;
