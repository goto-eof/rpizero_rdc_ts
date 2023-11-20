import * as React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  theme,
  Icon,
  useToast,
} from '@chakra-ui/react';

import { FaLightbulb } from 'react-icons/fa';
import LedService from './service/LedService';

export const App = () => {
  const [status, setStatus] = React.useState<boolean>();
  React.useEffect(() => {
    updateLedStatus();
  }, []);

  const updateLedStatus = async () => {
    const response = await LedService.getLedStatus();
    if (response === null) {
      toast({ description: 'Error contacting server' });
      return;
    }
    setStatus(response.status);
  };
  const toast = useToast();
  const changeStatus = async () => {
    const response = await LedService.powerOnOffLed(!status);
    if (response === null) {
      toast({ description: 'Error contacting server' });
      return;
    }
    setStatus(response.status);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box height={'100vh'}>
        <VStack verticalAlign={'center'}>
          <Icon
            onClick={changeStatus}
            as={FaLightbulb}
            color={status ? 'red' : 'gray'}
            width={'100px'}
            height={'100px'}
          />
        </VStack>
      </Box>
    </ChakraProvider>
  );
};
