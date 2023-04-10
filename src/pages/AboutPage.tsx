import { motion, useIsPresent } from "framer-motion";

const AboutPage = () => {
  const isPresent = useIsPresent();
  return (
    
    <div>
      <h1>About Page</h1>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    </div>
    
  );
};

export default AboutPage;