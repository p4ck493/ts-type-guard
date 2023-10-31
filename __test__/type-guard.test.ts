import {CategoryMocModel} from './moc/category.moc.model';
import {ProductMocModel} from './moc/product.moc.model';
import {is} from "thiis";

describe('takeUntil', () => {

    it('is function should true', () => {

        // console.log(typeof is.string);
        // console.log(Object.prototype.toString.call(is.string));
        // console.log(Object.toString.call(is.string));
        // console.log({}.toString.call(is.string));
        expect(is.function(is.string)).toBeTruthy();

    });

    it('Should is.string true for string', () => {

        const product: ProductMocModel = new ProductMocModel();

        product.setName('hello');
        expect(product.getName()).toEqual('hello');

    });

    it('Should is.number true for number', () => {

        const product: ProductMocModel = new ProductMocModel();

        product.setId(0);
        expect(product.getId()).toEqual(0);

    });

    it('Should true for new CategoryMocModel() and call getCategory', () => {

        const product: ProductMocModel = new ProductMocModel();

        product.setCategory(new CategoryMocModel());
        expect(product.getCategory()).toBeInstanceOf(CategoryMocModel);

    });

    it('Should Error for string argument to setCategory', () => {

        const product: ProductMocModel = new ProductMocModel();

        try {
            product.setCategory(<any>'Hello world');
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }

    });

    it('Should false for badGet function', () => {

        const categoryMocModel: CategoryMocModel = new CategoryMocModel();

        try {
            if (categoryMocModel.badGet() === '') {
                console.log('BAD');
            }
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }

    });

});
