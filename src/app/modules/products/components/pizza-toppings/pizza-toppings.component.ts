import { Component, ChangeDetectionStrategy, forwardRef, Input, OnInit} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-pizza-toppings',
    templateUrl: './pizza-toppings.component.html',
    styleUrls: ['./pizza-toppings.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PizzaToppingsComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaToppingsComponent 
    implements ControlValueAccessor, OnInit {

    @Input()
    public toppings: string[] = [];

    public selectedToppings$ = new BehaviorSubject<{ [key: string]: boolean }>({})
    
    //voir pour le destroy quand tout le reste sera compris

    constructor() { }

    ngOnInit(){}

    toggleTopping(topping : string) : void {
        const selectedToppings = this.selectedToppings$.getValue()

        const newSelectedToppings = {
            ...selectedToppings,
            [topping] : !selectedToppings[topping]
        }
        this.selectedToppings$.next(newSelectedToppings)
        this.onChange(this.mapDictionaryToArray(newSelectedToppings))
    }

    public mapArrayToDictionary(toppings: string[]): { [key: string] : boolean } {       
        return toppings.reduce((acc, item) => {        
            acc[item] = true;
            return acc;
        }, {} as { [key: string] : boolean })
    }

    public mapDictionaryToArray(toppings: { [key: string] : boolean }) : string[] {
        const result: string[] = []

        Object.keys(toppings).forEach(topping => {
            if(toppings[topping])
                result.push(topping)
        })
        return result
    }

    writeValue(toppings: string[]): void {
        this.selectedToppings$.next(this.mapArrayToDictionary(toppings))
    }

    private onChange = (toppings: string[]) => {};

    private onTouch = () => {
        console.log("onTouch function")
    };

    public onFocus() {
        console.log("onFocus function");
    }

    registerOnChange(fn: (toppings: string[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouch = fn;
    }
}
