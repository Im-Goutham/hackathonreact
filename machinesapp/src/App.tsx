import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { ROUTES } from "./common/routes";
import Header from "./components/Header";
import CategoryDashboard from "./pages/CategoryDashboad/CategoryDashboad";
import Home from "./pages/Home";
import ManageCategories from "./pages/ManageCategories";

function App() {
  return (
    <Router>
      <Container fluid>
        <Header />
        <Routes>
          <Route path={`/${ROUTES.HOME}`} element={<Home />}></Route>
          <Route
            path={`/${ROUTES.MANAGE_CATEGORIES}`}
            element={<ManageCategories />}
          ></Route>
          <Route
            path={`/${ROUTES.CATEGORY}/:id`}
            element={<CategoryDashboard />}
          ></Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
