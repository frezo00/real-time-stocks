import { InjectionToken, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

export type BaseFormProvider<T, K> = {
  provide: InjectionToken<readonly K[]>;
  useExisting: Type<T>;
  multi: boolean;
};

export function controlProvider<T>(component: Type<T>): BaseFormProvider<T, ControlValueAccessor> {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: component,
    multi: true,
  };
}

export function validatorProvider<T>(component: Type<T>): BaseFormProvider<T, Validator> {
  return {
    provide: NG_VALIDATORS,
    useExisting: component,
    multi: true,
  };
}
