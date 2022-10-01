import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CategoryState } from "../../common/types";
import CategoryData from "../../components/CategoryData";
import { getCategory } from "../../redux/slices/categorySlice";

function CategoryDashboard() {
  const dispatch = useDispatch();
  let { id: catId = "" } = useParams();
  const category = useSelector(
    (state: CategoryState) => state.selectedCategory
  );

  useEffect(() => {
    dispatch(getCategory(catId));
  }, [catId]);

  return <CategoryData catId={catId} category={category}/>;
}

export default CategoryDashboard;
