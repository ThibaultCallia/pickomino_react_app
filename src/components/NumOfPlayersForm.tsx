// Import necessary components and hooks
import React, { FormEvent } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex
} from '@chakra-ui/react';

const NumOfPlayersForm: React.FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted');
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        {/* Alternatively work with mr on input field? */}
        <Flex gap="10px">
        <FormControl id="numOfPlayersForm" mt={4}>
          {/* <FormLabel>How many players? </FormLabel> */}
          <Input type="text" placeholder="How many players?" />
        </FormControl>
        <Button mt={4} colorScheme="yellow" type="submit">
          Play
        </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default NumOfPlayersForm;
