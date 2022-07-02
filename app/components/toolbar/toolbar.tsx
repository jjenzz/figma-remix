import { Form } from '@remix-run/react';

/* -------------------------------------------------------------------------------------------------
 * Toolbar
 * -----------------------------------------------------------------------------------------------*/

interface ToolbarProps extends React.ComponentProps<typeof Form> {
  children: React.ReactNode;
}

const Toolbar = (props: ToolbarProps) => <Form {...props} className="toolbar" />;

/* -------------------------------------------------------------------------------------------------
 * ToolbarItem
 * -----------------------------------------------------------------------------------------------*/

interface ToolbarItemProps {
  type: 'circle' | 'rect';
  children: React.ReactNode;
}

const ToolbarItem = ({ type, children }: ToolbarItemProps) => (
  <button name="shape" value={type} className={`toolbar__button toolbar__button--${type}`}>
    {children}
    <span className="toolbar__icon" />
  </button>
);

/* ---------------------------------------------------------------------------------------------- */

export { Toolbar, ToolbarItem };
