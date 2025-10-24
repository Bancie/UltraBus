import type { Route } from "./+types/home";
import { Nut, TemporaryDrawer } from "~/components/FrontEnd";
import { MiniDrawer } from "~/components/Drawer";
import { Container, Stack } from "@mui/material";
import GoogleMapCard from "~/components/GoogleMap";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LearningDB" },
    { name: "description", content: "Welcome to LearningDB!" },
  ];
}

export default function Home() {
  return (
    <MiniDrawer />
  );
}
