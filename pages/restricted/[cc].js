import Header from 'components/header'
import Image from 'next/image'
import Modal from 'components/Modal'
import { useRouter } from 'next/router'

// import warning from "../public/icon-warning.png";

const Input = (props) => {
  return (
    <input
      className="w-11/12 my-8 px-4 h-8 tracking-wider bg-gray-700 placeholder-gray-200 border-gray-600 border border-solid"
      {...props}
    />
  )
}

const Restricted = () => {
  const router = useRouter()
  const showEmail = router.query.showEmailForm
  return (
    <div className="h-screen flex flex-col items-center text-gray-200 font-semibold leading-5 tracking-wider">
      <Header />

      <main className="flex flex-col flex-1 md:h-100 w-full items-center justify-center bg-cover bg-no-repeat bg-unauthorized-mobile md:bg-unauthorized">
        <Modal isVisible={true} hideBackdrop={false}>
          <div className="h-auto w-10/12 md:w-8/12 max-w-screen-lg bg-gray-600 rounded-sm pt-5">
            <div className="flex flex-col md:flex-row text-center md:text-left h-full bg-gray-700 ">
              <div className="mt-4 md:mt-0 mx-8 md:mx-12 flex justify-center items-center ">
                <Image src={'/icon-warning.png'} alt="Warning" width={40} height={40} />
              </div>
              <div className="mx-8 mb-8 flex-1 md:m-4 md:ml-0">
                <p className="my-4">At this time, Algodex is not available in your region (USA).</p>
                <p className="my-4">
                  If you wish to try the platform, you can use{' '}
                  <a href="//testnet.algodex.com" className="text-blue-400">
                    Algodex Testnet
                  </a>
                  . Access to the Algodex Testnet is simulated trading with testnet tokens for no
                  monetary value and is not intended as investment advice or a solicitation to
                  engage in any type of trading activity.
                </p>
              </div>
            </div>
          </div>
        </Modal>
        {showEmail && (
          <div className="text-center text-xs m-6 mt-16 tracking-wide leading-normal">
            <p>Algodex may be available in your region in the future!</p>
            <p>If you wish to be notified, you can provide an email below.</p>
            <Input name="email" type="email" placeholder="Email" />
          </div>
        )}
      </main>
    </div>
  )
}

export default Restricted
