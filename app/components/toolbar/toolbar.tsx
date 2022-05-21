/* -------------------------------------------------------------------------------------------------
 * Toolbar
 * -----------------------------------------------------------------------------------------------*/

interface ToolbarProps extends React.ComponentProps<'form'> {
  children: React.ReactNode;
}

const Toolbar = (props: ToolbarProps) => <form {...props} className="toolbar" />;

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
