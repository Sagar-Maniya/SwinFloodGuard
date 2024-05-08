import { NextFunction, Request, Response } from "express";
import { sign, verify, JwtPayload, UserIDJwtPayload } from "jsonwebtoken";

export enum RolesEnum {
  Admin,
  User,
}

const token_secret =
  "dFQz2V8^x{g;/V=X,y-5p]gA4[_-|@;reF[d9kv%RTd9k8F!{.XjheAWpooH>Bv";

declare module "jsonwebtoken" {
  export interface UserIDJwtPayload extends JwtPayload {
    Id: string;
    Role: RolesEnum;
  }
}

export const generateAccessToken = (userId: number, role: RolesEnum) => {
  return sign({ Id: userId.toString(), Role: role }, token_secret, {
    expiresIn: "30d",
  });
};

export const authorize =
  (roles: RolesEnum[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
      let jwt = req.headers.authorization;

      if (!jwt) {
        return res.status(401).json({ message: "Invalid token." });
      }

      if (jwt.toLowerCase().startsWith("bearer")) {
        jwt = jwt.slice("bearer".length).trim();
      }

      const decodedToken = <UserIDJwtPayload>verify(jwt, token_secret);

      if (!decodedToken) {
        return res.sendStatus(401);
      }

      if (!roles.includes(decodedToken.Role)) {
        return res.sendStatus(403);
      }

      res.locals.userId = decodedToken.Id;
      res.locals.role = decodedToken.Role;

      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Token expired." });
        return;
      }

      res.status(500).json({ message: "Internal server error." });
    }
  };
