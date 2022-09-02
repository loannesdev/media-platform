import { describe, expect, test } from "vitest"
import Requester from '~/services/Requester'
import db from '~/services/Mocks'
import ACTIONS from '~/redux/ActionsCreators/FilmTypes'
import RequestMode from "~/services/RequestMode"
import Store from "~/utils/MyStore"
import Parameters from "~/services/Parameters"

const { SerieDetailsMock } = db()
const objTest = [
  "Testing",
  "Object"
]
const TMDb = Parameters.TMDb;

describe.concurrent('Check the actions of Requester file', () => {
  RequestMode.changeMode()

  test('Loading', () => {
    Requester({ request: null, mock: null, action: ACTIONS.READ_FILMS })
    const films = Store({ reducer: "film", value: "films" })
    expect(films).toEqual("loading")
  })

  test('On test mode', async () => {
    const conf = { request: null, mock: objTest, action: ACTIONS.FILM_DETAILS }
    await expect(Requester(conf)).resolves.toEqual({ value: objTest, type: ACTIONS.FILM_DETAILS })
  })

  test('On real mode', async () => {
    RequestMode.changeMode()
    const req = `${TMDb.url_v3}${TMDb.tv}${SerieDetailsMock.id}?${TMDb.api_key}&${TMDb.language}`;
    const conf = { request: req, mock: null, action: ACTIONS.SERIE_DETAILS }
    const res = await Requester(conf)

    console.log("URL: ", req)
    console.log("RES: ", res)
    expect(Object.entries(res)).toHaveLength(3);
    expect(Object.keys(res.value)).toHaveLength(Object.keys(SerieDetailsMock).length);
    expect(res.value).toHaveProperty("name", "9-1-1: Lone Star");
  })
})