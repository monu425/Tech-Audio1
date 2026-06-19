
import Register from "@/components/client/auth/Register";
import Container from "@/components/commonFile/Container";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">
      <Container>
        <Register />
      </Container>
    </div>
  );
};

export default page;
