import * as Remix from '@remix-run/react';
import clsx from 'clsx';

/* -------------------------------------------------------------------------------------------------
 * Layers
 * -----------------------------------------------------------------------------------------------*/

interface LayersProps {
  children: React.ReactNode;
}

const Layers = (props: LayersProps) => <ol {...props} className="layers" />;

/* -------------------------------------------------------------------------------------------------
 * LayersItem
 * -----------------------------------------------------------------------------------------------*/

interface LayersItemProps {
  id?: string;
  layerId?: number;
  active?: boolean;
  children: React.ReactNode;
}

const LayersItem = ({ id, layerId, active = false, children }: LayersItemProps) => (
  <li className="layers__item">
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
  </li>
);

/* ---------------------------------------------------------------------------------------------- */

export { Layers, LayersItem };
