/**
 * External dependencies
 */
import classnames from 'classnames';
import times from 'lodash/times';

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
	InnerBlocks,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { PanelBody, SelectControl } from '@wordpress/components';
import { withSelect, useSelect, withDispatch, select } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'cloudcatch/tab' ];

const DEFAULT_BLOCK = {
	name: 'cloudcatch/tab',
};

function Edit( {
	attributes,
	setAttributes,
	innerBlocks,
	clientId,
	updateActiveTab,
	resetTabOrder,
} ) {
	const {
		defaultTab,
		activeTab,
		layout: {
			justifyContent,
			orientation = 'horizontal',
			flexWrap = 'wrap',
		} = {},
	} = attributes;

	useEffect( () => {
		resetTabOrder();
	}, [ innerBlocks ] );

	const { getSelectedBlock } = select( blockEditorStore );

	const { innerBlockCount, selectedBlock, innerBlockIds } = useSelect(
		( _select ) => {
			return {
				innerBlockCount:
					_select( blockEditorStore ).getBlock( clientId )
						?.innerBlocks?.length,
				selectedBlock: getSelectedBlock(),
				innerBlockIds: _select( blockEditorStore )
					.getBlock( clientId )
					?.innerBlocks.map( ( block ) => block.attributes.id )
					.filter( ( x ) => x !== undefined ),
			};
		},
		[ clientId ]
	);

	useEffect( () => {
		if ( ! activeTab && innerBlockIds.length ) {
			console.log( innerBlockIds );
			updateActiveTab( innerBlockIds[ 0 ] );
		}
	}, [ innerBlockIds ] );

	useEffect( () => {
		if (
			selectedBlock &&
			innerBlockIds.includes( selectedBlock?.attributes?.id )
		) {
			updateActiveTab( selectedBlock.attributes.id );
		}
	}, [ selectedBlock ] );

	const blockProps = useBlockProps( {
		className: classnames(
			'wp-block-cloudcatch-tabs__wrapper',
			'wp-block-cloudcatch-tabs-v2'
		),
		'data-default-tab': defaultTab || undefined,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: classnames( 'wp-block-cloudcatch-tabs__container', {
				'items-justified-right': justifyContent === 'right',
				'items-justified-space-between':
					justifyContent === 'space-between',
				'items-justified-left': justifyContent === 'left',
				'items-justified-center': justifyContent === 'center',
				'is-vertical': orientation === 'vertical',
				'no-wrap': flexWrap === 'nowrap',
			} ),
			style: {
				gridTemplateColumns:
					orientation !== 'vertical'
						? `repeat(${ innerBlockCount }, auto) ${
								justifyContent === 'left' ? '1fr' : 'auto'
						  }`
						: undefined,
				gridTemplateRows:
					orientation === 'vertical'
						? `repeat(${ innerBlockCount }, auto) 1fr`
						: undefined,
			},
		},
		{
			renderAppender: InnerBlocks.ButtonBlockAppender,
			allowedBlocks: ALLOWED_BLOCKS,
			__experimentalDefaultBlock: DEFAULT_BLOCK,
			__experimentalDirectInsert: true,
			templateLock: false,
			template: [
				[
					'cloudcatch/tab',
					{ label: 'Tab 1' },
					[
						[
							'core/paragraph',
							{
								content: 'Tab 1 Content',
							},
						],
					],
				],
				[
					'cloudcatch/tab',
					{ label: 'Tab 2' },
					[
						[
							'core/paragraph',
							{
								content: 'Tab 2 Content',
							},
						],
					],
				],
				[
					'cloudcatch/tab',
					{ label: 'Tab 3' },
					[
						[
							'core/paragraph',
							{
								content: 'Tab 3 Content',
							},
						],
					],
				],
			],
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label={ __( 'Default open tab', 'simple-tabs-block' ) }
						value={ defaultTab }
						options={ innerBlocks.map( ( tab, index ) => {
							return {
								value: index,
								label: tab.attributes.label,
							};
						} ) }
						onChange={ ( value ) =>
							setAttributes( { defaultTab: parseInt( value ) } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}

export default compose(
	withSelect( ( _select, { clientId } ) => {
		return {
			innerBlocks: _select( 'core/block-editor' ).getBlocks( clientId ),
		};
	} ),
	withDispatch( ( dispatch, { clientId }, { select: _select } ) => {
		const { getBlock } = _select( 'core/block-editor' );
		const { updateBlockAttributes } = dispatch( 'core/block-editor' );
		const block = getBlock( clientId );
		const { selectBlock } = dispatch( blockEditorStore );

		return {
			selectBlock( _clientId ) {
				selectBlock( _clientId );
			},
			resetTabOrder() {
				const tabs = [];

				times( block.innerBlocks.length, ( n ) => {
					updateBlockAttributes( block.innerBlocks[ n ].clientId, {
						index: n,
					} );

					tabs.push( block.innerBlocks[ n ].attributes.id );
				} );

				updateBlockAttributes( clientId, {
					tabs,
				} );
			},
			updateActiveTab( activeTab ) {
				updateBlockAttributes( block.clientId, {
					activeTab,
				} );
			},
		};
	} )
)( Edit );
