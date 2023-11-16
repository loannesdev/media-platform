import { useEffect } from "react";
import photoSVG from '~/assets/icons/photo.svg';
import SaveFavoriteButton from "~/components/save-favorite-button";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import store from "~/store";
import { TMDB } from "~/utils/constants";
import Header from "../../components/Header";
import FilmDetails from "./film-details";
import styles from "./media-details.module.scss";
import PersonDetails from "./person-details";
import SerieDetails from "./serie-details";

const { url_img } = TMDB;

export default function MediaDetails() {
  const { details, mediaSelectedType } = store.media();
  const { profile_path, backdrop_path } = details;

  let backdrop_url = (mediaSelectedType === "person")
    ? `${url_img}/h632${profile_path}`
    : `${url_img}/w1280${backdrop_path}`;

  if (backdrop_url.includes("undefined")) {
    backdrop_url = photoSVG;
  }

  Object.assign(details, { backdrop_url });

  useEffect(() => {
    scrollTo(0, 0);
  }, [])

  return (
    <>
      <Header className={styles.header}>
        <GoBackButton />
      </Header>

      <main className={styles.media_details}>
        <SaveFavoriteButton mediaData={details} className={styles.save_favorite_button} />

        {mediaSelectedType === "tv" && (<SerieDetails data={details} />)}
        {mediaSelectedType === "movie" && (<FilmDetails data={details} />)}
        {mediaSelectedType === "person" && (<PersonDetails data={details} />)}
      </main>
    </>
  );
}
