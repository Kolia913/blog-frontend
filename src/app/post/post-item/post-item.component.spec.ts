import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PostItemComponent} from './post-item.component';
import {CategoryService} from '../../category/common/service/category.service';
import Spy = jasmine.Spy;
import {CategoryModel} from '../../category/common/model/category.model';
import {of} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {PostModel} from '../common/model/post.model';



describe('PostItemComponent', () => {
  let component: TestComponent
  let fixture: ComponentFixture<TestComponent>
  let categoryService: CategoryService
  let spy: Spy
  let mockCategory: CategoryModel
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PostItemComponent, TestComponent],
      providers: [CategoryService]
    }).compileComponents()
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    mockCategory = {color: 'color', description: 'about games', title: 'Games'};
    spy = spyOn(categoryService, 'get').withArgs('games').and.returnValue(of(mockCategory))
    fixture.detectChanges()
  })
  it('should have input', () => {
    expect(fixture.nativeElement.querySelector('p').innerText).toEqual('desc')
  });
  it('should create component', () => {
    expect(component).toBeTruthy()
  })
  it('should call CategoryService', () => {
    expect(spy.calls.any()).toBeTruthy()
  });
  it('should get category', () => {
    expect(fixture.nativeElement.querySelector('p').innerText).toEqual('desc')
  });
})

@Component({
  selector: 'app-test-component',
  template: '<app-post-item [post]="post"></app-post-item>'
})
export class TestComponent {
  post: PostModel = {categorySlug: 'games', content: 'content', description: 'desc', image: undefined, title: 'title'}
}
