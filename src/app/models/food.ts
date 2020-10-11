export class Food {
    id: string
    name: string;
    protein: number;
    carbohydrate: number;
    fat: number;
    portion: number;

    static parse(args: any): Food {
        return Object.assign(new Food(), args);
    }
}
