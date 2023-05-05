import { Container, Flex, Heading, Text } from '@chakra-ui/react'
import { motion, useIsPresent } from 'framer-motion'

import { NavBar } from '../components'

const AboutPage = () => {
  const isPresent = useIsPresent()
  return (
        <>
            <NavBar game={false} />
            <Container
                mt={3}
                maxW={'900px'}
                p={8}
                height="calc(100vh - 56px - 40px)"
            >
                <Flex direction={'column'} gap={5}>
                    <Heading>About me and the project</Heading>
                    <Text>
                        Hello, welcome to Planetary Pirates. My name is Thibault
                        Calliauw and I am the creator of this web app.
                    </Text>
                    <Heading size={'md'}>Rights</Heading>
                    <Text>
                        It’s important to note that I did not create the game
                        nor do I own any rights. This game is based on
                        “Regenwormen” by 999 Games. This is merely a student
                        project and not to be used for any commercial ends.
                    </Text>
                    <Heading size={'md'}>About me and the project</Heading>
                    <Text>
                        In September 2022, I quit my job and started a Full
                        Stack Development course. This is my first full stack
                        project. The libraries used in this project are:
                        <br />
                        <strong>Frontend:</strong> React, Redux, ChakraUI,
                        Typescript and Socket client
                        <br />
                        <strong>Backend:</strong> NodeJS, Express and Socket.io
                    </Text>
                </Flex>
            </Container>
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{
                  scaleX: 0,
                  transition: { duration: 0.5, ease: 'circOut' }
                }}
                exit={{
                  scaleX: 1,
                  transition: { duration: 0.5, ease: 'circIn' }
                }}
                style={{ originX: isPresent ? 0 : 1 }}
                className="privacy-screen"
            />
        </>
  )
}

export default AboutPage
