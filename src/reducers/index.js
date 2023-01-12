import {combineReducers} from "redux";
import userReducer from "./userReducer";
import { searchReducer } from "./searchReducer";
import {cartReducer} from "./cartReducer";
import { couponReducer } from "./couponReducer";
import { drawerReducer } from "./drawerReducer";
import { CODReducer } from "./CODReducer";

const rootReducer = combineReducers({
    user:userReducer,
    search:searchReducer,
    cart:cartReducer,
    drawer:drawerReducer,
    coupon:couponReducer,
    COD:CODReducer
});

export default rootReducer;