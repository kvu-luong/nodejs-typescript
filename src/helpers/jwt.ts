import { Secret, sign, verify } from 'jsonwebtoken';
import { Response } from 'express';
import 'dotenv/config';
import { ROUTE } from '../utils/constant';
import { ObjectId } from 'mongodb';
import fs from 'fs';

const KeyManage = {
  private: fs.readFileSync(`${__dirname}/../../key/private.key`, 'utf8'),
  public: fs.readFileSync(`${__dirname}/../../key/public.key.pub`, 'utf8'),
};

export const Auth = {
  createAccessToken: ({ _id }: { _id: string | ObjectId }) => {
    return sign({ _id }, KeyManage.private as Secret, {
      expiresIn: '15m',
      algorithm: 'RS256',
    });
  },
  createRefreshToken: ({ _id, tokenVersion }: { _id: string | ObjectId; tokenVersion: number }) => {
    return sign({ _id, tokenVersion }, KeyManage.private as Secret, {
      expiresIn: '7d',
      algorithm: 'RS256',
    });
  },
  setNewRefreshToken: (res: Response, _id: string | ObjectId, tokenVersion: number) => {
    res.cookie('jid', Auth.createRefreshToken({ _id, tokenVersion }), {
      httpOnly: true,
      path: ROUTE.USER.REFRESH_TOKEN,
    });
  },
  verifyToken: (token: string) => {
    try {
      const decoded = verify(token, KeyManage.public);
      return {
        valid: true,
        decoded,
      };
    } catch (error: any) {
      return {
        valid: false,
        error: error.message,
      };
    }
  },
};

export default Auth;
