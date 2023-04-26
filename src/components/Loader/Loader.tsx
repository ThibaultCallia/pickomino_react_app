import { Box, Image } from "@chakra-ui/react"
import "./loader.css"

const Loader = () => {
    // RENDER
    return (
        <>
            <Box
                className="sprite-animation"
                h={"100px"}
                w={"100px"}
                
                m={3}
                backgroundImage={"url(./pp_loader.png)"}
                backgroundSize={"auto 100%"}
            ></Box>
        </>
    )
}

export default Loader
