import {
  AfterViewInit,
  Directive,
  ViewContainerRef,
  EventEmitter,
  Host,
  Input,
  Optional,
  Output,
  Renderer2,
  Self,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith } from 'rxjs';

/**
 * Works from angular-material version 15. since all classes got the new prefix 'mdc-'
 */
@Directive({
  selector: "[style-paginator]",
  standalone: true,
  host: {ngSkipHydration: 'true'},
})

export class StylePaginatorDirective implements AfterViewInit {
  @Output() pageIndexChangeEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  @Input() showFirstButton = true;
  @Input() showLastButton = true;
  @Input() renderButtonsNumber = 2;
  @Input() hideDefaultArrows = false;

  private containerRef!: HTMLElement;
  private buttonsRef!: HTMLElement;

  constructor(
    @Host() @Self() @Optional() public readonly matPag: MatPaginator,
    private elementRef: ViewContainerRef,
    private ren: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.styleDefaultPagination();
    this.createContainerDivRef();
    this.renderButtons();
  }

  private renderButtons(): void {
    this.buildButtons();

    // when pagination change -> change button styles
    this.matPag.page
      .pipe(
        map((e) => [e.previousPageIndex ?? 0, e.pageIndex]),
        startWith([0, 0])
      )
      .subscribe(([prev, curr]) => {
        this.updatePaginatorLegend(curr);
      });
  }

  private updatePaginatorLegend(currentIndex: number) {
    const itemsPerPage = this.elementRef.element.nativeElement.querySelector(
      '.mat-mdc-paginator-page-size-label'
    );

    this.ren.setProperty(itemsPerPage, 'innerHTML', this.genPaginatorLabel(currentIndex));
    this.buttonsRef.innerHTML = String(currentIndex+1);
  }

  private genPaginatorLabel(page: number) {
    const pgSize = this.matPag.pageSize;
    const length = Math.max(this.matPag.length, 0);
    const startIndex = page * pgSize;

    const endIndex =
      startIndex < length ? Math.min(startIndex + pgSize, length) : startIndex + pgSize;

    return `Showing ${startIndex + 1}-${endIndex} of ${length} entries`;
  }

  private styleDefaultPagination() {
    const nativeElement = this.elementRef.element.nativeElement;
    const itemsCountDiv = nativeElement.querySelector(
      '.mat-mdc-paginator-page-size-value'
    );
    const howManyDisplayedEl = nativeElement.querySelector(
      '.mat-mdc-paginator-range-label'
    );
    const previousButton = nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-previous'
    );
    const nextButtonDefault = nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-next'
    );
    const paginatorContainer = nativeElement.querySelector(
      '.mat-mdc-paginator-container'
    );
    const paginatorOuterContainer = nativeElement.querySelector(
      '.mat-mdc-paginator-outer-container'
    );

    // remove 'pageSize'
    this.ren.setStyle(itemsCountDiv, 'display', 'none');

    // Center the paginator controls.
    this.ren.setStyle(paginatorContainer, 'display', 'grid');
    this.ren.setStyle(paginatorContainer, 'justify-content', 'center');
    this.ren.setAttribute(paginatorOuterContainer, 'layout-align', 'center center');
    this.ren.setAttribute(paginatorOuterContainer, 'layout', 'column');
   
    // style text of how many elements are currently displayed
    this.ren.setStyle(howManyDisplayedEl, 'display', 'none');

    // check whether the user wants to remove left & right default arrow
    if (this.hideDefaultArrows) {
      this.ren.setStyle(previousButton, 'display', 'none');
      this.ren.setStyle(nextButtonDefault, 'display', 'none');
    }
  }

  private createContainerDivRef(): void {
    const actionContainer = this.elementRef.element.nativeElement.querySelector(
      'div.mat-mdc-paginator-range-actions'
    );
    const nextButtonDefault = this.elementRef.element.nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-next'
    );

    // create a HTML element where all bubbles will be rendered
    this.containerRef = this.ren.createElement('div') as HTMLElement;
    this.ren.addClass(this.containerRef, 'paginator-container');

    // render element before the 'next button' is displayed
    this.ren.insertBefore(
      actionContainer,
      this.containerRef,
      nextButtonDefault
    );
  }

  private buildButtons(): void {
    const neededButtons = Math.ceil(
      this.matPag.length / this.matPag.pageSize
    );

    // if there is only one page, do not render buttons
    if (neededButtons === 1) {
      this.ren.setStyle(this.elementRef.element.nativeElement, 'display', 'none');
      return;
    }

    this.buttonsRef = this.createButton(this.matPag.pageIndex);
    this.ren.setStyle(this.buttonsRef, 'display', 'flex');
  }

  private createButton(i: number): HTMLElement {
    const linkBtn = this.ren.createElement('div');
    const text = this.ren.createText(String(i));

    // add class & text
    this.ren.setStyle(linkBtn, "margin", "0.5rem");
    this.ren.addClass(linkBtn, 'paginator');
    this.ren.setStyle(linkBtn, 'margin-right', '8px');
    this.ren.appendChild(linkBtn, text);

    this.ren.listen(linkBtn, 'click', () => {
      this.switchPage(i);
    });

    this.ren.appendChild(this.containerRef, linkBtn);
    this.ren.setStyle(linkBtn, 'display', 'none');

    return linkBtn;
  }

  private switchPage(i: number): void {
    const previousPageIndex = this.matPag.pageIndex;
    this.matPag.pageIndex = i;
    this.matPag['_emitPageEvent'](previousPageIndex);

    this.pageIndexChangeEmitter.emit(i);
  }
}
