import { Component, DebugElement, ElementRef } from "@angular/core";
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CommentHighlightDirective } from './comment-highlight.directive';
import { By, element } from 'protractor';

@Component({
  template: `<div appComment [authorId]="authorId" id="1"></div>
             <div appComment [authorId]="authorId1" id="2"></div>`
})
class TestComponent {
  authorId = "5e489dfs974abe"
  authorId1 = "6e3asddfds74ab2"
}

describe('CommentHighlightDirective', () => {
    let component: TestComponent
    let fixture: ComponentFixture<TestComponent>
    let directive: CommentHighlightDirective
    let elementRef: MockElementRef

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [TestComponent, CommentHighlightDirective],
          providers: [{provide: ElementRef, useClass: MockElementRef}]
        }).compileComponents()
        elementRef = TestBed.inject(ElementRef)
        fixture = TestBed.createComponent(TestComponent)
        component = fixture.componentInstance
        directive = new CommentHighlightDirective(elementRef)
        spyOn(localStorage, "getItem").and.returnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiX2lkIjoiNWU0ODlkZnM5NzRhYmUiLCJhZG1pbiI6ImZhbHNlIiwiaWF0IjoxNTE2MjM5MDIyfQ.uIAJnUZeTR1gT17gO2-m-svTLTlgBxq9MPMCjYAT8GI')
        fixture.detectChanges()
    }))

    it('should create an instance', () => {
      expect(directive).toBeTruthy()      
    })
    it('should set default styles', () => {
      expect(fixture.nativeElement.querySelector('div').style.width).toEqual('100%')
      expect(fixture.nativeElement.querySelector('div').style.display).toEqual('block')
      expect(fixture.nativeElement.querySelector('div').style.whiteSpace).toEqual('pre-wrap')
      expect(fixture.nativeElement.querySelector('div').style.padding).toEqual('0.5rem')
      expect(fixture.nativeElement.querySelector('div').style.borderRadius).toEqual('0.5rem')
      expect(fixture.nativeElement.querySelector('div').style.margin).toEqual('0.5rem')
    })
    it('should set bg color for my comments', () => {
      expect(fixture.debugElement.query((de) => {return de.nativeElement.id === '1'})
        .styles.backgroundColor).toEqual('rgb(222, 222, 222)')
    })
    it('should set default bg color for comments', () => {
      expect(fixture.debugElement.query((de) => {return de.nativeElement.id === '2'})
        .styles.backgroundColor).toEqual('rgb(255, 255, 255)')
    })
});

class MockElementRef extends ElementRef {}
