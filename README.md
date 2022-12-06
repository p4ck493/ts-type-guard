# ts-type-guard
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

## 💡 Idea

The idea is to make a decorator for the method that will check the input and output data of the method with the possibility of writing your own check methods or using ready ones from another package.


## 📝 Table of contents

- [ts-type-guard](#ts-type-guard)
    - [Idea](#-idea)
    - [Table of contents](#-table-of-contents)
    - [Installation](#-installation)
    - [Usage](#-usage)
        - [Import](#import)
        - [Example](#example)
    - [API](#-api)
    - [Contributing](#-contributing)
    - [Authors](#-authors)
    - [License](#-license)

## 💿 Installation

```sh
npm install @p4ck493/ts-type-guard

// If you don`t want to write your own checks, download this package
npm install @p4ck493/ts-is
```

## 🙌 Usage

### Import

```sh
import {TypeGuard} from "@p4ck493/ts-type-guard";
```

### Example

```typescript
import {TypeGuard} from '@p4ck493/ts-type-guard';
import {is} from '@p4ck493/ts-is';

class Class {
    #variable;
    
    @TypeGuard([is.string, is.not.null.or.undefined, is.number, null])
    exampleWithArguments(argument1, argumnt2, argument3, argument4?) {
        return arguments;
    }
    
    @TypeGuard({
        arguments: [is.string],
        result: [is.boolean]
    })
    exampleWithResultAndArguments(argument) {
        try {
            this.#variable = JSON.parse(argument);
            return true;
        } catch(e) {
            return false;
        }
    }

    // If you need to skip some argument from the validation, also an alternative to NULL is an empty array []
    @TypeGuard([is.number, null, is.string])
    exampleWithSkupArgumentCheck(one: number, two: any, three: string) {
        // ...
    }

    // If you write only one method, it will be used to check each argument
    @TypeGuard([is.number])
    exampleWithOneCheckersForEachArgument(one: number, two: number, three: number) {

    }

    // Alternative for prev. example
    @TypeGuard({
        arguments: [is.not.null.or.undefined],
    })
    exampleAlternativeOfUsing(one: number, two: number, three: number) {

    }

    // If you need to turn off the error message
    @TypeGuard({
        errorType: ErrorTypeEnum.NONE, // VARIANTS: THROW, NONE
        arguments: [is.not.null.or.undefined],
    })
    exampleOfTurningOffErrorMessage(one: number, two: number, three: number) {

    }
}

const cl: Class = new Class();
cl.exampleWithResultAndArguments({bad: 'value'}) // Bad
cl.exampleWithResultAndArguments('') // Good

```


## 🗃️ API

| Name       | Argument                    |
|------------|-----------------------------|
| @TypeGuard | array or TypeGuardInterface |


## 👤 Contributing

[//]: # (Please read [CONTRIBUTING.md]&#40;CONTRIBUTING.md&#41; for details on our code of conduct, and the process for submitting pull requests to us.)

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Add your changes: `git add .`
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request 😎

## ✍️ Authors

* **Ivan Karbashevskyi** - *Initial work* - [Karbashevskyi](https://github.com/Karbashevskyi)

See also the list of [contributors](https://github.com/p4ck493/ts-type-guard/contributors) who participated in this project.

## 📜 License

[MIT License](https://andreasonny.mit-license.org/2019) © p4ck493
