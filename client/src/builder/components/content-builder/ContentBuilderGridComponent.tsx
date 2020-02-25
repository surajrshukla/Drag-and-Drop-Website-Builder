import * as React from 'react';

import { DroppableComponent, GridComponent, GridItemComponent  } from '../';
import { IComponent } from '../../interfaces';
import { ContentBuilderDraggableComponent } from './';

export interface IContentBuilderGridComponent {
  id: string;
  children: IComponent[];
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => (void);
  onDragDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => (void);
  mode: string;
}

export const ContentBuilderGridComponent = ({
  id,
  children,
  onDragOver,
  onDragDrop,
  mode
}: IContentBuilderGridComponent) => (
  <GridComponent key={id}>
    {
      children.map(({ children: gridItemChildren, renderProps }: IComponent, gridItemIndex: number) => {
        const gridId = `${id}_${gridItemIndex}`;
        return (
          <GridItemComponent key={gridId} size={renderProps.size}>
            {
              gridItemChildren.map((child: IComponent, index: number) => (
                <ContentBuilderDraggableComponent
                  key={`${gridId}_${index}`}
                  id={`${gridId}_${index}`}
                  name={child.name}
                  type={child.type}
                  mode={mode}
                  children={child.children}
                  onDragOver={onDragOver}
                  onDragDrop={onDragDrop}
                />
              ))
            }
            {mode === "edit" ? (
              <DroppableComponent
                name={gridId}
                onDragOver={(ev) => onDragOver(ev)}
                onDrop={(ev) => onDragDrop(ev, gridId)}
                mode={mode}
              />
            ): null}
          </GridItemComponent>
        );
      })}
  </GridComponent>
);
