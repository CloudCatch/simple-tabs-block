/**
 * External dependencies
 */
import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useRef } from '@wordpress/element';
import { useInnerBlocksProps, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({ attributes, setAttributes, className, clientId, context }) {
	const {
		index,
		label,
		showDescription,
		description,
	} = attributes;

	console.log( attributes );

	// useEffect(() => {
	// 	console.log( attributes );
	// } );
	

	const ref = useRef(null);

	const blockProps = useBlockProps({
		tabid: index,
		className: classnames( 'wp-block-cloudcatch-tab', { 'active': context['cloudcatch/tabs/activeTab'] === clientId } ),
		// style: {
		// 	'display': clientId === context['cloudcatch/tabs/activeTab'] ? 'block' : 'none'
		// }
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps);

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<TextControl
						label={__('Tab label')}
						value={label}
						onChange={(value) => setAttributes({ label: value })}
					/>
					<ToggleControl
						label={__('Show description')}
						checked={showDescription}
						onChange={() => setAttributes({ showDescription: !showDescription })}
					/>
				</PanelBody>
			</InspectorControls>
			
			<div {...blockProps}>
				<label
					className='wp-block-cloudcatch-tab__label'
					role="tab"
					// tabid={key}
					tabIndex="0"
					// onFocus={(e) => changeTab(clientId)}
				>
					{label ?? __('Title')}
				</label>

				{showDescription && (
					<RichText
						aria-label={__('Description')}
						placeholder={__('Add text…')}
						value={description}
						onChange={(value) => {
							setAttributes({
								description: value,
							});
						}}
						identifier="div"
						className="wp-block-cloudcatch-tab__description"
					/>
				)}
			</div>					
		</>
	);
}
