import { createFileRoute } from "@tanstack/react-router";
import { ChooseScreen } from "@/components/game/ChooseScreen";
import { PlayScreen } from "@/components/game/PlayScreen";
import { StartScreen } from "@/components/game/StartScreen";
import { useGame } from "@/lib/pet/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const screen = useGame((s) => s.screen);
  if (screen === "choose") return <ChooseScreen />;
  if (screen === "play") return <PlayScreen />;
  return <StartScreen />;
}
