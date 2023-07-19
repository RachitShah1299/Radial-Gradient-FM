import { MouseEvent, useEffect, useMemo, useState } from "react";
import { FEATURES } from "./utils/constants";
import { Check } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useAnimation,
} from "framer-motion";

function RgbVersion() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [colorIndex, setColorIndex] = useState(0);
  const colors = useMemo(
    () => [
      "rgb(0 120 255 / 0.20)",
      "rgb(255 0 0 / 0.20)",
      "rgb(120 54 62 / 0.20)",
      "rgb(85 210 128 / 0.20)",
    ],
    []
  );
  const controls = useAnimation();

  function handleMouseMove({ clientX, clientY, currentTarget }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
      controls.start({
        backgroundColor: colors[colorIndex],
      });
    }, 200);

    return () => clearInterval(interval);
  }, [colorIndex, colors, controls]);

  return (
    <>
      <div className="flex w-full h-full justify-center items-center bg-black">
        <div
          onMouseMove={handleMouseMove}
          className="flex group relative overflow-hidden justify-start h-[600px] w-[450px] p-8 bg-transparent border-2 border-white rounded-3xl"
          style={{ boxShadow: "0 0 40px -2px rgba(168, 85, 247, 0.6)" }}
        >
          <motion.div
            className="pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300 absolute inset-0 bg-white"
            animate={controls}
            style={{
              background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${colors[colorIndex]}, transparent 80%)`,
            }}
          />

          <div className="flex flex-col items-start text-white">
            <span className="text-white text-lg font-semibold">
              Lifetime Membership
            </span>
            <span className="pt-2 text-white font-semibold line-through text-3xl">
              $150
            </span>
            <div className="flex items-center gap-2 pt-2">
              <span className="pt-2 text-white text-5xl font-semibold">
                $50
              </span>
              <div className="flex flex-col">
                <span className="text-white">early bird discount</span>
                <span className="text-purple-300">one-time payment</span>
              </div>
            </div>
            <span className="text-left py-4">
              Lifetime access to all current and future premium Build UI
              coursers, forever.
            </span>
            {FEATURES.map((f) => {
              return (
                <div
                  key={f}
                  className="flex gap-4 mt-4 items-center justify-start"
                >
                  <Check size={16} />
                  <span>{f}</span>
                </div>
              );
            })}

            <button className="w-full mt-10 px-3 py-2 text-2xl font-semibold rounded-xl uppercase hover:bg-purple-900 hover:border-purple-900 hover:text-white bg-white text-purple-900">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RgbVersion;
