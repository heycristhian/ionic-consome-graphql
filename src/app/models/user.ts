export class User {
    username: String;
    age: number;
    height: number;
    weight: number;
    recommendedCalories: number;

    static parse(args: any): User {
        return Object.assign(new User(), args);
    }

    toString(): void {
        console.log(`User.toString: ${this.username}`);
    }
}
