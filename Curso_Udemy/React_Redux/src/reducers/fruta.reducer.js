import { actionsTypes } from "../constants/frutas";

const initialState = {
  frutas: [
    { id: 1, nome: "Uva", quantidade: 20 },
    { id: 2, nome: "Maça", quantidade: 5 },
  ],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.ADICIONAR_FRUTA:
      return { frutas: [...state.frutas, { ...action.payload }] };
    case actionsTypes.REMOVER_FRUTA:
      return {
        frutas: state.frutas.filter((f) => f.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default reducers;
