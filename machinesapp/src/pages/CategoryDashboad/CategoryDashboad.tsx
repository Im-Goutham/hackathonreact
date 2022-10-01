import { useParams } from "react-router-dom";

function CategoryDashboard() {
    let { id } = useParams();
  return <>Category Dashboard -- {id}</>;
}

export default CategoryDashboard;
