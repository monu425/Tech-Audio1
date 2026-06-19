import SuccessfullySendMail from "@/components/client/auth/SuccessfullySendMail"
import Container from "@/components/commonFile/Container"


const page = () => {
  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">
      <Container>
        <SuccessfullySendMail />
      </Container>
    </div>
  )
}

export default page