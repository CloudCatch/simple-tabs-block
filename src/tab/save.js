/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { index } = attributes;

	return (
		<div { ...useBlockProps.save( { tabId: index } ) }>
			<InnerBlocks.Content />
		</div>
	);
}
