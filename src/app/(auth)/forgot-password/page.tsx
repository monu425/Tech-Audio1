import ForgotPassword from "@/components/client/auth/ForgotPassword";
import Container from "@/components/commonFile/Container";


const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">
      <Container>
        <ForgotPassword />
      </Container>
    </div>
  );
};

export default page;
