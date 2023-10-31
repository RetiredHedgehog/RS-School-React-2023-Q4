type Props = {
  values: string[];
  id: string;
};

const SearchTerms = ({ values, id }: Props) => {
  return (
    <datalist id={id}>
      {values?.map((value, index) => {
        return <option key={index} value={value} />;
      })}
    </datalist>
  );
};

export default SearchTerms;
