import React, { ReactNode } from 'react';
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
import { mutate } from 'swr';
import { Site } from '@/lib/interfaces/Site';
import { SiteWithId } from '@/lib/db-admin';

type AddSiteModalProps = {
  children: ReactNode;
};

type CreateSite = {
  name: string;
  url: string;
};

export function AddSiteModal({ children }: AddSiteModalProps) {
  // TODO: make it work with refs
  // const initialRef = useRef();
  // const finalRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, reset } = useForm();
  const toast = useToast();
  const { user } = useAuth();

  const onCreateSite = async ({ name, url }: CreateSite) => {
    try {
      if (user) {
        const newSite: Site = {
          authorId: user.uid,
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
        mutate(
          user?.token ? ['/api/sites', user.token] : null,
          (sites: SiteWithId[]) => [...sites, newSite],
          false
        );
        reset();
      } else {
        throw new Error('User does not exist');
      }
    } catch (e) {
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
