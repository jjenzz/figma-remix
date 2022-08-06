import * as Remix from '@remix-run/react';
import clsx from 'clsx';

/* -------------------------------------------------------------------------------------------------
 * Shape
 * -----------------------------------------------------------------------------------------------*/

interface ShapeProps extends Omit<React.ComponentProps<'a'>, 'ref'> {
  id?: string;
  type: 'rect' | 'circle';
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
  active?: boolean;
}

const Shape = (props: ShapeProps) => {
  const {
    id = 'shape',
    type,
    x,
    y,
    width,
    height,
    backgroundColor,
    active = false,
    href,
    ...rest
  } = props;

  return (
    /* eslint-disable-next-line jsx-a11y/anchor-has-content */
    <Remix.Link
      replace
      to={{
        pathname: href,
        hash: `#${id}`,
      }}
      id={id}
      {...rest}
      className={clsx('shape', `shape--${type}`, active && 'shape--active')}
      style={{
        ...props.style,
        ...(x && { ['--shape-x' as any]: x + 'px' }),
        ...(y && { ['--shape-y' as any]: y + 'px' }),
        ...(width && {
          ['--shape-width' as any]: width + 'px',
        }),
        ...(height && {
          ['--shape-height' as any]: height + 'px',
        }),
        ...(backgroundColor && {
          ['--shape-background' as any]: backgroundColor,
        }),
      }}
    />
  );
};

/* ---------------------------------------------------------------------------------------------- */

export { Shape };
