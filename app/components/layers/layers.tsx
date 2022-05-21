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
  layerId?: number;
  active?: boolean;
  children: React.ReactNode;
}

const LayersItem = ({ layerId, active = false, children }: LayersItemProps) => (
  <li className="layers__item">
    <a
      href={`/${layerId}`}
      className={clsx('layers__trigger', active && 'layers__trigger--active')}
    >
      {children}
    </a>
  </li>
);

/* ---------------------------------------------------------------------------------------------- */

export { Layers, LayersItem };
