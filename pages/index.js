import PageLayout from 'components/layout-page'

export default function IndexPage() {
  return (
    <PageLayout
      // title={asset?.name && `${asset.name} to ALGO ` + 'Algodex | Algorand Decentralized Exchange'}
      title="Algodex | Algorand Decentralized Exchange"
      description={'Decentralized exchange for trading Algorand ASAs'}
      // contentPromise={import('components/main-layout')}
    >
      {/*{renderDashboard()}*/}
    </PageLayout>
  )
}
