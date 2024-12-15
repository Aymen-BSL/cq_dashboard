import Agent from "./Agent";
import Logo from "./Logo";
import MainNav from "./Mainnav";

export default function Sidebar() {
  return (
    <aside className="min-w-[20vw] max-h-[100vh] bg-grey-100 p-8 border-r border-grey-100 flex flex-col justify-between">
      <div className="flex flex-col gap-24">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <MainNav />
      </div>
    </aside>
  );
}
