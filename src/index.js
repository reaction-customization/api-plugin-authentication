import pkg from "../package.json";
import mutations from "./mutations/index.js";
import firebaseTokenMiddleware from "./util/firebaseTokenMiddleware.js";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "Authentication",
    name: "authentication",
    version: pkg.version,
    collections: {
      users: {
        name: "users"
      }
    },
    mutations,
    expressMiddleware: [
      {
        route: "graphql",
        stage: "authenticate",
        fn: firebaseTokenMiddleware
      }
    ]
  });
}
