import { useInnerBlocksProps } from '@wordpress/block-editor';

export default [
	{
		attributes: {
			index: {
				type: 'number',
			},
			label: {
				type: 'string',
				default: 'Title',
			},
			showDescription: {
				type: 'boolean',
				default: false,
			},
			description: {
				type: 'string',
				default: '',
			},
		},
		save( { attributes } ) {
			const { index } = attributes;

			const innerBlocksProps = useInnerBlocksProps.save( {
				tabid: index,
				className: 'wp-block-cloudcatch-tab',
			} );

			return <div { ...innerBlocksProps } />;
		},
	},
];
