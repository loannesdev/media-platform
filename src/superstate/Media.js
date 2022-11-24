import { ls } from "@superstate/adapters";
import { superstate } from "@superstate/core";
import MyFetch from "~/services/MyFetch";
import Parameters from "~/utils/Parameters";
import ToolC from "./Tool";

const { TMDb } = Parameters;
const TYPES = {
  movie: { url: TMDb.movie, state: "FILM_DETAILS" },
  tv: { url: TMDb.tv, state: "SERIE_DETAILS" },
  person: { url: TMDb.person, state: "PERSON_DETAILS" },
};

const MediaC = {
  state: superstate({
    RESOURCES: [],
    FILM_DETAILS: {},
    PERSON_DETAILS: {},
    SERIE_DETAILS: {},
    MEDIA_TYPE: "",
    SUCCESS: false,
    LOADING: false,
    ERROR: false,
  })
    .use([ls("MP_MEDIA")])
    .extend({
      changeStates({ set }, params) {
        set((prev) => ({
          ...prev,
          ...params,
        }));
      },
    }),

  readMedia: () => {
    const { SEARCH_TEXT, PAGE, TOTAL_PAGES } = ToolC.state.now();
    const QUERY = SEARCH_TEXT || "a";
    const URL = `${TMDb.url_v3}${TMDb.multi_search}?${TMDb.key}&${TMDb.query}${QUERY}&${TMDb.page}${PAGE}&${TMDb.language}&${TMDb.include_adult}`;

    MyFetch({ path: URL })
      .then((res) => {
        const { data } = res;

        if (TOTAL_PAGES !== data?.total_pages) {
          ToolC.totalPages(data?.total_pages);
          ToolC.newPage();
        }

        MediaC.state.set((prev) => ({
          ...prev, RESOURCES: data?.results,
        }));

        MediaC.state.changeStates({ SUCCESS: true, LOADING: false });
      });
  },

  mediaDetails: (extra, mediaType) => {
    const { id } = extra;
    const URL = `${TMDb.url_v3}${TYPES[mediaType].url}${id}?${TMDb.key}&${TMDb.language}`;

    MyFetch({ path: URL })
      .then((res) => {
        const { data } = res;

        MediaC.state.set((prev) => ({
          ...prev,
          [TYPES[mediaType].state]: { ...extra, ...data },
        }));
      });
  },

  mediaType: (mediaType) => {
    MediaC.state.set((prev) => ({ ...prev, MEDIA_TYPE: mediaType }));
  },
};

export default MediaC;
