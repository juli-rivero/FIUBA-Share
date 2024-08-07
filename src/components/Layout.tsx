import Header from "./Header";
import { Stack } from "@mui/joy";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ItemBreadCrumb } from "../data/interfaces";

function Layout() {
    const [breadcrumb, setBreadcrumb] = useState<ItemBreadCrumb[]>([])
  return (
    <Stack sx={{ height: "100%" }} gridTemplateRows="auto 2fr">
      <Header breadcrumb={breadcrumb} />
      <Outlet context={{setBreadcrumb}} />
    </Stack>
  );
}

export default Layout;