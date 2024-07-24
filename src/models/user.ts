export interface UserData {
  _id: string
  username: string
  password: string
  other: object
}

export class User {
  private data: UserData;

  constructor(data: UserData) {
    this.data = data;
  }

  getId(): string {
    return this.data._id;
  }

  getUsername(): string {
    return this.data.username;
  }


  setData(data: UserData): void {
    this.data = data;
  }

  toJSON(): UserData {
    return this.data;
  }
}