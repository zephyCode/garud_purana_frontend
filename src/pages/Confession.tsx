import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/fonts.css";
import "./Confession.css";
import FloatingBubble from "../components/FloatingBubble";
import Loader from "../components/Loader";

const Confession = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    confession: { value: "", isValid: false },
  });
  const [showLoader, setShowLoader] = useState(false);

  const REQUEST_URL = (import.meta.env.VITE_REQUEST_URL as string) || "";

  const links: { name: string; nav: string }[] = [
    { name: "🏠 Home", nav: "/" },
    { name: "🔥 Forum", nav: "/forum" },
  ];

  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue({
      confession: {
        value: e.target.value,
        isValid: e.target.value.trim().length > 10,
      },
    });
  };

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    setShowLoader(true);
    event?.preventDefault();
    if (!formValue.confession.isValid) {
      setShowLoader(false);
      return;
    }
    try {
      const postUrl = REQUEST_URL;
      const response = await axios.post(postUrl, {
        text: formValue.confession.value,
      });
      if (response.status === 200) {
        navigate("/result", { state: { result: response.data } });
      } else {
        setShowLoader(false);
      }
    } catch (err) {
      console.error("Something went wrong", err);
      setShowLoader(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-black overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/hell_skull_image.jpg')" }}
      ></div>

      {/*This section is for annonymous name entry*/}
      {/* <Modal 
        open={showModal} 
        disableEscapeKeyDown
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: '#000000',
            opacity: '1 !important',
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#0a0000',
            border: '2px solid #8B0000',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
            width: '90%',
            maxWidth: 400,
            textAlign: 'center',
          }}
        >
          <h2
            className="text-red-600 text-3xl mb-4 animate-glow"
            style={{ fontFamily: 'ZombieFont' }}
          >
            Enter Anonymously
          </h2>
          <form onSubmit={handleAnonymousSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Your anonymous name..."
              value={anonymousName}
              onChange={(e) => setAnonymousName(e.target.value)}
              InputProps={{
                style: {
                  color: 'white',
                  fontFamily: 'Bloody',
                  backgroundColor: '#111',
                  borderColor: '#8B0000',
                },
              }}
              InputLabelProps={{
                style: { color: '#ccc' },
              }}
              sx={{
                input: { borderColor: 'red' },
                '& fieldset': {
                  borderColor: '#8B0000',
                },
              }}
            />
            <button
              type="submit"
              className="mt-4 w-full py-2 bg-gradient-to-r from-red-700 to-red-900 text-white font-bold rounded animate-pulse"
              style={{ fontFamily: 'ZombieFont' }}
            >
              Enter NARAKA
            </button>
          </form>
        </Box>
      </Modal> */}

      <div className="absolute inset-0 z-10 bg-black/80 mix-blend-multiply animate-flicker"></div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 py-8">
        <h1
          className="text-black text-5xl sm:text-6xl font-extrabold mb-4 animate-typewriter overflow-hidden whitespace-nowrap drop-shadow-glow tracking-wider h-[6rem] flex items-center justify-center"
          style={{ fontFamily: "ZombieFont" }}
        >
          Welcome to NARAKA
        </h1>

        <p
          className="text-red-500 font-bold text-xl sm:text-2xl mb-8 animate-pulse"
          style={{ fontFamily: "Bloody" }}
        >
          Get ready to face the consequences of your sins in your afterlife...
        </p>

        <form
          onSubmit={formSubmitHandler}
          className="w-full max-w-xl bg-black/60 backdrop-blur-md border border-red-700 p-6 rounded-xl shadow-lg space-y-6 animate-fade-in-up"
        >
          <label
            htmlFor="message"
            className="block text-white text-2xl tracking-wider"
            style={{ fontFamily: "ZombieFont" }}
          >
            Your Confession
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Speak now, sinner..."
            value={formValue.confession.value}
            onChange={inputChangeHandler}
            className="w-full bg-black/80 border border-red-500 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-400"
            style={{ fontFamily: "Bloody" }}
          />

          {showLoader ? <Loader/> : (
            <button
              type="submit"
              disabled={!formValue.confession.isValid}
              className={`w-full py-3 font-bold uppercase text-xl rounded-lg transition-all ${
                formValue.confession.isValid
                  ? "bg-gradient-to-r from-red-600 to-red-900 hover:scale-105"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
              style={{ fontFamily: "ZombieFont" }}
            >
              Submit Confession
            </button>
          )}
        </form>
        

        <p
          className="text-gray-300 italic mt-6 animate-fade-in"
          style={{ fontFamily: "Bloody" }}
        >
          "Your confessions will be judged in the afterlife..."
        </p>
      </div>
      <FloatingBubble links={links} />
    </div>
  );
};

export default Confession;
