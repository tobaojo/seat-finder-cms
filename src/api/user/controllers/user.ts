/**
 * user controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::user.user",
  ({ strapi }) => ({
    async search(ctx) {
      console.log(ctx.query);
      const q = ctx.query.q;

      if (!q) {
        ctx.body = [];
        return;
      }

      const users = await strapi.db.query("api::user.user").findMany({
        where: {
          $or: [
            { firstName: { $containsi: q } },
            { lastName: { $containsi: q } },
          ],
        },
        limit: 20,
      });

      ctx.body = users;
    },
  }),
);
