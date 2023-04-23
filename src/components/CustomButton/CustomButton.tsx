import { Button, Box } from "@chakra-ui/react"
import { CustomButtonProps } from "./"

const CustomButton: React.FC<CustomButtonProps> = ({
    isDisabled,
    children,
    onClick,
    ...rest
}) => {
    return (
        <Box
            borderRadius={3}
            as={Button}
            onClick={!isDisabled ? onClick : undefined}
            isDisabled={isDisabled}
            _disabled={{
                opacity: isDisabled ? 0.4 : 1,
                cursor: "default",
            }}
            colorScheme="yellow"
            {...rest}
        >
            {children}
        </Box>
    )
}

export default CustomButton
