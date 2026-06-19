import { toast } from "sonner";


const errorPageHandler = (error: any) => {
    if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
  
}

export default errorPageHandler