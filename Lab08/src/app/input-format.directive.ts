import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputFormat]',
  standalone: true
})
export class InputFormatDirective {
  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('blur')
  onBlur(): void {
    const currentValue = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value = currentValue.toUpperCase();
  }
}
