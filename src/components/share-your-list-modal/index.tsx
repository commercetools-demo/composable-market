import {
  InfoDialog,
  useModalState,
} from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

const ShareYourListModal = () => {
  const infoModalState = useModalState();

  return (
    <InfoDialog
      title="About channels"
      isOpen={infoModalState.isModalOpen}
      onClose={infoModalState.closeModal}
    >
      <Spacings.Stack scale="m">
        <Text.Body>{'Channels are ...'}</Text.Body>
      </Spacings.Stack>
    </InfoDialog>
  );
};

export default ShareYourListModal;
