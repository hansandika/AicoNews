// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default 
tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'no-unused-vars': 'error',
			'indent': ['error', 'tab'],
			'@typescript-eslint/quotes': ['error', 'single'],
			'jsx-quotes': ['error', 'prefer-single']
		}
	}
)
;