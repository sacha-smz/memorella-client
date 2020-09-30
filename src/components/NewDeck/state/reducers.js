import { ADD_REF, REMOVE_REF } from "./actions";

const initialRefs = new Map();

export const imageRefsReducer = (refs = initialRefs, { type, payload }) => {
  switch (type) {
    case ADD_REF: {
      const newRefs = new Map(refs);
      const { key, ref } = payload;
      newRefs.set(key, ref);
      return newRefs;
    }
    case REMOVE_REF: {
      const newRefs = new Map(refs);
      newRefs.delete(payload);
      return newRefs;
    }
    default:
      return refs;
  }
};
