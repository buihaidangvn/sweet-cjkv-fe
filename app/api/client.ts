import { Configuration, JapaneseSearchWordApi } from "../generated-api";

const configuration = new Configuration({
    basePath: 'http://localhost:3000',
});
export const japaneseSearchWordApi = new JapaneseSearchWordApi(configuration);