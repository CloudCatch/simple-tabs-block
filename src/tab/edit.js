/**
 * External dependencies
 */
import classnames from 'classnames';
import { customAlphabet } from 'nanoid';

import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import {
	useInnerBlocksProps,
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import './editor.scss';

export default function Edit( { attributes, setAttributes, context } ) {
	const { id, index, label, showDescription, description } = attributes;

	useEffect( () => {
		if ( ! id ) {
			const nanoid = customAlphabet(
				'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
				11
			);

			setAttributes( { id: nanoid() } );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: classnames( {
			active: id === context[ 'cloudcatch/tabs/activeTab' ],
		} ),
		role: 'tab',
		tabIndex: '0',
		tabid: index,
	} );

	const innerBlocksProps = useInnerBlocksProps( {
		tabid: index,
		className: classnames( 'wp-block-cloudcatch-tab-content', {
			active: id === context[ 'cloudcatch/tabs/activeTab' ],
		} ),
		style: {
			display:
				id === context[ 'cloudcatch/tabs/activeTab' ]
					? 'block'
					: 'none',
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<TextControl
						label={ __( 'Tab label' ) }
						value={ label }
						onChange={ ( value ) =>
							setAttributes( { label: value } )
						}
						__nextHasNoMarginBottom={ true }
					/>
					<ToggleControl
						label={ __( 'Show description' ) }
						checked={ showDescription }
						onChange={ () =>
							setAttributes( {
								showDescription: ! showDescription,
							} )
						}
						__nextHasNoMarginBottom={ true }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					tagName="label"
					value={ attributes?.label ?? __( 'Title' ) }
					onChange={ ( content ) =>
						setAttributes( { label: content } )
					}
					className="wp-block-cloudcatch-tab__label"
				/>
				{ showDescription && (
					<RichText
						aria-label={ __( 'Description' ) }
						placeholder={ __( 'Add text…' ) }
						value={ description }
						onChange={ ( value ) =>
							setAttributes( {
								description: value,
							} )
						}
						identifier="div"
						className="wp-block-cloudcatch-tab__description"
					/>
				) }
			</div>
			<div { ...innerBlocksProps } />
		</>
	);
}
