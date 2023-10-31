import NamedEndpointResponse from '../../types/namedEndpointResponse';
import NamedApiResource from '../../types/namedAPIResource';
import helpers from '../../helpers';

type Props = {
  searchText: string;
  searchType: string;
  setPage: (page: NamedEndpointResponse<NamedApiResource>) => void;
};

const SearchButton = ({ searchText, searchType, setPage }: Props) => {
  const handleButtonClick = async (text: string, type: string) => {
    helpers.saveSearchText(text);
    helpers.saveSearchType(type);
    setPage({
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: text,
          url: helpers.getPokemonUrl(text),
        },
      ],
    });
  };

  return (
    <button onClick={() => handleButtonClick(searchText, searchType)}>
      Search
    </button>
  );
};

export default SearchButton;
