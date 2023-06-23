/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { index, label, showDescription, description } = attributes;

	const blockProps = useBlockProps.save( {
		role: 'tab',
		tabIndex: '0',
		tabid: index,
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		tabid: index,
		className: 'wp-block-cloudcatch-tab-content',
	} );

	return (
		<>
			<div { ...blockProps }>
				<label className="wp-block-cloudcatch-tab__label">
					{ label ?? __( 'Title', 'simple-tabs-block' ) }
				</label>
				{ showDescription && description.length > 0 && (
					<div
						aria-label="Description"
						className="wp-block-cloudcatch-tab__description"
					>
						{ description }
					</div>
				) }
			</div>
			<div { ...innerBlocksProps } />
		</>
	);
}
