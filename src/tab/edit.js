/**
 * External dependencies
 */
import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useInnerBlocksProps, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({ attributes, setAttributes, className, clientId, context }) {
	const {
		index,
		label,
		showDescription,
	} = attributes;

	const blockProps = useBlockProps( {
		tabid: index,
		style: {
			'display': clientId === context['cloudcatch/tabs/activeTab'] ? 'block' : 'none'
		}
	} );

	const innerBlocksProps = useInnerBlocksProps( {
		tabid: index,
		className: 'wp-block-cloudcatch-tab',
		style: {
			'display': clientId === context['cloudcatch/tabs/activeTab'] ? 'block' : 'none'
		}
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
					<ToggleControl
						label={ __( 'Show description' ) }
						checked={ showDescription }
						onChange={ () => setAttributes( { showDescription: ! showDescription } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</>
	);
}
