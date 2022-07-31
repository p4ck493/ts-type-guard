import {is} from '@p4ck493/ts-is';
import {GuardType} from '../../lib';
import {RegisterInIs} from '@p4ck493/ts-is/lib/decorators';

@RegisterInIs({
    className: 'categoryModel'
})
export class CategoryMocModel {

    private name: string | undefined;
    private id: number | undefined;

    @GuardType([is.string])
    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
        return <string>this.name;
    }

    @GuardType([is.number])
    public setId(id: number): void {
        this.id = id;
    }

    public getId(): number {
        return <number>this.id;
    }

}
