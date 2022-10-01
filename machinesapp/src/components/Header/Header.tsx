import { Menu } from "semantic-ui-react";
import { useState } from "react";

const MenuExampleProps = () => {
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <Menu>
      <Menu.Item
        name="home"
        active={activeMenu === "home"}
        onClick={() => setActiveMenu("home")}
      >
        Home
      </Menu.Item>

      <Menu.Item
        name="reviews"
        active={activeMenu === "reviews"}
        onClick={() => setActiveMenu("reviews")}
      >
        Reviews
      </Menu.Item>

      <Menu.Item
        name="upcomingEvents"
        active={activeMenu === "upcomingEvents"}
        onClick={() => setActiveMenu("upcomingEvents")}
      >
        Upcoming Events
      </Menu.Item>
    </Menu>
  );
};
export default MenuExampleProps;
