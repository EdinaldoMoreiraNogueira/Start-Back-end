import IMailProvider from '../models/IMailProvider';


interface IMenssage {
to: string;
body: string;
}

export default class FakeEmailProvaider implements IMailProvider {
  private menssages: IMenssage[] = [];
  public async sendMail(to: string, body: string): Promise<void>{
  this.menssages.push({
    to,
    body,
  });

  }

}
