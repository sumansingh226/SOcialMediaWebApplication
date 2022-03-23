import { CREATE, UPDATE, FETCH_ALL , DELETE, LIKE } from "../constants/actionsType"
const posts = (posts = [], actions) => {
  if (actions.type === FETCH_ALL) {
    return actions.payload;
  } else if (actions.type === CREATE) {
    return [...posts, actions.payload];
  } else if (actions.type === UPDATE) {
    return posts.map((post) =>
      post._id === actions.payload._id ? actions.payload : post
    );
  } else if (actions.type === LIKE) {
    return posts.map((post) =>
      post._id === actions.payload._id ? actions.payload : post
    );
  } else if (actions.type === DELETE) {
    return posts.filter((post) => post._id !== actions.payload);
  } else {
    return posts;
  }
};

export default posts;
