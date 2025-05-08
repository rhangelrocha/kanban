
import { KanbanProvider } from "@/contexts/KanbanContext";
import Header from "./_components/header/Header";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
};

const ProtectedLayout = ({ children, modal }: ProtectedLayoutProps) => {
  return (
    <>
      <KanbanProvider>
        <Header />
        <div>
          {children}
        </div>
        {modal}
      </KanbanProvider>
    </>
  );
}

export default ProtectedLayout;