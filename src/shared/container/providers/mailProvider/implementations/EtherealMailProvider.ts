import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';


 export default class EtherealmailProvaider implements IMailProvider {
  private client: Transporter;

  constructor(){

    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
          user: account.user,
          pass: account.pass
      },

  });
  this.client = transporter;

   });

  }
  public async sendMail(to: string, body: string): Promise<void>{
    const mensage = await this.client.sendMail({
        from: 'Equipe Gobarber <equipe@gobarber.com>',
        to,
        subject: 'Recuperação de Senha ✔',
        text: body,

    });
    console.log('Message sent: %s', mensage.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mensage));

  }

}
