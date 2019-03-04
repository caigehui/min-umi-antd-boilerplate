import enquire from 'enquire.js';

const appModel: Model<State.AppState> = {
  namespace: 'app',
  state: {
    isMobile: document.documentElement.clientWidth <= 767,
    menuCollapsed: false,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      enquire.register('only screen and (min-width: 320px) and (max-width: 767px)', {
        match: () => {
          dispatch({ type: 'save', payload: { isMobile: true } });
        },
        unmatch: () => {
          dispatch({ type: 'save', payload: { isMobile: false } });
        },
      });
    },
  },
};

export default appModel;
