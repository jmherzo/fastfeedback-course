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

export function AddSiteModal() {
  // const initialRef = useRef();
  // const finalRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();
  const toast = useToast();
  const auth = useAuth();

  const onSubmit = async ({ website, link }) => {
    try {
      await createSite({
        authorID: auth.user.uid,
        createdAt: new Date().toISOString(),
        website,
        link
      });
      toast({
        title: 'Site added successfully.',
        description: "We've added your site.",
        status: 'success',
        duration: 9000,
        isClosable: true
      });
      onClose();
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
      <Button onClick={onOpen} fontWeight="medium" size="md" mt={4}>
        Add your first site
      </Button>

      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="My site"
                {...register('website', {
                  required: 'Required'
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://mycoolsite.com"
                {...register('link', {
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
