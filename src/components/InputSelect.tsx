type Props = {
  name: string;
  children: string;
  options: string[];
};

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const InputSelect = ({ name, options, children, ...props }: Props) => {
  return (
    <div>
      <label htmlFor={name}>{children}</label>
      <select id={name} {...props}>
        {options.map((option) => (
          <option value={option} key={option}>
            {capitalize(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
