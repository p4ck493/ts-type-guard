
import {CategoryMocModel} from './category.moc.model';
import {TypeGuard} from '../../src';
import {is} from "thiis";

export class ProductMocModel {

    private name: string | undefined;
    private id: number | undefined;
    private category: CategoryMocModel | undefined;

    @TypeGuard([is.string])
    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
        return <string>this.name;
    }

    @TypeGuard([is.number])
    public setId(id: number): void {
        this.id = id;
    }

    public getId(): number {
        return <number>this.id;
    }

    @TypeGuard([is.categoryModel])
    public setCategory(category: CategoryMocModel): void {
        this.category = category;
    }

    public getCategory(): CategoryMocModel {
        return <CategoryMocModel>this.category;
    }

}
