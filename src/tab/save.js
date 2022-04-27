/**
 * WordPress dependencies
 */
import { useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { index } = attributes;

	const innerBlocksProps = useInnerBlocksProps.save( {
		tabid: index,
		className: 'wp-block-cloudcatch-tab'
	} );

	return (
		<div { ...innerBlocksProps } />
	);
}
