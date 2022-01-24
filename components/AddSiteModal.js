import React, { useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils/fetcher';

export function AddSiteModal({ children }) {
  // TODO: make it work with refs
  // const initialRef = useRef();
  // const finalRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, reset } = useForm();
  const toast = useToast();
  const auth = useAuth();
  // This gets called everytime a user clicks on the modal
  const { data } = useSWR('/api/sites', fetcher);

  const onCreateSite = async ({ name, url }) => {
    try {
      const newSite = {
        authorID: auth.user.uid,
        createdAt: new Date().toISOString(),
        name,
        url
      };
      await createSite(newSite);
      onClose();
      toast({
        title: 'Site added successfully.',
        description: "We've added your site.",
        status: 'success',
        duration: 9000,
        isClosable: true
      });
      mutate('/api/sites', { sites: [...data.sites, newSite] }, false);

      reset();
    } catch (e) {
      // TODO: Send error to logger
      console.log(e);
      toast({
        title: 'Site not added',
        description: 'There was a problem adding your site.',
        status: 'error',
        duration: 12000,
        isClosable: true
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        size="md"
        _hover={{ bg: 'gray.700' }}
      >
        {children}
      </Button>

      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                isRequired
                placeholder="My site"
                {...register('name', {
                  required: 'Required'
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                isRequired
                placeholder="https://mycoolsite.com"
                {...register('url', {
                  required: 'Required'
                })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="teal">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
