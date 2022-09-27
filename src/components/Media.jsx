import { useSelector } from "react-redux";
import "~/utils/styles/Media.scss";
import Empty from "./Empty";
import CardMedia from "./subcomponents/CardMedia";

export default function Media() {
  const RESOURCES = useSelector((e) => e.media.resources);

  if (Object.keys(RESOURCES).length) {
    return (
      <div className="media">
        {
          Object.values(RESOURCES)?.map((element) => (
            <CardMedia
              key={element.id}
              data={element}
            />
          ))
        }
      </div>
    );
  }

  return <Empty />;
}
