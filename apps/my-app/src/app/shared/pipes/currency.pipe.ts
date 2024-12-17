import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'CurrencyPipe',
    standalone: true,
})

export class CurrencyPipe implements PipeTransform{
    transform(value: number) : string {
        return new Intl.NumberFormat("vi", { style: 'currency', currency: 'VND' }).format(value)
    }
}