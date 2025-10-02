import {
  type RouteConfig,
  route,
  index,
  prefix,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("./routes/layout/main.tsx", [
    index("routes/home/home.tsx"),
    route("about", "./routes/about/index.tsx"),
    ...prefix("countries", [
      index("routes/countries/index.tsx"),
      route(":countryName", "routes/country/index.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
