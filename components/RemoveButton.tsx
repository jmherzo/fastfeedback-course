import React, { RefObject } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  IconButton,
  Tooltip
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { deleteFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { mutate } from 'swr';
import { Feedback } from '@/lib/interfaces/Feedback';
import { FeedbackWithId } from '@/lib/db-admin';

type RemoveButtonProps = {
  feedbackId: string;
};

export function RemoveButton({ feedbackId }: RemoveButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const { user } = useAuth();
  const onDeleteFeedback = () => {
    deleteFeedback(feedbackId);
    mutate(
      user?.token ? ['/api/feedback', user.token] : null,
      (feedback: FeedbackWithId[]) =>
        feedback.filter((feedback) => feedback.id !== feedbackId),
      false
    );
    onClose();
  };
  const cancelRef = React.useRef() as RefObject<any>;

  return (
    <>
      <Tooltip label="remove">
        <IconButton
          onClick={() => setIsOpen(true)}
          variant="ghost"
          aria-label="Delete"
          icon={<DeleteIcon />}
        />
      </Tooltip>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              {"Are you sure? You can't undo this action."}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteFeedback} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
