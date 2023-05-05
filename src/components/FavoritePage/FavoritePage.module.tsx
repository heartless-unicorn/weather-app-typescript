import { useAppSelector } from "../helpers/constants";
import { selectActions } from "../action-slice";

export default function FavoritePage() {
  const store = useAppSelector(selectActions);

  return (
    <div className="FavoritePage">
      {store.map((el: string) => {
        return <p>{el}</p>;
      })}
    </div>
  );
}
