import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeleteConfirmationComponent } from '../../modals/delete-confirmation/delete-confirmation.component';
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

  constructor(private dialogRef: MatDialog) { 
    this.form = this.buildForm();

    this.form.valueChanges.subscribe((value) => {
      this.editPizza({
        ...value
      } as Pizza)
    })
  }

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
  
  public buttonClicked(key : string) : void {
    switch(key){
      case 'create':
        this.create.emit(this.fillObject())
        break
      case 'update':
        this.update.emit(this.fillObject())
        break
      case 'remove':
        this.openDeleteConfirmationModal().subscribe(e => {
          if(e.data)
            this.remove.emit(this.fillObject())
        })
        break
    }
  }

  public editPizza(pizza: Pizza) : void {
    this.edit.emit(pizza)
  }

  openDeleteConfirmationModal() : Observable<any>{
    return this.dialogRef
      .open(DeleteConfirmationComponent, {width: '250px', height: '150px'})
      .afterClosed()
  }

  // A déplacer 
  private whiteSpaceValidator(control: AbstractControl): { [key: string]: boolean } |null {
    if(control.value.trim() == "")
      return {'whiteSpace' : true}
    return null
  }
}
