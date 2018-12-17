/**
 * NavMenu.js
 * NavMenu Component
 *
 * Primary Navigation Menu
 * Main File
 */
import React from "react"
import { View } from "react-native"
import { Navigation } from "react-native-navigation"
import { viewPosts, returnHome } from "actions/navigation"
import brandMedia from "config/assets"
import { icons } from "config/styles"
import { observer, inject } from "mobx-react/native"
import { SideMenu, MenuButton } from "./index"

export const SubMenu = (props) => {
  const { store } = props
  const { categories } = store
  const catIgnores = ["news", "polls"]
  return (
    <SideMenu
      header={(
        <MenuButton
          onPress={() => props.exitSubmenu(props.componentId)}
          icon={icons.arrow_back}
          title="Back"
        />
      )}
    >
      {categories.map((c) => {
        if (!catIgnores.includes(c.name.toLowerCase())) {
          return (
            <MenuButton
              icon={icons[c.name.toLowerCase()]}
              title={c.name}
              key={c.id}
              onPress={() => props.filterPosts(c.id)}
            />
          )
        }
        return false
      })}
    </SideMenu>
  )
}
@inject("rootStore")
@observer
class NavMenu extends React.Component {
  enterSubmenu() {
    const { componentId, rootStore } = this.props
    const { categoryStore } = rootStore
    Navigation.push(componentId, {
      component: {
        name: "NavMenu.SubMenu",
        passProps: {
          exitSubmenu: this.exitSubmenu,
          filterPosts: this.filterPosts,
          store: categoryStore,
        },
      },
    })
  }

  exitSubmenu = (id) => {
    Navigation.pop(id)
  }

  filterPosts = (categoryId) => {
    viewPosts("HomeScreen", categoryId)
  }

  render() {
    return (
      <SideMenu
        headerImage={brandMedia.warrior_head}
        footer={(
          <View>
            <MenuButton isFooter title="About Us" />
            <MenuButton isFooter title="Meet the Staff" />
            <MenuButton isFooter title="Social" />
          </View>
        )}
      >
        <MenuButton onPress={() => returnHome()} title="My Feed" icon={icons.home} />
        <MenuButton title="News" icon={icons.news} />
        <MenuButton
          onPress={() => this.enterSubmenu()}
          title="Categories"
          icon={icons.categories}
        />
      </SideMenu>
    )
  }
}

export default NavMenu
