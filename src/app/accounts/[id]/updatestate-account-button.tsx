'use client'

import { Button } from '@/components/ui/button'
import { updateAccountState } from '@/actions/accounts-actions'

export function UpdateAccountStateButton({
  accountId,
  accountState,
}: {
  accountId: number
  accountState: string
}) {
  return (
    <Button
      variant="outline"
      onClick={() => updateAccountState(accountId, accountState === 'paid' ? 'pending' : 'paid')}
    >
      {accountState === 'paid' ? 'Cambiar a pendiente' : 'Cambiar a pagado'}
    </Button>
  )
}
