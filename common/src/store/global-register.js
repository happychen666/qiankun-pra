
/**
 * 
 * @param {vuex实例} store 
 * @param {qiankun下发的props} props 
 */
function registerGlobalModule (store, props = {}, who) {
  const aaa = !store
  const bbb = !store.hasModule
  console.log('ffffffflllll', aaa, bbb, who)
  if (aaa || bbb) {
    return;
  }

  // 获取初始化的state
  const initState = props.getGlobalState && props.getGlobalState() || {
    menu: [],
    user: {}
  };

  const globalModule = {
    namespaced: true,
    state: initState,
    actions: {
      // 子应用改变state并通知父应用
      setGlobalState({ commit }, payload) {
        commit('setGlobalState', payload);
        commit('emitGlobalState', payload);
      },
      // 初始化，只用于mount时同步父应用的数据
      initGlobalState({ commit }, payload) {
        commit('setGlobalState', payload);
      },
    },
    mutations: {
      setGlobalState(state, payload) {
        // eslint-disable-next-line
        state = Object.assign(state, payload);
      },
      // 通知父应用
      emitGlobalState(state) {
        if (props.setGlobalState) {
          props.setGlobalState(state);
        }
      },
    },
  };

  console.log('initState===', initState, store.hasModule('global'))
  // 将父应用的数据存储到子应用中，命名空间固定为global
  if (!store.hasModule('global')) {
    store.registerModule('global', globalModule);
  } else {
    // 每次mount时，都同步一次父应用数据
    store.dispatch('global/initGlobalState', initState);
  }
};

export default registerGlobalModule;
