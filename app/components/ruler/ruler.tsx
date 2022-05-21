import clsx from 'clsx';

/* -------------------------------------------------------------------------------------------------
 * Ruler
 * -----------------------------------------------------------------------------------------------*/

interface RulerProps {
  orientation: 'horizontal' | 'vertical';
}

const Ruler = ({ orientation }: RulerProps) => (
  <ul className={clsx('ruler', `ruler--${orientation}`)}>
    {Array.from({ length: 343 }).map((_, index) => (
      <li className="ruler__tick" key={index} />
    ))}
  </ul>
);

/* ---------------------------------------------------------------------------------------------- */

export { Ruler };
