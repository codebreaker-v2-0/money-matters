class UserItem {
  readonly userId: number;
  readonly name: string;

  constructor(
    userId: number,
    name: string,

  ) {
    this.userId = userId;
    this.name = name;
  }
}

export default UserItem;
