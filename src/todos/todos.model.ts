export class Todo {
  constructor(
    public id: string,
    public description: string,
    public complete: boolean = false,
    public deadline: Date,
  ) {}
}
