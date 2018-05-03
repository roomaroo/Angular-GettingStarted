import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: any;
    
    private _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    
    products: IProduct[];
    filteredProducts: IProduct[];

    constructor(private _productService: ProductService) {
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
                    product.productName.toLocaleLowerCase().indexOf(filterBy) != -1);
    }

    ngOnInit(): void {
        this._productService.getProducts()
            .subscribe(
                products => {
                    this.products = products;
                    this.filteredProducts = this.products;
                },
                error => this.errorMessage = <any>error);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onRatingClicked(message: string) : void {
        this.pageTitle = 'Product List: ' + message;
    }
}