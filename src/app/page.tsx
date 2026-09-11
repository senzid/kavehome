import Header from "@/components/layout/header/Header";
import Hero from "@/modules/home/Hero";

export default function Home() {
  return (
    <div className="flex h-dvh flex-col">
      <Header />
      <Hero />
    </div>
  );
}
