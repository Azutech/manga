import SendMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const SENDGRIDKEY = process.env.SENDGRID_API_KEY as string;

SendMail.setApiKey(SENDGRIDKEY);


export const verification = async () => {
    
}