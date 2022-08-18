import { Request, Response } from 'express';
import { logger } from '../helpers/logger';
import { UserService } from '../services/user.service';
import _ from 'lodash';
import { ResponseBuilder } from '../helpers/responseBuilder';
import { verifyPasswordWithHash } from '../helpers/encryptPassword';
import Auth from '../helpers/jwt';

export const createUserHandler = async (req: Request, res: Response) => {
  const responseInfos = new ResponseBuilder();
  try {
    const { name } = req.body;
    const userExist = await UserService.getUserByName(name);
    if (userExist) return res.json(responseInfos.setCode(201).setMessage('UserExist').build());

    const user = await UserService.createUser(req.body);
    logger.info('Create User Success!!! - ' + user.insertedId);

    responseInfos
      .setCode(200)
      .setMessage('Success')
      .setResult(_.omit(user, ['passwordConfirmation']))
      .build();
    return res.json(responseInfos);
  } catch (e: any) {
    responseInfos.setCode(400).setMessage(e.message).build();
    return res.json(responseInfos);
  }
};

export const loginControllerHandler = async (req: Request, res: Response) => {
  const responseInfos = new ResponseBuilder();
  const { name, password } = req.body;
  try {
    const user = await UserService.getUserByName(name);
    if (!user) return res.json(responseInfos.setCode(400).setMessage('Wrong user name').build());

    const validPassword = await verifyPasswordWithHash(password, user.password);
    if (!validPassword) return res.json(responseInfos.setCode(400).setMessage('Wrong password').build());
    // create jwt accessToken & refreshToken
    Auth.setNewRefreshToken(res, user._id, user.tokenVersion as number);
    return res.json(
      responseInfos
        .setCode(200)
        .setMessage('Login Success')
        .setResult({ acessToken: await Auth.createAccessToken({ _id: user._id }) })
        .build()
    );
  } catch (error: any) {
    return res.json(responseInfos.setCode(400).setMessage(error.message).build());
  }
};
