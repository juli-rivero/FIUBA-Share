import { useOutletContext } from "react-router-dom";
import { ItemBreadCrumb } from "../data/interfaces";
import { Dispatch, SetStateAction } from "react";

function useSetBreadcrumb( ): Dispatch<SetStateAction<ItemBreadCrumb[]>> {
  const { setBreadcrumb }: { setBreadcrumb: Dispatch<SetStateAction<ItemBreadCrumb[]>> } = useOutletContext();

  return setBreadcrumb;
}

export default useSetBreadcrumb;
