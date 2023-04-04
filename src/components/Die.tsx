import { Box, Image } from "@chakra-ui/react"

interface DieProps {
    die: string;
    onClick?: (value:string) => void;
    selected: boolean;
};

function Die({die, onClick, selected}: DieProps) {

    const handleClick = () => {
        if (onClick) {
          onClick(die);
        }
      };
  

    return (
        <Box 
            onClick={handleClick} 
            borderWidth={selected ? "2px" : "1px"} 
            borderColor={selected ? "red" : "black"} 
            borderRadius="lg" 
            overflow="hidden" 
            width="40px" 
            height="40px"
            >
                <Image 
                    objectFit='cover' 
                    src={`/diceFaces/die${die}.svg`}
                />
        </Box>
    )
  }
  
  export default Die
  
