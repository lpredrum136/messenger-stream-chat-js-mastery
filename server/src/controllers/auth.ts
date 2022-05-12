import { connect } from 'getstream';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { StreamChat } from 'stream-chat';
import crypto from 'crypto';

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;
const APP_ID = process.env.STREAM_APP_ID;

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const serverClient = connect(
      API_KEY as string,
      API_SECRET as string,
      APP_ID
    );

    const client = StreamChat.getInstance(API_KEY as string, API_SECRET);

    const { users } = await client.queryUsers({ name: username });

    if (!users.length) {
      res.status(400).json({ message: 'User not found' });
    }

    const success = await bcrypt.compare(
      password,
      users[0].hashedPassword as string
    );

    if (!success) {
      res.status(400).json({ message: 'Password incorrect' });
    }

    const token = serverClient.createUserToken(users[0].id);

    res.status(200).json({
      token,
      fullName: users[0].fullName,
      username,
      userId: users[0].id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    const userId = crypto.randomBytes(16).toString('hex');

    const serverClient = connect(
      API_KEY as string,
      API_SECRET as string,
      APP_ID
    );

    await bcrypt.hash(password, 10);

    const token = serverClient.createUserToken(userId);

    res.status(200).json({ token, userId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export { login, register };
