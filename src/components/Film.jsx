import "../utils/styles/Film.scss";
import HandleImage from "./HandleImage";

export default function Film({ data }) {
  return (
    <div className="Film">
      <HandleImage
        data={{
          id: data.id,
          media_type: data.media_type,
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
          img_required: "poster",
        }}
      />

      <div className="info">
        <h2>{data.title ? data.title : data.name}</h2>
        {data.overview ? <p>{data.overview}</p> : null}
        <span>{data.media_type == "movie" ? "Película" : data.media_type}</span>
        <br />
        <span>
          {data.release_date ? data.release_date : data.first_air_date}
        </span>
      </div>
    </div>
  );
}
