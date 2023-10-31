import { is } from 'thiis';

export enum ErrorTypeEnum {
  NONE,
  THROW,
}

export interface TypeGuardInterface {
  errorType?: ErrorTypeEnum;
  arguments?: any[];
  result?: any | any[];
}

export type TypeGuardRequiredInterface = Required<TypeGuardInterface>;

export function TypeGuard(argument: unknown[] | TypeGuardInterface) {
  const configuration: TypeGuardRequiredInterface = {
    errorType: ErrorTypeEnum.THROW,
    arguments: [is.not_null_or_undefined],
    result: undefined,
    ...(is.array(argument)
      ? {
          arguments: argument,
        }
      : argument ?? {}),
  };

  return (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalFn = descriptor.value;

    descriptor.value = function (...args: any) {
      checkArguments(configuration, args, propertyKey);
      return checkResult(originalFn.apply(this, args), propertyKey, configuration);
    };

    return descriptor;
  };
}

function checkArguments(configuration: TypeGuardRequiredInterface, args: any, propertyKey: string): void {
  if (configuration?.arguments?.length) {
    const notFoundError = args.every((item: unknown, index: number) => {
      let methodOrList: any = configuration.arguments[index];
      if (is.undefined(methodOrList)) {
        methodOrList = configuration.arguments[configuration.arguments.length - 1];
      }
      if (is.array(methodOrList)) {
        return methodOrList.every((method: any) => method(item));
      } else if (is.Function(methodOrList)) {
        return methodOrList.apply<any, any, any>({}, [item]);
      }
      return true;
    });
    if (!notFoundError) {
      errorMessage(`${String(propertyKey)}: One of the arguments has an unexpected value.`, configuration.errorType);
    }
  }
}

function checkResult(result: any, propertyKey: string, configuration: TypeGuardRequiredInterface): boolean {
  let foundError = false;

  if (is.array(configuration.result)) {
    if (is.array(result)) {
      if (configuration.result.length !== result.length) {
        errorMessage(
          `${String(propertyKey)}: Add more checks to check the result of the method execution.`,
          configuration.errorType,
        );
      }
      for (let i = 0; i < configuration.result.length; i++) {
        foundError = (configuration.result[i] as any)(result[i]);
        if (foundError) {
          break;
        }
      }
    } else {
      foundError = is.false(configuration.result.every((method: any) => method(result)));
    }
  } else if (is.Function(configuration.result)) {
    foundError = is.false(configuration.result(result));
  }

  if (foundError) {
    errorMessage(
      `${String(propertyKey)}: The result of the execution of the function is unexpected.`,
      configuration.errorType,
    );
  }

  return result;
}

/**
 *
 * @param message is string, write you custom message
 * @param typeOfError choice your method showing of error
 */
function errorMessage(message: string = 'Error', typeOfError: ErrorTypeEnum) {
  if (typeOfError) {
    switch (typeOfError) {
      case ErrorTypeEnum.THROW:
        throw new Error(message);
    }
  }
}
