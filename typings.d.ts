declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.json';

declare namespace State {
  interface LoadingState {
    gloabl?: boolean;
    models?: {
      [key: string]: boolean;
    };
    effects?: {
      [key: string]: boolean;
    };
  }

  interface AppState {
    isMobile?: boolean;
    menuCollapsed?: boolean;
  }

  interface RootState {
    app: AppState;
    loading: LoadingState;
    routing: {
      location: {
        pathname: string;
        search: string;
        hash: string;
        query: Object;
      };
    };
    [key: string]: any;
  }
}

declare interface ReduxComponentProps {
  dispatch?: Dispatch;
  [key: string]: any;
}

declare function dispatch(action: Action): Promise<any>;

declare type Dispatch = (action: Action) => Promise<any>;

declare type Action = {
  type: string;
  payload?:
    | {
        [key: string]: any;
      }
    | any;
};

declare type Effect = {
  put: (action: Action) => any;
  call: Function;
  take: (type: string) => any;
  select: (mapState: (state: State.RootState) => {}) => any;
};

declare type Model<T> = {
  namespace: string;
  state: T;
  reducers: {
    save?: (state: T, action: Action) => T;
    [key: string]: (state: T, action: Action) => T;
  };
  effects?: {
    [key: string]: (action: Action, effects: Effect) => IterableIterator<any>;
  };
  subscriptions?: {
    setup?: (arg: { dispatch: Dispatch }) => void;
    [key: string]: Function;
  };
};

declare module 'react-redux' {
  export function connect(
    mapStateToProps?: (state: State.RootState, ownProps: Object) => Function | Object,
    mapDispatchToProps?: Function,
    mergeProps?: Function,
    options?: Object
  ): Function;
}
