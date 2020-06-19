class appError{
public readonly menssage: string;


public readonly statusCode: number;

constructor(menssage: string, statusCode = 400){
  this.menssage = menssage;

  this.statusCode = statusCode;

}
}

export default appError;
