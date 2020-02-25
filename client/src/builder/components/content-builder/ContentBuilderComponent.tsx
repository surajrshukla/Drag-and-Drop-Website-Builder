import * as React from 'react';

import { ContentComponent, DroppableComponent } from '../';
import { IComponent } from '../../interfaces';
import { ContentBuilderDraggableComponent } from './';

export interface IContentBuilderComponent {
  id?: string;
  cssClass?: string;
  components: IComponent[];
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => (void);
  onDragDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => (void);
  mode: string
}

export class ContentBuilderComponent extends React.Component<IContentBuilderComponent> {

  public render() {
    const { components, id, onDragOver, onDragDrop, mode } = this.props;
    return (
      <ContentComponent>
        {
          components.map(({ name, type, children }: IComponent, componentIndex: number) => (
            <ContentBuilderDraggableComponent
              key={`${id}_${componentIndex}`}
              id={`${id}_${componentIndex}`}
              name={name}
              type={type}
              mode={this.props.mode}
              children={children}
              onDragOver={onDragOver}
              onDragDrop={onDragDrop}
            />
          ))}
          {mode === "edit" ? (
            <DroppableComponent
              name={id}
              onDragOver={(ev) => onDragOver(ev)}
              onDrop={(ev) => onDragDrop(ev, id)}
              mode={mode}
            />
          ): null}
      </ContentComponent>
    );
  }

}
