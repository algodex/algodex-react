import { mdiDiscord, mdiReddit, mdiSend, mdiTwitter } from '@mdi/js'

import Icon from '@mdi/react'
import Link from 'next/link'
import Modal from '@/components/Modal'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

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

const NetworkNotificationModal = ({ isModalActive, closeModal, content }) => {
  const socialData = [
    {
      title: 'Telegram',
      url: 'https://t.me/algodex',
      path: mdiSend
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com/AlgodexOfficial',
      path: mdiTwitter
    },
    {
      title: 'Reddit',
      url: 'https://www.reddit.com/r/Algodex/',
      path: mdiReddit
    },
    {
      title: 'Discord',
      url: 'https://discord.com/invite/ngNzV8bBhy',
      path: mdiDiscord
    }
  ]
  const renderSocialIcons = () => {
    return socialData.map((data, idx) => {
      return (
        <Link key={idx} href={data.url}>
          <a>
            <Icon
              rotate={data.title === 'Telegram' ? 330 : 0}
              path={data.path}
              title={data.title}
              size={0.8}
              className="mr-2 cursor-pointer"
              color="#FFFFFF"
            />
          </a>
        </Link>
      )
    })
  }
  return (
    <Modal data-testid="notification-modal-wrapper" isVisible={isModalActive}>
      <ModalContainer
        className="absolute top-2/4 left-2/4 text-white bg-gray-600 rounded-lg xs:p-4 md:p-8"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
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
            <Link href={content.linkAddressOne}>
              <a>
                <ModalExternalLink className="xs:text-lg md:text-2xl xs:my-2 md:my-3 italic font-medium">
                  {content.linkTextOne}
                </ModalExternalLink>
              </a>
            </Link>
            <hr />
            <Link href={content.linkAddressTwo}>
              <a>
                <ModalExternalLink className="xs:text-lg md:text-2xl xs:my-2 md:my-3 italic font-medium">
                  {content.linkTextTwo}
                </ModalExternalLink>
              </a>
            </Link>
            <hr />
            <div className="flex my-2 mx-2">
              <IconWrapper className="flex items-center">{renderSocialIcons()}</IconWrapper>
            </div>
          </ModalContentFooter>
        </ModalBody>
        <ModalFooter className="flex justify-center w-full">
          <div
            role="button"
            tabIndex={0}
            className="w-40"
            onClick={closeModal}
            onKeyDown={closeModal}
          >
            <Button className="font-bold">{content.button}</Button>
          </div>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  )
}

NetworkNotificationModal.propTypes = {
  isModalActive: PropTypes.bool,
  closeModal: PropTypes.func,
  content: PropTypes.object
}
export default NetworkNotificationModal
