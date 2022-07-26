import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import slug from 'slug';
import { PUBLIC_JWK, TOKEN_ALG, TOKEN_KID, TOKEN_PREFIX, TOKEN_TTL } from '../constants';
import { AuthPayload } from './types/user.type';

export default class Utility {
  /**
   *  slugify an article's title using slug and a random suffix
   * @param title
   * @returns
   */
  static slugify = (title: string): string => {
    return `${slug(title, { lower: true })}-${((Math.random() * Math.pow(36, 6)) | 0).toString(36)}`;
  };

  static encodePassword = (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

  static checkPassword = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
  };

  static issueToken(payload: object) {
    const privateKey = JSON.parse(process.env.PRIVATE_JWK as string);
    return jwt.sign(payload, jwkToPem(privateKey, { private: true }), {
      algorithm: TOKEN_ALG,
      expiresIn: TOKEN_TTL,
      keyid: TOKEN_KID,
    });
  }

  static verifyToken<T>(token: string): T {
    const payload = jwt.verify(token, jwkToPem(PUBLIC_JWK), { algorithms: [TOKEN_ALG] });
    return payload as T;
  }

  static loadCurrentUser(authorization: string | undefined) {
    if (!authorization || !authorization.startsWith(TOKEN_PREFIX)) return;

    const token = authorization.split(TOKEN_PREFIX)[1];
    const payload = this.verifyToken<AuthPayload>(token);
    return payload.sub;
  }

  static wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
}
