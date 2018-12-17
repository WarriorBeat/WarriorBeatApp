/**
 * Provider.js
 * Extended MobX Provider to make it compatible
 * with ReactNativeNavigation
 *
 * @see https://gist.github.com/megahertz/3aad3adafa0f7d212b81f5e371863637
 *
 * lib
 */

import { Provider as MobXProvider } from "mobx-react/native"

const SPECIAL_REACT_KEYS = { children: true, key: true, ref: true }

export default class Provider extends MobXProvider {
  props: {
    store: Object
  }

  context: {
    mobxStores: Object
  }

  getChildContext() {
    const stores = {}

    // inherit stores
    const baseStores = this.context.mobxStores
    if (baseStores) {
      for (const key in baseStores) {
        stores[key] = baseStores[key]
      }
    }

    // add own stores
    for (const key in this.props.store) {
      if (!SPECIAL_REACT_KEYS[key]) {
        stores[key] = this.props.store[key]
      }
    }

    return {
      mobxStores: stores,
    }
  }
}
