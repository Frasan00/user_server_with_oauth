import BearerStrategy from "passport-http-bearer";
import passport from "passport";
import Session from "../database/Session";

async function initialize() {
    passport.use(new BearerStrategy.Strategy(
        function(token: string, done: any) {
          Session.findOne({ token: token }, function (err: any, session: any) {
            if (err) { return done(err); }
            if (!session) { return done(null, false); }
            return done(null,session, { scope: 'all' });
          });
        }
      ));
};

export default initialize;