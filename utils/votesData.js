export const votesArray = [
  {
    appId:
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK &&
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK.toLowerCase() === 'testnet'
        ? 287726836
        : 1165656814,
    title: 'Algodex Community Leaders Program',
    description:
      'The Community Leaders Program was launched with the intention of fostering community growth, education, and participation. The program leverages the expertise of Community Leaders to improve the overall ecosystem and user experience by creating a more inclusive, knowledgeable, and vocal community.',
    startDate:
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK &&
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK.toLowerCase() === 'testnet'
        ? '2023-08-29T19:30:34.000Z'
        : '2023-09-10T19:54:00.000Z',
    endDate:
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK &&
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK.toLowerCase() === 'testnet'
        ? '2023-08-31T19:30:34.000Z'
        : '2023-09-01T19:54:00.000Z',
    question: {
      title: 'Should we continue to support the community leaders program?',
      description: 'Please choose one of the following options',
      options: ['Yes', 'No', 'Abstain']
    }
  },
  {
    appId:
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK &&
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK.toLowerCase() === 'testnet'
        ? 287730432
        : 1165656814,
    appId:
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK &&
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK.toLowerCase() === 'testnet'
        ? 287730432
        : 1165656814,
    title: 'Future projects and partnerships',
    description:
      'The Algodex team is always looking for new opportunities to expand our ecosystem and reach. We are considering building a business to business Software as a Service (SaaS) platform that would leverage the Algorand Blockchain and the concept of psuedoanonymity to increase the transparency of business operations for critical stakeholders while simultenously obfuscating those operations from the general public. Regardless of the outcome, the team is comitted to maintaining the operation of our flaghship decentralized exchange and the continued development of the Algorand ecosystem.',
    startDate:
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK &&
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK.toLowerCase() === 'testnet'
        ? '2023-08-29T17:58:19.000Z'
        : '2023-09-10T19:54:00.000Z',
    endDate:
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK &&
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK.toLowerCase() === 'testnet'
        ? '2023-08-29T18:31:39.000Z'
        : '2023-09-01T19:54:00.000Z',
    question: {
      title: `Should we shift our company's focus towards developing services for businesses and business transactions?`,
      description: 'Please choose one of the following options',
      options: ['Yes', 'No', 'Abstain']
    }
  },
  {
    appId:
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK &&
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK.toLowerCase() === 'testnet'
        ? 284837932
        : 1165656814,
    title: 'One-to-One token swap for ALGX',
    description:
      'The ecosystem wide MyAlgo wallet breach has affected our ability to provide liquidity for ALGX. The Algodex team is considering initiating a token swap on a 1-to-1 basis to restore equitable liquidity to our token. This would be a one time event and would not be repeated.',
    startDate:
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK &&
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK.toLowerCase() === 'testnet'
        ? '2023-08-24T19:45:27.000Z'
        : '2023-09-10T19:54:00.000Z',
    endDate:
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK &&
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK.toLowerCase() === 'testnet'
        ? '2023-08-31T03:00:00.000Z'
        : '2023-09-01T19:54:00.000Z',
    question: {
      title:
        'Given the MyAlgo wallet breach and resultant theft, should we initiate a token swap on a 1-to-1 basis to restore equitable liquidity to our token?',
      description: 'Please choose one of the following options',
      options: ['Yes', 'No', 'Abstain']
    }
  }
]
