import { DestroyRef, Directive, inject, model } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Directive()
export abstract class AbstractValueAccessor<T> implements ControlValueAccessor {
  readonly $value = model<T | null>(null, { alias: 'value' });
  readonly $disabled = model<boolean>(false, { alias: 'disabled' });
  readonly uuid = uuidv4();

  protected readonly _destroyRef = inject(DestroyRef);

  onChanged = (__v: T | null): void => {};
  onTouched = (): void => {};

  writeValue(value: T | null): void {
    if (JSON.stringify(value) !== JSON.stringify(this.$value())) {
      this.$value.set(value);
      this.onChanged(this.$value());
      this.onTouched();
    }
  }

  registerOnChange(fn: (__v: T | null) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.$disabled.set(isDisabled);
  }
}
