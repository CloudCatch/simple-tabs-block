/**
 * External dependencies
 */
import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl } from '@wordpress/components';
import { useInnerBlocksProps, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({ attributes, setAttributes, className, clientId, context }) {
	const {
		index,
		label
	} = attributes;

	const blockProps = useBlockProps( {
		tabId: index,
		style: {
			'display': clientId === context['cloudcatch/tabs/activeTab'] ? 'block' : 'none'
		}
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {

	} );

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<TextControl
						label={ __( 'Tab label' ) }
						value={ label }
						onChange={ ( value ) => setAttributes( { label: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
