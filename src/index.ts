import { is } from '@p4ck493/ts-is';

export enum ErrorTypeEnum {
  NONE,
  THROW,
  CONSOLE,
}

export interface GuardTypeInterface {
  errorType?: ErrorTypeEnum;
  argumentTypeList?: any[];
}

export type GuardTypeRequiredInterface = Required<GuardTypeInterface>;

export function GuardType(argument: any[] | GuardTypeInterface) {
  let configuration: GuardTypeRequiredInterface = {
    errorType: ErrorTypeEnum.THROW,
    argumentTypeList: [is.not.null.or.undefined],
    ...(Array.isArray(argument) ? {} : argument ?? {}),
  };

  if (is.array(argument)) {
    configuration.argumentTypeList = argument;
  } else {
    if (is.object(argument)) {
      configuration = {
        ...configuration,
        ...argument,
      };
    }
  }

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalFn = descriptor.value;

    descriptor.value = function (...args: any) {
      if (configuration?.argumentTypeList?.length) {
        const notFoundError: boolean = args.every((item: any, index: number) => {
          let methodOrList: (argument: unknown) => boolean | any[] = configuration.argumentTypeList[index];
          if (is.undefined(methodOrList)) {
            methodOrList = configuration.argumentTypeList[configuration.argumentTypeList.length - 1];
          }
          if (is.null(methodOrList)) {
            return true;
          }
          if (is.array(methodOrList)) {
            if (methodOrList.length) {
              return methodOrList.every((method: any) => method(item));
            }
          } else {
            return methodOrList(item);
          }
          return true;
        });
        if (!notFoundError) {
          errorMessage(`Bad news for your function: ${String(propertyKey)}, input data!`, configuration.errorType);
        }
      }

      return originalFn.apply(this, args);
    };

    return descriptor;
  };
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
      case ErrorTypeEnum.CONSOLE:
        console.assert(false, message);
        break;
    }
  }
}
