type Props = {
  name: string;
  children: string;
  options: string[];
};

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const Select = ({ name, options, children }: Props) => {
  return (
    <div>
      <label htmlFor={name}>{children}</label>
      <select id={name}>
        {options.map((option) => (
          <option value={option} key={option}>
            {capitalize(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
