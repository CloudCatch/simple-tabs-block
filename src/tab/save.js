/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { index } = attributes;

	const blockProps = useBlockProps.save({
		tabid: index,
		className: 'wp-block-cloudcatch-tab'
	});

	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return (
		<div { ...innerBlocksProps } />
	);
}
