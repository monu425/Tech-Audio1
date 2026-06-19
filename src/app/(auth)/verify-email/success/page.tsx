import VerifySuccessPage from "@/components/client/auth/VerifySuccess";
import Container from "@/components/commonFile/Container";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">
      <Container>
        <VerifySuccessPage />
      </Container>
    </div>
  );
};

export default page;
