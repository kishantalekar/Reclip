import arcjet from "@arcjet/next";
import { getEnv } from "./utils/utils";

const aj = arcjet({
  key: getEnv("ARCJET_KEY"),
  rules: [],
});

export default aj;
