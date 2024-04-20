import * as React from 'react'

import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		const isDesktop = useMediaQuery('(min-width: 768px)');

		React.useEffect(() => {
			if (isDesktop && ref) {
				(ref as React.MutableRefObject<HTMLTextAreaElement>).current?.focus();
			}
		}, [isDesktop])

		return (
			<textarea
				className={cn(
					'flex max-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none no-scrollbar',
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Textarea.displayName = 'Textarea'

export { Textarea }
