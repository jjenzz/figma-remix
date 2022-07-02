import { Form } from '@remix-run/react';

/* -------------------------------------------------------------------------------------------------
 * Config
 * -----------------------------------------------------------------------------------------------*/

interface ConfigProps extends React.ComponentProps<typeof Form> {
  children: React.ReactNode;
}

const Config = (props: ConfigProps) => <Form {...props} className="config" method="post" />;

interface ConfigPanelProps {
  children: React.ReactNode;
}

/* -------------------------------------------------------------------------------------------------
 * ConfigPanel
 * -----------------------------------------------------------------------------------------------*/

const ConfigPanel = (props: ConfigPanelProps) => <fieldset {...props} className="config__panel" />;

/* -------------------------------------------------------------------------------------------------
 * ConfigInput
 * -----------------------------------------------------------------------------------------------*/

interface ConfigInputProps extends React.ComponentProps<'input'> {
  label: string;
}

const ConfigInput = ({ label, ...props }: ConfigInputProps) => (
  <label>
    {label}
    <input {...props} autoComplete="off" />
  </label>
);

/* -------------------------------------------------------------------------------------------------
 * ConfigFooter
 * -----------------------------------------------------------------------------------------------*/

interface ConfigFooterProps {
  children: React.ReactNode;
}

const ConfigFooter = (props: ConfigFooterProps) => <div {...props} className="config__footer" />;

/* ---------------------------------------------------------------------------------------------- */

export { Config, ConfigPanel, ConfigInput, ConfigFooter };
