// import { useRouter } from "next/router";
// import { useStateContext } from "../../contexts/AuthContext";
import { useStepperContext } from "../../contexts/StepperContext";

export default function AddPhoneNumber({ handleClick }) {
  // const { connectWallet, address } = useStateContext();
  const { userData, setUserData } = useStepperContext();
  // const router = useRouter();

  // const handleWallet = async () => {
  //   await connectWallet();
  //   router.push("/game");
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="w-[70%] mx-auto mt-0">
      <h1 className="text-center font-medium text-5xl">
        Add Your Phone Number
      </h1>
      <p className="w-[60%] text-center mx-auto mt-4 text-2xl">
        This is required to get your airtime rewards. Your rewards are stored
        directly in your wallet as tokens, making them secure and accessible
        anytime, they can then be converted to airtime anytime.
      </p>
      <div className="mt-8">
        <div className="my-2 flex rounded border-2 border-black">
          <input
            name="phonenumber"
            placeholder="Phone Number"
            onChange={handleChange}
            value={userData["phonenumber"] || ""}
            className="w-full p-1 px-2 form-input 
            block leading-none focus:outline-none placeholder-black/50 
            [ transition-colors duration-200 ] 
            [ py-3 md:py-4 md:pr-4 lg:py-4] 
            [ bg-white/20 focus:bg-b/25 ] 
            [ text-[#333] focus:text-white text-xl ]"
          />
        </div>
        <button
          onClick={handleClick}
          className="block w-1/2 bg-black text-white text-2xl font-semibold py-3 rounded-lg mx-auto"
        >
          Add Phone Number
        </button>
        {/* <div className="mt-5 text-center">
          <span className="text-center">
            Don’t have a wallet?{" "}
            <a href="" className="text-white">
              Create one
            </a>{" "}
          </span>
        </div> */}
      </div>
    </div>
  );
}
