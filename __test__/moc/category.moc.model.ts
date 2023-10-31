import {TypeGuard} from '../../src';
import {is, RegisterInIs} from "thiis";

@RegisterInIs({
    className: 'categoryModel'
})
export class CategoryMocModel {

    private name: string | undefined;
    private id: number | undefined;

    @TypeGuard([is.string])
    public setName(name: string): void {
        this.name = name;
    }

    @TypeGuard({
        result: is.string
    })
    public getName(): string {
        return <string>this.name;
    }

    @TypeGuard({
        result: is.string,
    })
    public badGet(): string {
        return <string><unknown>0;
    }

    @TypeGuard([is.number])
    public setId(id: number): void {
        this.id = id;
    }

    @TypeGuard({
        result: is.number
    })
    public getId(): number {
        return <number>this.id;
    }

}
