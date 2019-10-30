import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/Category';
import { ResponseServer } from 'src/app/interfaces/ResponseServer';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: [ './category.component.css' ]
})

export class CategoryComponent implements OnInit {

  categories: Category[];
  response: ResponseServer;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => this.categories = categories);
  }

  deleteCategory(category: Category): void {
    this.categoryService.deleteCategory(category.id).subscribe((response: ResponseServer) => {
      this.response = response;
      if (response.status === 200) {
        this.getCategories();
      }
    }
    );
  }

}
