/**
 * External dependencies
 */
import classnames from 'classnames';
import times from 'lodash/times';
import { nanoid, customAlphabet } from 'nanoid';

import { __ } from '@wordpress/i18n';
import { 
	useBlockProps, 
	BlockControls, 
	InspectorControls, 
	useInnerBlocksProps, 
	InnerBlocks, 
	RichText, 
	store as blockEditorStore 
} from '@wordpress/block-editor';
import { useRef, useEffect, useState } from '@wordpress/element';
import { PanelBody, SelectControl } from '@wordpress/components';
import { withSelect, useSelect, withDispatch, useDispatch, select } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import './editor.scss';
import TabsInnerBlocks from './edit/inner-blocks';

function Edit({ attributes, setAttributes, className, innerBlocks, clientId, updateActiveTab, selectBlock, resetTabOrder }) {
	const nanoid = customAlphabet('1234567890abcdef', 10);

	const {
		uuid = nanoid(),
		activeTab,
		defaultTab,
		tabs,
		layout: {
			justifyContent,
			orientation = 'horizontal',
			flexWrap = 'wrap',
		} = {},
	} = attributes;

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	useEffect( () => {
		resetTabOrder();
	}, [ innerBlocks ] );

	const tabsRef = useRef();

	const blockProps = useBlockProps({
		ref: tabsRef,
		className: classnames(className, 'wp-block-cloudcatch-tabs__wrapper', {
			'items-justified-right': justifyContent === 'right',
			'items-justified-space-between': justifyContent === 'space-between',
			'items-justified-left': justifyContent === 'left',
			'items-justified-center': justifyContent === 'center',
			'is-vertical': orientation === 'vertical',
			'no-wrap': flexWrap === 'nowrap',
		})
	});

	const changeTab = ( tab ) => {
		updateActiveTab( tab );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label={ __( 'Default open tab' ) }
						value={ defaultTab }
						options={ tabs.map((tab, index) => {
							return {value: index, label: tab.label};
						} ) }
						onChange={ (value) => setAttributes( { defaultTab: parseInt(value) } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="wp-block-cloudcatch-tabs__tabs-wrapper">
					<div className="wp-block-cloudcatch-tabs__tabs" role="tablist" aria-orientation={ orientation }>
						{
							tabs.map((innerBlock, key) => {

								return (
									<RichText
										aria-label={__('Title')}
										placeholder={__('Add text…')}
										value={innerBlock.label ?? __('Title')}
										onChange={(value) => {
											updateBlockAttributes( innerBlock.clientId, {
												label: value,
											} );
										}}
										key={ key }
										role="tab"
										// aria-controls={ uuid + '-tab' }
										tabid={ key }
										tabIndex="0"
										withoutInteractiveFormatting
										identifier="label"
										className={ classnames( 'wp-block-cloudcatch-tab__label', { 'active': activeTab === innerBlock.clientId } ) }
										unstableOnFocus={ (e) => changeTab( innerBlock.clientId ) }
									/>
								);
							})
						}
						<InnerBlocks.ButtonBlockAppender />
					</div>
				</div>
				<TabsInnerBlocks />
			</div>
		</>

	);
}

export default compose(
	withSelect(
		( select, { clientId } ) => {
			return {
				innerBlocks: select( 'core/block-editor' ).getBlocks( clientId )
			};
		}
	),
	withDispatch( ( dispatch, { clientId }, { select } ) => {
		const {
			getBlock,
		} = select( 'core/block-editor' );

		const {
			updateBlockAttributes,
			moveBlockToPosition
		} = dispatch( 'core/block-editor' );

		const block = getBlock( clientId );

		const { selectBlock } = dispatch( blockEditorStore );

		return {
			selectBlock( clientId ) {
				selectBlock( clientId );
			},
			resetTabOrder() {
				let tabs = [];

				times( block.innerBlocks.length, n => {
					updateBlockAttributes( block.innerBlocks[ n ].clientId, {
						index: n,
					} );

					tabs.push( { "clientId": block.innerBlocks[ n ].clientId, "label": block.innerBlocks[ n ].attributes.label } );
				} );

				updateBlockAttributes( clientId, {
					tabs: tabs
				} );
			},
			updateActiveTab(activeTab) {
				updateBlockAttributes( block.clientId, {
					activeTab: activeTab,
				} );
				times( block.innerBlocks.length, n => {
					updateBlockAttributes( block.innerBlocks[ n ].clientId, {
						activeTab: activeTab,
					} );
				} );
				selectBlock( activeTab );
			},
			moveTab( tabId, newIndex ) {
				moveBlockToPosition( tabId, clientId, clientId, parseInt( newIndex ) );
			},
		};
	} ),
)( Edit );
