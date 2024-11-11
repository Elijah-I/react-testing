import SearchBox from "@/components/SearchBox";

const PlaygroundPage = () => {
  return (
    <SearchBox
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};

export default PlaygroundPage;
