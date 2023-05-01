import { Box, Flex, Text, Link, useColorMode } from "@chakra-ui/react"

const Footer = (): JSX.Element => {
    const { colorMode } = useColorMode()

    // RENDER
    return (
        <Box
            as="footer"
            bg={colorMode === "dark" ? "gray.800" : "gray.100"}
            boxShadow="md"
            px={4}
            py={2}
            fontSize={"sm"}
        >
            <Flex alignItems="center" justifyContent="space-between">
                <Text noOfLines={1}>
                    <Link
                        href="https://www.999games.nl/regenwormen.html"
                        mx={2}
                    >
                        Based on "Regenwormen" by 999 Games
                    </Link>
                </Text>
                <Box>
                    <Link
                        href="https://github.com/ThibaultCallia/pickomino_react_app"
                        mx={2}
                        isExternal
                    >
                        GitHub
                    </Link>
                </Box>
            </Flex>
        </Box>
    )
}

export default Footer
