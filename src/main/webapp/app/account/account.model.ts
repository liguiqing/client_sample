import { Authority } from '@/shared/security/authority';

export interface IAccount {
  id?: number;
  login?: string;
  password?: string;
  email?: string;
  langKey?: string;
  uuid?: string;
  name?: string;
  mobile?: number;
  authorities?: Authority[];
}

export class Account implements IAccount {
  constructor(
    public id?: number,
    public login?: string,
    public password?: string,
    public email?: string,
    public langKey?: string,
    public uuid?: string,
    public name?: string,
    public mobile?: number,
    public authorities?: Authority[]
  ) {
    this.authorities = this.authorities = [Authority.USER];
  }
}
