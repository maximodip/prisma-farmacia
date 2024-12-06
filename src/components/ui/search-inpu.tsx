import * as React from 'react'
import { Search } from 'lucide-react'

import { cn } from '@/lib/utils'

const SearchInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={16} />

        <input
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background py-2 pl-10 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
          )}
          type={type}
          {...props}
        />
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'

export { SearchInput }
