const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducer = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

const orderCake = () => {
  return {
    type: CAKE_ORDERED,
    payload: 1
  };
};
const restockCakes = (qty = 1) => {
  return {
    type: CAKE_RESTOCKED,
    payload: qty
  };
};
const initialState_cakes = {
  numOfCakes: 10
};

const initialState_icecreams = {
  numOfIceCreams: 20
};
const orderIcecream = () => {
  return {
    type: ICECREAM_ORDERED,
    payload: 1
  };
};
const restockIcecreams = (qty = 1) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty
  };
};
const cakeReducer = (state = initialState_cakes, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      };
    case CAKE_RESTOCKED:
      return { ...state, numOfCakes: state.numOfCakes + action.payload };
    default:
      return { ...state };
  }
};

const icecreamReducer = (state = initialState_icecreams, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload
      };
    default:
      return { ...state };
  }
};

const rootReducer = combineReducer({
  cake: cakeReducer,
  icecream: icecreamReducer
});

const store = createStore(rootReducer, applyMiddleware(logger));

const unsubscribe = store.subscribe(() => {});

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCakes(3));
store.dispatch(orderIcecream());
store.dispatch(orderIcecream());
store.dispatch(restockIcecreams(3));
unsubscribe();
