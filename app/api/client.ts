import { Configuration } from "../generated-api";

export const configuration = new Configuration({
  basePath: process.env.NEXT_PUBLIC_API_BASE_URL,
});
