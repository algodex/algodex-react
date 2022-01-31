import React, { useState } from 'react'
import { HowItWorksWrapper, Container, Accordion } from './styles.css'
import Link from 'next/link'
import Modal from 'components/Modal'
import { Icon } from '@iconify/react'

export const AboutFAQ = () => {
  const [isModalActive, setIsModalActive] = useState(false)
  const [showContent, setShowContent] = useState(0)
  const toggleContent = (number) => {
    showContent == number ? setShowContent(0) : setShowContent(number)
  }
  const togleModal = () => {
    setIsModalActive(!isModalActive)
  }

  return (
    <HowItWorksWrapper>
      <hr className="mt-8" />
      <Container className="container mx-auto">
        <h4 className="text-lg mb-10">Frequently Asked Questions (FAQ)</h4>
        <Accordion className="accordion-wrapper">
          {/* <!-- header --> */}
          <div
            className="accordion-header cursor-pointer transition flex items-center"
            onClick={() => toggleContent(1)}
            onKeyDown={() => toggleContent(1)}
            tabIndex="0"
            role="button"
            aria-pressed="false"
          >
            <span className={showContent == 1 ? 'angle-down' : ''}>
              <Icon icon="whh:chevronright" />
            </span>
            <h3 className={showContent == 1 ? 'text-gray-800' : 'text-gray-400'}>
              When will Algodex be available to the public?
            </h3>
          </div>
          {/* <!-- Content --> */}
          <div
            className={`accordion-content overflow-hidden ${
              showContent == 1 ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <p className="font-light">
              Expected launch is Q4 2021, though this may be delayed due to security auditors being
              extremely busy.
            </p>
          </div>

          {/* <!-- header --> */}
          <div
            className="accordion-header cursor-pointer transition flex items-center"
            onClick={() => toggleContent(2)}
            onKeyDown={() => toggleContent(2)}
            tabIndex="0"
            role="button"
            aria-pressed="false"
          >
            <span className={showContent == 2 ? 'angle-down' : ''}>
              <Icon icon="whh:chevronright" />
            </span>
            <h3 className={showContent == 2 ? 'text-gray-800' : 'text-gray-400'}>
              Are there any opportunities to be part of the testing process?
            </h3>
          </div>
          {/* <!-- Content --> */}
          <div
            className={`accordion-content overflow-hidden ${
              showContent == 2 ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <p className="font-light">
              Yes, you can now try out the exchange on Testnet by going to testnet.algodex.com on a
              desktop computer!
            </p>
          </div>

          {/* <!-- header --> */}
          <div
            className="accordion-header cursor-pointer transition flex items-center"
            onClick={() => toggleContent(3)}
            onKeyDown={() => toggleContent(3)}
            tabIndex="0"
            role="button"
            aria-pressed="false"
          >
            <span className={showContent == 3 ? 'angle-down' : ''}>
              <Icon icon="whh:chevronright" />
            </span>
            <h3 className={showContent == 3 ? 'text-gray-800' : 'text-gray-400'}>
              Is Algodex planning to have a token?
            </h3>
          </div>
          {/* <!-- Content --> */}
          <div
            className={`accordion-content overflow-hidden ${
              showContent == 3 ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <p className="font-light">
              Details of any potential upcoming token or airdrop will be communicated closer to the
              public launch. If you would like to be notified of any updates, you can enter your
              email address at the top of the page to subscribe for updates!
            </p>
          </div>

          {/* <!-- header --> */}
          <div
            className="accordion-header cursor-pointer transition flex items-center"
            onClick={() => toggleContent(4)}
            onKeyDown={() => toggleContent(4)}
            tabIndex="0"
            role="button"
            aria-pressed="false"
          >
            <span className={showContent == 4 ? 'angle-down' : ''}>
              <Icon icon="whh:chevronright" />
            </span>
            <h3 className={showContent == 4 ? 'text-gray-800' : 'text-gray-400'}>
              When will Algodex be available to the public?
            </h3>
          </div>
          {/* <!-- Content --> */}
          <div
            className={`accordion-content overflow-hidden ${
              showContent == 4 ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <p className="font-light">
              Currently, the only supported wallet is{' '}
              <span className="text-red-500">
                <Link href="https://myalgo.com" target="_blank" rel="noreferrer">
                  My Algo
                </Link>
              </span>
              . Once you have your wallet set up, you&#39;ll be able to interact with Algodex.
            </p>
          </div>

          {/* <!-- header --> */}
          <div
            className="accordion-header cursor-pointer transition flex items-center"
            onClick={() => toggleContent(5)}
            onKeyDown={() => toggleContent(5)}
            tabIndex="0"
            role="button"
            aria-pressed="false"
          >
            <span className={showContent == 5 ? 'angle-down' : ''}>
              <Icon icon="whh:chevronright" />
            </span>
            <h3 className={showContent == 5 ? 'text-gray-800' : 'text-gray-400'}>
              Do I need to generate new wallet keys to use My Algo?
            </h3>
          </div>
          {/* <!-- Content --> */}
          <div
            className={`accordion-content overflow-hidden ${
              showContent == 5 ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <p className="font-light">
              If you already have a wallet with My Algo, then you can use your existing keys. If you
              use another wallet such as the official Algorand Mobile Wallet, you can import your
              current mnemonic/keys into My Algo, but we recommend creating a new wallet and
              transferring funds into it.
            </p>
          </div>

          {/* <!-- header --> */}
          <div
            className="accordion-header cursor-pointer transition flex items-center"
            onClick={() => toggleContent(6)}
            onKeyDown={() => toggleContent(6)}
            tabIndex="0"
            role="button"
            aria-pressed="false"
          >
            <span className={showContent == 6 ? 'angle-down' : ''}>
              <Icon icon="whh:chevronright" />
            </span>
            <h3 className={showContent == 6 ? 'text-gray-800' : 'text-gray-400'}>
              How can I ensure my funds are safe?
            </h3>
          </div>
          {/* <!-- Content --> */}
          <div
            className={`accordion-content overflow-hidden ${
              showContent == 6 ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <p className="font-light">
              My Algo does not store your wallet keys on their servers. They are only held in your
              local browser cache. With that said, keeping your crypto keys stored safely and out of
              view from prying eyes is your responsibility.
            </p>
          </div>

          {/* <!-- header --> */}
          <div
            className="accordion-header cursor-pointer transition flex items-center"
            onClick={() => toggleContent(7)}
            onKeyDown={() => toggleContent(7)}
            tabIndex="0"
            role="button"
            aria-pressed="false"
          >
            <span className={showContent == 7 ? 'angle-down' : ''}>
              <Icon icon="whh:chevronright" />
            </span>
            <h3 className={showContent == 7 ? 'text-gray-800' : 'text-gray-400'}>
              What if I have an issue or suggestion?
            </h3>
          </div>
          {/* <!-- Content --> */}
          <div
            className={`accordion-content overflow-hidden ${
              showContent == 7 ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <p className="font-light">
              You can submit a request by clicking{' '}
              <span className="text-red-500">
                <Link href="/support" target="_blank" rel="noreferrer">
                  here
                </Link>
              </span>
              .
            </p>
          </div>
        </Accordion>
      </Container>
      <hr className="my-8" />
      <Container className="container mx-auto">
        <div className="my-14 md:flex">
          <div className="lg:w-1/2 md:w-3/5 md:text-left xs:text-center mb-7 mr-6">
            <h2 className="text-lg mb-9">Donations / Tips</h2>
            <p className="italic text-sm font-weight-light text-gray-800/60">
              Algodex is completely bootstrapped and could use your help. If you’d like to donate or
              send a tip to help the project, please click on the button to view our ALGO address.
              We welcome any and all amounts – thank you for your generosity!
            </p>
          </div>
          <div className="my-auto lg:w-1/2 md:w-2/5 text-center mb-7">
            <button className="btn-outline" onClick={togleModal}>
              View ALGO Address / QR
            </button>
          </div>
        </div>
      </Container>
      <Modal
        isVisible={isModalActive}
        className="fixed top-0  w-full h-full justify-center items-center"
      >
        <div className="modal-wrapper xs:h-5/6 xs:w-5/6 md:h-3/5 md:w-2/5 max-w-screen-lg">
          <div
            role="button"
            tabIndex={0}
            className="flex justify-end text-gray-000 text-lg close-button"
            onClick={togleModal}
            onKeyDown={togleModal}
          >
            <Icon icon="ep:close-bold" />
          </div>
          <div className="flex flex-col justify-between text-white w-full bg-gray-000 rounded-lg xs:p-4 md:p-8">
            <div className="flex flex-col justify-center">
              <p className="text-gray-500 break-words text-center">
                UNRAB5TNRMQJYII2QMFDN3Z2KF4ZZN5RZQW7TMGG2GYI5SIBG7BBPLD2CE
              </p>
              <img
                src="/algodex-donate-qr.png"
                alt=""
                className="w-full h-full object-contain p-0"
              />
            </div>
          </div>
        </div>
      </Modal>
    </HowItWorksWrapper>
  )
}
