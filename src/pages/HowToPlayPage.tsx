import { useIsPresent, motion } from "framer-motion"

const HowToPlayPage = () => {
    const isPresent = useIsPresent()
    return (
        <div>
            <h1>How to Play</h1>
            <p>Here are the rules of the game</p>
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{
                    scaleX: 0,
                    transition: { duration: 0.5, ease: "circOut" },
                }}
                exit={{
                    scaleX: 1,
                    transition: { duration: 0.5, ease: "circIn" },
                }}
                style={{ originX: isPresent ? 0 : 1 }}
                className="privacy-screen"
            />
        </div>
    )
}

export default HowToPlayPage
