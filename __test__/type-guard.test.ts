import {CategoryMocModel} from './moc/category.moc.model';
import {ProductMocModel} from './moc/product.moc.model';

describe('takeUntil', () => {

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

    it('Should is.categoryModel true for new CategoryMocModel()', () => {

        const product: ProductMocModel = new ProductMocModel();

        product.setCategory(new CategoryMocModel());
        expect(product.getCategory()).toBeInstanceOf(CategoryMocModel);

    });

    it('Should is.categoryModel false for string', () => {

        const product: ProductMocModel = new ProductMocModel();

        try {
            product.setCategory(<any>'Hello world');
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }

    });

});
