import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { ReactComponent as BookmarkSlash } from "~/assets/icons/bookmark-slash.svg";
import { ReactComponent as Bookmark } from "~/assets/icons/bookmark.svg";
import store from "~/store";
import styles from "~/utils/styles/save-favorite-button.module.scss";

export default function SaveFavoriteButton({ mediaData, className }) {
  const { manipulateFavorites, session, FAVORITES } = store.user();
  const [like, setLike] = useState(false);
  const {
    id,
    media_type,
    name,
    title,
    popularity,
    poster_path,
    vote_average,
    vote_count,
    overview,
    backdrop_path,
    known_for_department,
    profile_path,
  } = mediaData;

  const SAVED_FAV = Object.values(FAVORITES)?.find((elm) => id === elm?.id);

  useEffect(() => {
    const IS_IN_FAVORITES = Object.values(FAVORITES)?.some((elm) => elm?.id === id);

    if (IS_IN_FAVORITES && session) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [FAVORITES]);

  return (
    <button
      className={`${styles.save_favorite_button} ${className ?? ""}`.trim()}
      onClick={() => {
        if (session) {
          if (like) {
            manipulateFavorites({ type: "delete", mediaData: SAVED_FAV });
          }

          if (!like) {
            manipulateFavorites({
              type: "create",
              mediaData: {
                id,
                media_type,
                title: title ?? name,
                popularity,
                poster_path,
                vote_average,
                vote_count,
                overview,
                backdrop_path,
                known_for_department,
                profile_path,
              },
            });
          }

          setLike(!like);
        }

        if (!session) {
          iziToast.info({
            message: `Debes iniciar sesión para agregar <b>${title ?? name}</b> a favoritos`,
          });
        }
      }}
      title={like ? "Eliminar de favoritos" : "Agregar a favoritos"}
      type="button"
    >
      {like ? <BookmarkSlash /> : <Bookmark />}
    </button>
  );
}
