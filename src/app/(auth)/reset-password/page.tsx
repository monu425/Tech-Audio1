import ResetPasswordPage from "@/components/client/auth/ResetPassword";
import Container from "@/components/commonFile/Container";


const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">
      <Container>
        <ResetPasswordPage />
      </Container>
    </div>
  );
};

export default page;
