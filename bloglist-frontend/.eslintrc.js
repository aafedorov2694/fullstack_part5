module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'jest/globals': true 
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/jsx-runtime'
	],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module',
		'ecmaFeatures': {
			'jsx': true
		}
	},
	'plugins': [
		'react'
	],
	'rules': {
		'indent': [
			'error',
			2
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'eqeqeq': 'error',
		'arrow-spacing': [
			'error', { 'before': true, 'after': true }
		],
		'no-console': 0,
		'object-curly-spacing': [
			'error', 'always'
		],
		'react/prop-types': 0,
      	'react/react-in-jsx-scope': 'off'
		
	},
	'settings': {
		'react': {
			'version': 'detect'
		}
	}
	
		

	
}
