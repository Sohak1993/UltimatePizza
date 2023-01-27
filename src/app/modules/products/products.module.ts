import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductsRoutingModule } from './products-routing.module';
import { containers } from './containers';
import { components } from './components';
import { services } from './services';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from './modals/delete-confirmation/delete-confirmation.component'

@NgModule({
    imports: [
        CommonModule,
        ProductsRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatDialogModule,
    ],
    declarations: [
        ...containers,
        ...components,
        DeleteConfirmationComponent
    ],
    providers: [
        ...services
    ]
})
export class ProductsModule { }
