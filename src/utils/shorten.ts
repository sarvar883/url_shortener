import axios from "axios";
import { REBRANDLY_ENDPOINT } from '../constants';

import dotenv from 'dotenv';
dotenv.config();

interface ISuccessReturn {
  success: true;
  data: string;
}

interface IErrorReturn {
  success: false;
  status: number;
  message: string;
}

type IReturn = ISuccessReturn | IErrorReturn;


export const shortenURL = async (url: string): Promise<IReturn> => {

  const linkRequest = {
    destination: url,
    domain: { fullName: "rebrand.ly" },
  };

  const headers = {
    'Content-Type': 'application/json',
    'apikey': process.env.REBRANDLY_API_KEY as string,
  };

  try {
    const response = await axios.post(REBRANDLY_ENDPOINT, linkRequest, { headers });

    return {
      success: true,
      data: response.data.shortUrl,
    }

  } catch (error: any) {
    console.log('shortenURL ERROR: ', error);

    return {
      success: false,
      status: error.response.status || 400,
      message: error.response.data.message || 'Error occurred when shortening the url',
    }
  }
};