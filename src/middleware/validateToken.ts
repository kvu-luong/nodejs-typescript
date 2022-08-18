import { Response, Request, NextFunction } from 'express';
import { ResponseBuilder } from '../helpers/responseBuilder';
import Auth from '../helpers/jwt';
const isValidToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];
  const responseInfos = new ResponseBuilder();
  if (!authorization) {
    res.json(responseInfos.setCode(401).setMessage('Unauthorized'));
    return;
  }

  try {
    // bearer token
    const token = authorization.split(' ')[1];
    const payload = Auth.verifyToken(token as string);
    console.log(payload);
    next();
  } catch (error) {
    console.error(error);
    res.json(responseInfos.setCode(403).setMessage('Forbidden'));
    return;
  }
};

export default isValidToken;
