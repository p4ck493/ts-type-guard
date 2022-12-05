![NPM Latest Version](https://img.shields.io/npm/v/@p4ck493/ts-type-guard)
![Downloads Count](https://img.shields.io/npm/dm/@p4ck493/ts-type-guard.svg)
![Bundle Size](https://packagephobia.now.sh/badge?p=@p4ck493/ts-type-guard)
![Test Status](https://img.shields.io/travis/p4ck493/ts-type-guard/main.svg)
![Last Update Date](https://img.shields.io/github/last-commit/p4ck493/ts-type-guard)
![Project License](https://img.shields.io/github/license/p4ck493/ts-type-guard)
![Issues](https://img.shields.io/github/issues/p4ck493/ts-type-guard)
![Forks](https://img.shields.io/github/forks/p4ck493/ts-type-guard)
![Stars](https://img.shields.io/github/stars/p4ck493/ts-type-guard)
![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2Fp4ck493%2Fts-type-guard)

# ts-type-guard

## Prerequisites

Use this package in cases where you need to check the input data to a method!


## Table of contents

- [ts-type-guard](#ts-type-guard)
    - [Prerequisites](#prerequisites)
    - [Table of contents](#table-of-contents)
    - [Installation](#installation)
    - [Usage](#usage)
        - [Import](#import)
        - [Example](#example)
    - [API](#api)
    - [Contributing](#contributing)
    - [Authors](#authors)
    - [License](#license)

## Installation

```sh
npm install @p4ck493/ts-type-guard

// Additional package
npm install @p4ck493/ts-is
```

## Usage

### Import

```sh
import {TypeGuard} from "@p4ck493/ts-type-guard";
```

### Example

```typescript

namespace Product {
    @RegisterInIs({
        className: 'productModel',
        customMethod: 'customNameOfMethod'
    })
    export class Model {
        // ...
        public static customNameOfMethod(argument: unknown): argument is Model {
            return argument instanceof Model;
        }
        // ...
    }
}

class ProductService {

    @TypeGuard([is.productModel])
    postItem(body: Product.Model) {
        // ...
    }

    @TypeGuard([[is.not.null, is.not.undefined], is.productModel])
    putItem(id: string, body: Product.Model) {
        // ...
    }
    
    // OR

    @TypeGuard([is.not.null.or.undefined, is.productModel])
    putItem(id: string, body: Product.Model) {
        // ...
    }
    
    // Another example, when need skip some check proccess
    @TypeGuard([is.number, null, is.string])
    someMethod(one: number, two: any, three: string) {
        
    }
    
    // OR empty array, is the same case ^
    @TypeGuard([is.number, [], is.string])
    someMethod(one: number, two: any, three: string) {

    }
    
    // IF NEED ONLY ONE CHECK METHOD FOR ALL ARGUMENT
    @TypeGuard([is.number])
    someMethod(one: number, two: number, three: number) {

    }

    // ANOTHER VARIANT
    @TypeGuard({
        argumentTypeList: [is.not.null.or.undefined],
    })
    someMethod(one: number, two: number, three: number) {

    }

    // ALSO YOU CAN MODIFY VARIANT OF MESSAGE
    @TypeGuard({
        errorType: ErrorTypeEnum.CONSOLE, // VARIANTS: THROW, CONSOLE, NONE
        argumentTypeList: [is.not.null.or.undefined],
    })
    someMethod(one: number, two: number, three: number) {

    }
    
}


```


## API 

| Name       | Argument                    |
|------------|-----------------------------|
| @TypeGuard | array or TypeGuardInterface |


## Contributing

[//]: # (Please read [CONTRIBUTING.md]&#40;CONTRIBUTING.md&#41; for details on our code of conduct, and the process for submitting pull requests to us.)

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Add your changes: `git add .`
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request 😎

## Authors

* **Ivan Karbashevskyi** - *Initial work* - [Karbashevskyi](https://github.com/Karbashevskyi)

See also the list of [contributors](https://github.com/p4ck493/ts-type-guard/contributors) who participated in this project.

## License

[MIT License](https://andreasonny.mit-license.org/2019) © p4ck493
