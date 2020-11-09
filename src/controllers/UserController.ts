import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';
import User from '../models/User';

export default {
  async authUser(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ email });

      if (!user) {
        return response.status(400).json({ error: 'User not found' });
      }

      if (!(await user.compareHash(password))) {
        return response.status(400).json({ error: 'Invalid password' });
      }

      if (!user.admin) {
        return response.status(400).json({ error: 'Not admin!' });
      }

      return response.json({
        user: { ...user, password: undefined },
        token: user.generateToken(),
      });
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'User authentication failed', err });
    }
  },

  async registerUser(request: Request, response: Response): Promise<Response> {
    // eslint-disable-next-line object-curly-newline
    const { username, email, password } = request.body;

    try {
      const userRepository = getRepository(User);

      if (await userRepository.findOne({ email })) {
        return response.status(400).json({ error: 'User already exists' });
      }

      const passwordHash = await hash(password, 8);

      const data = {
        username,
        email,
        password: passwordHash,
        admin: email === 'luizbapmarques@gmail.com',
      };

      const schema = Yup.object().shape({
        username: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório'),
        password: Yup.string().required('Password obrigatório'),
        admin: Yup.boolean().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const user = userRepository.create(data);

      await userRepository.save(user);

      return response.json({ ...user, password: undefined });
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'User registration failed', err });
    }
  },
};
