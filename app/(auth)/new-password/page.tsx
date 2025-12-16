import { Logo } from "@/components/Logo";
import { NewPasswordForm } from "../_components/NewPasswordForm";

type SearchParams = Promise<{
  otp: string;
  email: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { email, otp } = await searchParams;
  return (
    <div className="py-32">
      <div className="container">
        <div className="md:hidden flex items-center justify-center mb-3">
          <Logo color="black" />
        </div>
        <NewPasswordForm otp={otp} email={email} />
      </div>
    </div>
  );
};

export default page;
