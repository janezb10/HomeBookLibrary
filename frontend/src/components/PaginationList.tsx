interface Props {
  numberOfPages: number;
}

const PaginationList = ({ numberOfPages }: Props) => {
  return <div>PaginationList št strani: {numberOfPages}</div>;
};

export default PaginationList;
