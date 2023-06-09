import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

// import { ChatBotReactComponent } from './ChatBotReactComponent';
import { CustomReactComponent } from "./CustomReactComponent";
import { ChatBotReactComponent } from "./ChatBotReactComponent";

const containerElementName = "customReactComponentContainer";

@Component({
  selector: "app-my-component",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span #${containerElementName}></span>`,
  // styleUrls: [''],
  encapsulation: ViewEncapsulation.None,
})
export class CustomReactComponentWrapperComponent
  implements OnChanges, OnDestroy, AfterViewInit
{
  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;

  @Input() public counter = 10;
  @Output() public componentClick = new EventEmitter<void>();

  constructor() {
    this.handleDivClicked = this.handleDivClicked.bind(this);
  }

  public handleDivClicked() {
    if (this.componentClick) {
      this.componentClick.emit();
      this.render();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes", changes);
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  private render() {
    const { counter } = this;
    const root = createRoot(this.containerRef.nativeElement);

    root.render(
      <React.StrictMode>
        <div>
          <ChatBotReactComponent
            counter={counter}
            onClick={this.handleDivClicked}
          />
        </div>
      </React.StrictMode>
    );
  }
}
