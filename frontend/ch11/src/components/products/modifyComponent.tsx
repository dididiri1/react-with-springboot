import { type MouseEvent, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/resultModal";
import jwtAxios from "../../util/jwtUtil";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function ModifyComponent({ product }: { product: ProductDTO }) {
  const { moveToRead, moveToList } = useCustomMove();
  const [images, setImages] = useState<string[]>([...product.uploadFileNames]);

  const deleteOldImages = (
    event: MouseEvent<HTMLButtonElement>,
    target: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setImages((prev) => prev.filter((img) => img !== target));
  };

  const queryClient = useQueryClient();

  const deleteMutaion = useMutation({
    mutationFn: async () => {
      const res = await jwtAxios.delete(
        `http://localhost:8080/api/products/${product.pno}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", String(product.pno)],
      });
      queryClient.invalidateQueries({
        queryKey: ["products/list"],
        exact: false,
      });
    },
  });

  const modifyMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const header = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await jwtAxios.put(
        `http://localhost:8080/api/products/${product.pno}`,
        formData,
        header
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", String(product.pno)],
      });
      queryClient.invalidateQueries({
        queryKey: ["products/list"],
        exact: false,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    const actionType = submitter.value;

    console.log("actionType", actionType);

    if (actionType === "modify") {
      modifyMutation.mutate(formData);
    } else if (actionType === "delete") {
      deleteMutaion.mutate();
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4 bg-white">
      {(deleteMutaion.data || modifyMutation.data) && (
        <ResultModal
          title="처리완료"
          content="처리 완료"
          callbackFn={() => {
            console.log(deleteMutaion.data);

            if (modifyMutation.data?.RESULT === "SUCCESS") {
              moveToRead(product.pno);
            }
            if (deleteMutaion.data?.RESULT === "SUCCESS") {
              moveToList();
            }
          }}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mt-10">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">PNO</div>
            <input
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              name="pno"
              required
              defaultValue={product.pno}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">PNAME</div>
            <input
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              name="pname"
              required
              defaultValue={product.pname}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">PRICE</div>
            <input
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              name="price"
              type="number"
              defaultValue={product.price}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">PDESC</div>
            <textarea
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
              name="pdesc"
              rows={4}
              required
              defaultValue={product.pdesc}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">Files</div>
            <input
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              type="file"
              name="files"
              multiple
            />
          </div>
        </div>

        <div className="w-full justify-center flex flex-col m-auto items-center">
          {images.map((imgFile, i) => (
            <div className="flex justify-center flex-col w-1/3" key={i}>
              <button
                className="bg-blue-500 text-3xl text-white"
                onClick={(event) => deleteOldImages(event, imgFile)}
              >
                DELETE
              </button>
              <img
                alt="img"
                src={`http://localhost:8080/api/products/view/s_${imgFile}`}
              />
              <input type="hidden" name="uploadFileNames" value={imgFile} />
            </div>
          ))}
        </div>

        <div className="flex justify-end p-4">
          <button
            type="submit"
            name="actionType"
            value="delete"
            className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          >
            Delete
          </button>

          <button
            type="submit"
            name="actionType"
            value="modify"
            className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500"
          >
            Modify
          </button>

          <button
            type="button"
            className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
            onClick={() => moveToList()}
          >
            List
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModifyComponent;
