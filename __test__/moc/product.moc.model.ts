
import {is} from '@p4ck493/ts-is';
import {GuardType} from '../../lib';
import {CategoryMocModel} from './category.moc.model';

export class ProductMocModel {

    private name: string | undefined;
    private id: number | undefined;
    private category: CategoryMocModel | undefined;

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

    @GuardType([is.categoryModel])
    public setCategory(category: CategoryMocModel): void {
        this.category = category;
    }

    public getCategory(): CategoryMocModel {
        return <CategoryMocModel>this.category;
    }

}
