import { useParams } from "react-router";

const ReadPage = () => {
  const { tno } = useParams();

  return (
    <div className="bg-white w-full">
      <div className="text-4xl">Todo Read Page {tno}</div>
    </div>
  );
};

export default ReadPage;
