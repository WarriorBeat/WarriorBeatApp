/**
 * NavMenu.js
 * NavMenu Component
 *
 * Primary Navigation Menu
 * Main File
 */
import React from "react"
import { View } from "react-native"
import { SideMenu, MenuButton } from "./index"
import { Navigation } from "react-native-navigation"
import { viewPosts, returnHome } from "actions/navigation"
import { brand_media } from "config/assets"
import { icons } from "config/styles"

export const SubMenu = props => {
  const { categories } = props.store
  const cat_ignores = ["news", "polls"]
  return (
    <SideMenu
      header={
        <MenuButton
          onPress={() => props.exitSubmenu(props.componentId)}
          icon={icons.arrow_back}
          title={"Back"}
        />
      }
    >
      {categories.map(c => {
        if (!cat_ignores.includes(c.name.toLowerCase())) {
          return (
            <MenuButton
              icon={icons[c.name.toLowerCase()]}
              title={c.name}
              key={c.categoryId}
              onPress={() => props.filterPosts(c.name)}
            />
          )
        }
      })}
    </SideMenu>
  )
}

class NavMenu extends React.Component {
  componentDidMount() {
    this.props.store.fetchCategories()
  }

  enterSubmenu() {
    Navigation.push(this.props.componentId, {
      component: {
        name: "NavMenu.SubMenu",
        passProps: {
          store: this.props.store,
          exitSubmenu: this.exitSubmenu,
          filterPosts: this.filterPosts
        }
      }
    })
  }

  exitSubmenu(id) {
    Navigation.pop(id)
  }

  filterPosts = category => {
    viewPosts("HomeScreen", category)
  }

  render() {
    return (
      <SideMenu
        headerImage={brand_media.warrior_head}
        footer={
          <View>
            <MenuButton isFooter title={"About Us"} />
            <MenuButton isFooter title={"Meet the Staff"} />
            <MenuButton isFooter title={"Social"} />
          </View>
        }
      >
        <MenuButton
          onPress={() => returnHome()}
          title={"My Feed"}
          icon={icons.home}
        />
        <MenuButton title={"News"} icon={icons.news} />
        <MenuButton
          onPress={() => this.enterSubmenu()}
          title={"Categories"}
          icon={icons.categories}
        />
      </SideMenu>
    )
  }
}

export default NavMenu
