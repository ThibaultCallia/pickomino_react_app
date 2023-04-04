import { Box, Image } from "@chakra-ui/react"

interface DieProps {
    die: string;
    onClick?: () => void;
};

function Die({die}: DieProps) {
  

    return (
        <Box borderWidth="1px" borderColor="black" borderRadius="lg" overflow="hidden" width="40px" height="40px">
            <Image 
                objectFit='cover' 
                src={`/diceFaces/die${die}.svg`}
            />
       </Box>
    )
  }
  
  export default Die
  
