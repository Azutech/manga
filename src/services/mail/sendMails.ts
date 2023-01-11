import SendMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const SENDGRIDKEY = process.env.SENDGRID_API_KEY as string;

SendMail.setApiKey(SENDGRIDKEY);

export const verificationMail = async (
  firstName: string,
  email: string,
  verificationCode: string
) => {
  const msg = {
    to: email,
    from: 'azunna.onugha@outlook.com',
    subject: 'Welcome to manga',
    text: `Verify your account`,
    html: `<h2> Hello ${firstName} </h2><p>Welcome to Manga!</p><p>Please verify your account using code: <strong>${verificationCode}</strong> </p>`,
  };

  SendMail.send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};
