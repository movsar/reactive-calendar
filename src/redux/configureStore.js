import { createStore } from "redux";
import reducer from "./features/events";

const store = createStore(reducer);

export default store 