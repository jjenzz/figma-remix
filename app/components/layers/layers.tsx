import * as React from 'react';
import * as Remix from '@remix-run/react';
import * as DragAndDrop from 'react-dnd';
import * as DragAndDropProvider from 'react-dnd-html5-backend';
import clsx from 'clsx';

/* -------------------------------------------------------------------------------------------------
 * Layers
 * -----------------------------------------------------------------------------------------------*/

interface LayersProps {
  children: React.ReactNode;
}

const Layers = (props: LayersProps) => (
  <DragAndDrop.DndProvider backend={DragAndDropProvider.HTML5Backend}>
    <ol {...props} className="layers" />
  </DragAndDrop.DndProvider>
);

/* -------------------------------------------------------------------------------------------------
 * LayersItem
 * -----------------------------------------------------------------------------------------------*/

interface LayersItemProps {
  id?: string;
  layerId?: number;
  active?: boolean;
  children: React.ReactNode;
  z: number;
  maxZ: number;
}

const LayersItem = ({ id, layerId, z, maxZ, active = false, children }: LayersItemProps) => {
  const ref = React.useRef<HTMLLIElement>(null);
  const fetcher = Remix.useFetcher();

  const [{ isDragging }, drag] = DragAndDrop.useDrag({
    type: 'layer',
    item: () => ({ layerId, z }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [{ handlerId, isOver, border }, drop] = DragAndDrop.useDrop<
    { layerId: number; z: number },
    { layerId: number; z: number },
    { handlerId: any; isOver: boolean; border: 'bottom' | 'top' }
  >({
    accept: 'layer',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isOver: monitor.isOver(),
      border: monitor.getItem()?.z <= z ? 'bottom' : 'top',
    }),
    drop(item) {
      if (typeof z !== 'number') {
        return undefined;
      }

      const dragIndex = item.z;
      const hoverIndex = z;

      if (dragIndex === hoverIndex) {
        return undefined;
      }

      const formData = new FormData();
      formData.set('__action', 'move');
      formData.set('id', String(item.layerId));
      formData.set('z', String(hoverIndex));
      formData.set('fetcher', '1');
      fetcher.submit(formData, { method: 'post', action: `/s/${item.layerId}` });
    },
  });

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;
  return (
    <li
      ref={ref}
      className={clsx('layers__item', isOver && `layers__item--border-${border}`)}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <Remix.Link
        replace
        to={{
          pathname: `/s/${layerId}`,
          hash: `#${id}`,
        }}
        className={clsx('layers__trigger', active && 'layers__trigger--active')}
      >
        {children}
      </Remix.Link>
      <noscript>
        <fetcher.Form className="layers__move-controls" method="post" action={`/s/${layerId}`}>
          <input type="hidden" name="__action" value="move" />
          <input type="hidden" name="id" value={layerId} />
          <button disabled={z >= maxZ} name="z" value={z + 1}>
            ⬇️
          </button>
          <button disabled={z <= 0} name="z" value={z - 1}>
            ⬆️
          </button>
        </fetcher.Form>
      </noscript>
    </li>
  );
};

/* ---------------------------------------------------------------------------------------------- */

export { Layers, LayersItem };
