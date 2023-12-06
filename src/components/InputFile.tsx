type Props = { name: string; children: string };
const InputFile = ({
  name,
  children,
  ...props
}: Props & React.ComponentProps<'input'>) => {
  return (
    <div>
      <label htmlFor={name}>{children}</label>
      <input {...props} type="file" name={name} id={name} />
    </div>
  );
};

export default InputFile;
