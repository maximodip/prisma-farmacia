import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { removeAccount } from '@/actions/accounts-actions'

export function AccountButtonDelete({ accountId }: { accountId: number }) {
  return (
    <form action={removeAccount}>
      <input name="accountId" type="hidden" value={accountId} />
      <Button size="sm" variant="outline">
        <Trash2 className="mr-2 h-4 w-4" />
        Eliminar
      </Button>
    </form>
  )
}
