import { mdiDiscord, mdiReddit, mdiSend, mdiTwitter } from '@mdi/js'

import Icon from '@mdi/react'
import Modal from 'components/Modal'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Button = styled.button`
  width: 100%;
  background: white;
  color: black;
  padding: 9% 3%;
  border-radius: 3px;
`

export const ModalContainer = styled.div``

export const ModalBody = styled.div``

export const ModalFooter = styled.div``

export const ModalTitle = styled.p``

export const ModalSubtitle = styled.p``

export const ModalMain = styled.p``

export const ModalClosingMessage = styled.p``

export const ModalExternalLink = styled.p``

export const ModalContentFooter = styled.div``

export const IconWrapper = styled.div``

const NetworkNotificationModal = ({ modalNotification, setDataForSwitchingNetwork, content }) => {
  console.log(modalNotification, 'modal')
  return (
    <Modal isVisible={modalNotification}>
      <ModalContainer className="flex flex-col justify-between text-white xs:h-5/6 xs:w-5/6 md:h-3/5 md:w-2/5 max-w-screen-lg bg-gray-600 rounded-lg xs:p-4 md:p-8">
        <ModalBody className="flex flex-col justify-between">
          <ModalTitle className="xs:mb-4 md:mb-6 xs:text-lg md:text-2xl font-bold">
            {content.title}
          </ModalTitle>
          <ModalSubtitle className="xs:mb-4 md:mb-6 italic font-medium text-lg">
            {content.subTitle}
          </ModalSubtitle>
          <ModalMain className="xs:mb-4 md:mb-6 text-sm">{content.paragraphone}</ModalMain>
          <ModalClosingMessage className="xs:mb-4 md:mb-6 text-sm">
            {content.paragraphTwo}
          </ModalClosingMessage>
          <ModalContentFooter className="md:w-1/2">
            <hr />
            <ModalExternalLink className="xs:text-lg md:text-2xl xs:my-2 md:my-3 italic font-medium">
              {content.externalLinkOne}
            </ModalExternalLink>
            <hr />
            <ModalExternalLink className="xs:text-lg text-2xl my-3 italic font-medium">
              {content.externalLinkTwo}
            </ModalExternalLink>
            <hr />
            <div className="flex my-2 mx-2">
              <IconWrapper className="flex items-center">
                <Icon
                  onClick={() => setDataForSwitchingNetwork({ ribbonNotification: false })}
                  path={mdiSend}
                  title="Telegram link"
                  rotate={330}
                  size={0.8}
                  className="mr-2 cursor-pointer"
                  color="#FFFFFF"
                />
                <Icon
                  onClick={() => setDataForSwitchingNetwork({ ribbonNotification: false })}
                  path={mdiTwitter}
                  title="Twitter link"
                  size={0.8}
                  className="mr-2 cursor-pointer"
                  color="#FFFFFF"
                />
                <Icon
                  onClick={() => setDataForSwitchingNetwork({ ribbonNotification: false })}
                  path={mdiReddit}
                  title="Reddit link"
                  size={0.8}
                  className="mr-2 cursor-pointer"
                  color="#FFFFFF"
                />
                <Icon
                  onClick={() => setDataForSwitchingNetwork({ ribbonNotification: false })}
                  path={mdiDiscord}
                  title="Discord link"
                  size={0.8}
                  className="mr-2 cursor-pointer"
                  color="#FFFFFF"
                />
              </IconWrapper>
            </div>
          </ModalContentFooter>
        </ModalBody>
        <ModalFooter
          onClick={() => setDataForSwitchingNetwork({ modalNotification: false })}
          className="flex justify-center w-full"
        >
          <div style={{ width: '10rem' }}>
            <Button className="font-bold">{content.button}</Button>
          </div>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  )
}

NetworkNotificationModal.propTypes = {
  modalNotification: PropTypes.bool,
  setDataForSwitchingNetwork: PropTypes.func,
  content: PropTypes.object
}
export default NetworkNotificationModal
