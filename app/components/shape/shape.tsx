import clsx from 'clsx';

/* -------------------------------------------------------------------------------------------------
 * Shape
 * -----------------------------------------------------------------------------------------------*/

interface ShapeProps extends React.ComponentProps<'a'> {
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
    ...rest
  } = props;

  return (
    /* eslint-disable-next-line jsx-a11y/anchor-has-content */
    <a
      href={'#' + id}
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
