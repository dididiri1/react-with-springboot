import { useParams } from "react-router";
import ModifyComponent from "../../components/products/modifyComponent";
import jwtAxios from "../../util/jwtUtil";
import { useQuery } from "@tanstack/react-query";
import PendingModal from "../../components/common/pendingModal";

function ModifyPage() {
  const { pno } = useParams(); // id를 가져옴

  const { data, isPending, error } = useQuery({
    queryKey: ["product", pno],
    queryFn: async () => {
      const res = await jwtAxios.get(
        `http://localhost:8080/api/products/${pno}`
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });

  const product: ProductDTO = data;

  console.log(product);

  return (
    <div className="p-4 w-full bg-white">
      {isPending && <PendingModal />}

      <div className="text-3xl font-extrabold">Products Modify Page</div>

      {data && <ModifyComponent product={product} />}
    </div>
  );
}

export default ModifyPage;
