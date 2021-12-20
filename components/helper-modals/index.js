import Modal from 'components/Modal'
import { mdiTwitter, mdiReddit, mdiDiscord, mdiSend } from '@mdi/js'
import Icon from '@mdi/react'
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

const TestnetModal = ({ modalNotification, setDataForSwitchingNetwork }) => {
  return (
    <Modal visibility={modalNotification}>
      <ModalContainer className="flex flex-col justify-between text-white h-3/5 w-2/5 md:w-2/5 max-w-screen-lg bg-gray-600 rounded-lg p-8">
        <ModalBody className="flex flex-col justify-between">
          <ModalTitle className="mb-6 text-2xl font-bold">Welcome to Algodex Testnet!</ModalTitle>
          <ModalSubtitle className="mb-6 italic font-medium text-lg">
            Test new features risk free!
          </ModalSubtitle>
          <ModalMain className="mb-6 text-sm">
            You are trading on the Testnet version of Algodex used to test our new features and find
            bugs. All trades on Testnet use testnet algos and assets with no real value. You are
            able to get Algos to test with from the Faucet link below.
          </ModalMain>
          <ModalClosingMessage className="mb-6 text-sm">
            Please send feedback about any bugs or feature requests!
          </ModalClosingMessage>
          <ModalContentFooter className="w-1/2">
            <hr />
            <ModalExternalLink className="text-2xl my-3 italic font-medium">
              Faucet
            </ModalExternalLink>
            <hr />
            <ModalExternalLink className="text-2xl my-3 italic font-medium">
              Documentation
            </ModalExternalLink>
            <hr />
            <div className="flex my-2 mx-2 w-1/4">
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
        <ModalFooter className="flex justify-center w-full">
          <div style={{ width: '10rem' }}>
            <Button
              onClick={() => setDataForSwitchingNetwork({ modalNotification: false })}
              className="font-bold"
            >
              ACCEPT
            </Button>
          </div>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  )
}

TestnetModal.propTypes = {
  modalNotification: PropTypes.bool,
  setDataForSwitchingNetwork: PropTypes.func
}
export const TestnetModalComp = TestnetModal

const MainnetModal = ({ modalNotification, setDataForSwitchingNetwork }) => {
  return (
    <Modal visibility={modalNotification}>
      <div className="flex flex-col justify-between text-white h-3/5 w-2/5 md:w-2/5 max-w-screen-lg bg-gray-600 rounded-lg p-8">
        <div className="flex flex-col justify-between">
          <p className="mb-6 text-2xl font-bold">Welcome to Algodex Mainnet!</p>
          <p className="mb-6 italic font-medium text-lg">Be aware of potential risks -</p>
          <p className="mb-6 text-sm">
            You are trading on the Mainnet version of Algodex. Please be careful with your funds
            while making any orders as these transactions are with mainnet assets with real value
            and trades are permanent.
          </p>
          <p className="mb-6 text-sm">
            Algodex has gone through a security audit, however losses may occur due to unforeseen
            circumstances. Please review our Disclaimer and Documentation before continuing.
          </p>
          <div className="w-1/2">
            <hr />
            <p className="text-2xl my-3 italic font-medium">Disclaimer</p>
            <hr />
            <p className="text-2xl my-3 italic font-medium">Documentation</p>
            <hr />
            <div className="flex my-2 mx-2 w-1/4">
              <div className="flex items-center">
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
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <di style={{ width: '10rem' }}>
            <Button
              onClick={() => setDataForSwitchingNetwork({ modalNotification: false })}
              className="font-bold"
            >
              ACCEPT
            </Button>
          </di>
        </div>
      </div>
    </Modal>
  )
}

MainnetModal.propTypes = {
  modalNotification: PropTypes.bool,
  setDataForSwitchingNetwork: PropTypes.func
}
export const MainnetModalComp = MainnetModal
