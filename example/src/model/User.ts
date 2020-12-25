import { Provide } from "kokomo";

@Provide("Kokomo.js", 18)
export default class User {
  constructor(readonly name: string, readonly age: number) {}

  getAge() {
    return this.age;
  }
}
