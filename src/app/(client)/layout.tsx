import Footer from "@/components/commonFile/footer/Footer";
import Header from "@/components/commonFile/header/Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
