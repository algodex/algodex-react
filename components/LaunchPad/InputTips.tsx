export const InputTips = {
  reserveAddr:
    'Specifying a reserve account signifies that non-minted assets will reside in that account instead of the default creator account. Assets transferred from this account are "minted" units of the asset. If you specify a new reserve address, you must make sure the new account has opted into the asset and then issue a transaction to transfer all assets to the new reserve.',
  clawbackAddr:
    'The clawback address represents an account that is allowed to transfer assets from and to any asset holder (assuming they have opted-in). Use this if you need the option to revoke assets from an account (like if they breach certain contractual obligations tied to holding the asset). In traditional finance, this sort of transaction is referred to as a clawback.',
  managerAddr:
    'The manager account is the only account that can authorize transactions to re-configure or destroy an asset. Never set this address to empty if you want to be able to re-configure or destroy the asset.',
  freezeAddr:
    'The freeze account is allowed to freeze or unfreeze the asset holdings for a specific account. When an account is frozen it cannot send or receive the frozen asset. In traditional finance, freezing assets may be performed to restrict liquidation of company stock, to investigate suspected criminal activity or to deny-list certain accounts. If the DefaultFrozen state is set to True, you can use the unfreeze action to authorize certain accounts to trade the asset (such as after passing KYC/AML checks).'
}
