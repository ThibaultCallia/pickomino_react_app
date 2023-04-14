// Import necessary components and hooks
import React, { FormEvent, useState, ChangeEvent } from "react"
import { Box, FormControl, Button, Select, Flex } from "@chakra-ui/react"
import { NumOfPlayersFormProps } from "./NumOfPlayersForm.types"

const NumOfPlayersForm = ({ setNumOfPlayers }: NumOfPlayersFormProps) => {
    // USE STATES
    const [num, setNum] = useState<string | undefined>(undefined)

    // FUNCTIONS
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (num) {
            setNumOfPlayers(parseInt(num))
        }
    }

    // RENDER
    return (
        <Box>
            <form onSubmit={handleSubmit}>
                {/* Alternatively work with mr on input field? */}
                <Flex gap="10px">
                    <FormControl isRequired id="numOfPlayersForm" mt={4}>
                        {/* <FormLabel>How many players? </FormLabel> */}
                        <Select
                            placeholder="How many players?"
                            value={num}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setNum(e.target.value)
                            }}
                        >
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                        </Select>
                    </FormControl>
                    <Button mt={4} colorScheme="yellow" type="submit">
                        Play
                    </Button>
                </Flex>
            </form>
        </Box>
    )
}

export default NumOfPlayersForm
