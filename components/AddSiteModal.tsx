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
  useToast,
  ButtonGroup
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { mutate } from 'swr';
import { Site } from '@/lib/interfaces/Site';
import { SiteWithId } from '@/lib/db-admin';
import { useIsMobile } from '@/utils/useIsMobile';

type AddSiteModalProps = {
  children: ReactNode;
};

type CreateSite = {
  name: string;
  url: string;
};

const formNames = {
  name: 'name',
  url: 'url'
};

export function AddSiteModal({ children }: AddSiteModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, reset } = useForm();
  const toast = useToast();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const onCreateSite = async ({ name, url }: CreateSite) => {
    try {
      if (user) {
        const newSite: Site = {
          authorId: user.uid,
          createdAt: new Date().toISOString(),
          name,
          url
        };
        const { id } = await createSite(newSite);
        onClose();
        toast({
          title: 'Site added successfully.',
          description: "We've added your site.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });
        mutate(user?.token ? ['/api/sites', user.token] : null, {
          optimisticData: (sites: SiteWithId[]) => [
            { ...newSite, id },
            ...sites
          ],
          rollbackOnError: true
        });
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

      <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? 'full' : 'md'}>
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
                {...register(formNames.name)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                isRequired
                placeholder="https://mycoolsite.com"
                {...register(formNames.url)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup
              flexDirection={isMobile ? 'column' : 'row'}
              width={isMobile ? '100%' : 'inherit'}
              spacing={isMobile ? 0 : 2}
            >
              <Button onClick={onClose} mb={4}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="teal" mb={4}>
                Save
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
