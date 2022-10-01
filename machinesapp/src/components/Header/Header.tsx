import { Menu } from "semantic-ui-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CategoryState } from "../../common/types";
import { ROUTES } from "../../common/routes";

const Header = () => {
  const navigate = useNavigate();
  const categories = useSelector((state: CategoryState) => state.categories);
  const [activeMenu, setActiveMenu] = useState(ROUTES.HOME);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    navigate(menu);
  };
  return (
    <Menu>
      <Menu.Item
        name={ROUTES.HOME}
        active={activeMenu === ROUTES.HOME}
        onClick={() => handleMenuClick(ROUTES.HOME)}
      >
        Home
      </Menu.Item>
      <Menu.Item
        name={ROUTES.MANAGE_CATEGORIES}
        active={activeMenu === ROUTES.MANAGE_CATEGORIES}
        onClick={() => handleMenuClick(ROUTES.MANAGE_CATEGORIES)}
      >
        Manage Categories
      </Menu.Item>
      {categories.map(({ id, name }) => {
        return (
          <Menu.Item
            key={id}
            name={name}
            active={activeMenu === id}
            onClick={() => handleMenuClick(`${ROUTES.CATEGORY}/${id}`)}
          >
            {name ? name : "New Category"}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};
export default Header;
