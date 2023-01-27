import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { Pizza } from '../../models';

type FormType = {
  name: FormControl<string | null>;
  toppings: FormControl<string[] | null>;
}

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PizzaFormComponent implements OnChanges{

  public exists = false;

  @Input()
  public pizza?: Pizza | null;
  @Input()
  public toppings?: string[] | null;

  @Output()
  private edit = new EventEmitter<Pizza>();
  @Output()
  private create = new EventEmitter<Pizza>();
  @Output()
  private update = new EventEmitter<Pizza>();
  @Output()
  private remove = new EventEmitter<Pizza>();

  public form: FormGroup<FormType>;

  constructor() { 
    this.form = this.buildForm();
    this.form.valueChanges.subscribe((value) => {
      this.editPizza({
        ...value
      } as Pizza)
    })
  }

  // trigger quand Input change
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pizza'] && this.pizza)
      this.fillForm(this.pizza)
  }

  private buildForm() : FormGroup<FormType> {
    return new FormGroup<FormType>({
      name: new FormControl<string>('', [Validators.required, this.whiteSpaceValidator]),
      toppings: new FormControl<string[]>([], [Validators.required])
    });
  }

  // A déplacer 
  private whiteSpaceValidator(control: AbstractControl): { [key: string]: boolean } |null {
    if(control.value.trim() == "")
      return {'whiteSpace' : true}
    return null
  }

  private fillForm(pizza: Pizza) : void {
    this.form.setValue({
      name: pizza.name?.trim() ?? '',
      toppings: pizza.toppings ?? []
    })
  }

  private fillObject() : Pizza {
    return {
      id: this.pizza?.id,
      name : this.form.value.name ?? "",
      toppings : this.form.value.toppings ?? []
    }
  }
  
  // Passer par un behaviorSubject ++ Demander avis Flavian
  public onCreate() : void {
    console.log("ee")
    this.createPizza(this.fillObject());
  }

  public onUpdate() : void {
    this.updatePizza(this.fillObject());
  }

  public onDelete() : void {
    this.removePizza(this.fillObject());
  }

  public editPizza(pizza: Pizza) : void {
    this.edit.emit(pizza)
  }

  public createPizza(pizza: Pizza) : void {
    this.create.emit(pizza)
  }

  public updatePizza(pizza: Pizza) : void {
    this.update.emit(pizza)
  }

  public removePizza(pizza: Pizza) : void {
    this.remove.emit(pizza)
  }
}
