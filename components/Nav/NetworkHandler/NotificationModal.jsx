/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { mdiDiscord, mdiReddit, mdiSend, mdiTwitter } from '@mdi/js'

import ButtonEl from 'components/Button'
import Icon from '@mdi/react'
import Link from '@/components/Nav/Link'
import Modal from 'components/Modal'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import styled from '@emotion/styled'
import { useCallback } from 'react'
// export const Button = styled.Button`
//   width: 100%;
//   background: white;
//   color: black;
//   padding: 9% 3%;
//   border-radius: 3px;
// `

const ModalContainer = styled.div`
  transform: translate(-50%, -50%);
  @media (max-width: 992px) {
    width: 90%;
    transform: translate(-50%, -65%);
    overflow-y: auto;
    max-height: 100%;
  }
`

export const ModalBody = styled.div``

export const ModalFooter = styled.div``

export const ModalTitle = styled.p``

export const ModalSubtitle = styled.p``

export const ModalMain = styled.p``

export const ModalClosingMessage = styled.p``

export const ModalExternalLink = styled.p``

export const ModalContentFooter = styled.div``

export const IconWrapper = styled.div``

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

const NetworkNotificationModal = ({ isModalActive, closeModal, content }) => {

  const renderSocialIcons = useCallback(() => {
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
  }, [])
  return (
    <Modal data-testid="notification-modal-wrapper" isVisible={isModalActive}>
      <ModalContainer
        className="absolute top-2/4 left-2/4 text-white bg-gray-600 rounded-lg xs:p-4 md:p-8"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <ModalBody className="flex flex-col justify-between">
          <Typography className="xs:mb-4 md:mb-6 xs:text-lg md:text-2xl font-bold">
            {content.title}
          </Typography>
          {/* <ModalTitle className="xs:mb-4 md:mb-6 xs:text-lg md:text-2xl font-bold">
            
          </ModalTitle> */}
          <Typography className="xs:mb-4 md:mb-6 italic font-medium text-lg">
            {content.subTitle}
          </Typography>
          {/* <ModalSubtitle className="xs:mb-4 md:mb-6 italic font-medium text-lg">
            {content.subTitle}
          </ModalSubtitle> */}
          <Typography className="xs:mb-4 md:mb-6 text-sm">{content.paragraphone}</Typography>
          {/* <ModalMain className="xs:mb-4 md:mb-6 text-sm">{content.paragraphone}</ModalMain> */}
          <Typography className="xs:mb-4 md:mb-6 text-sm">{content.paragraphTwo}</Typography>
          {/* <ModalClosingMessage className="xs:mb-4 md:mb-6 text-sm">
            {content.paragraphTwo}
          </ModalClosingMessage> */}
          <ModalContentFooter className="md:w-1/2">
            <hr />
            <Link underline="none" href={content.linkAddressOne}>
              <Typography className="text-white xs:text-lg md:text-2xl xs:my-2 md:my-3 italic font-medium">
                {content.linkTextOne}
              </Typography>
            </Link>
            <hr />
            <Link underline="none" href={content.linkAddressTwo}>
              <Typography className="text-white xs:text-lg md:text-2xl xs:my-2 md:my-3 italic font-medium">
                {content.linkTextTwo}
              </Typography>
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
            <ButtonEl sx={{ width: '10rem' }} variant="tertiary" data-testid="modal-accept">
              {content.button}
            </ButtonEl>
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
