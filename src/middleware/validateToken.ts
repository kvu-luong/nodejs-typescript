import { Response, Request, NextFunction } from 'express';
import { ResponseBuilder } from '../helpers/responseBuilder';
import Auth from '../helpers/jwt';
const isValidToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];
  const responseInfos = new ResponseBuilder();
  if (!authorization) {
    res.json(responseInfos.setCode(401).setMessage('Unauthorized').build());
    return;
  }

  try {
    // bearer token
    const token = authorization.split(' ')[1];
    const payload = Auth.verifyToken(token as string);
    if (payload.valid) {
      return next();
    }
    res.json(responseInfos.setCode(403).setMessage(payload.error).build());
  } catch (error) {
    console.error(error);
    res.json(responseInfos.setCode(403).setMessage('Forbidden').build());
    return;
  }
};

export default isValidToken;
