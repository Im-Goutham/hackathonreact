import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CategoryState } from "../../common/types";
import CategoryData from "../../components/CategoryData";

function Home() {
  const categories = useSelector((state: CategoryState) => state.categories);

  return (
    <>
      {categories.map((category) => {
        return (
          <CategoryData
            key={category.id}
            catId={category.id}
            category={category}
          />
        );
      })}
    </>
  );
}

export default Home;
