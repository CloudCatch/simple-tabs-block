/**
 * External dependencies
 */
import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default [
	{
		attributes: {
			uuid: {
				type: 'string',
			},
			tabs: {
				type: 'array',
				default: [],
			},
			defaultTab: {
				type: 'number',
				default: 0,
			},
			activeTab: {
				type: 'string',
				default: '',
			},
		},
		save( { attributes } ) {
			const {
				tabs,
				defaultTab,
				layout: {
					justifyContent,
					orientation = 'horizontal',
					flexWrap = 'wrap',
				} = {},
			} = attributes;

			const innerBlockCount = tabs.length;

			const blockProps = useBlockProps.save( {
				className: classnames(
					'wp-block-cloudcatch-tabs__wrapper',
					'wp-block-cloudcatch-tabs-v2'
				),
				'data-default-tab': defaultTab || undefined,
			} );

			const innerBlocksProps = useInnerBlocksProps.save( {
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
			} );

			return (
				<div { ...blockProps }>
					<div { ...innerBlocksProps } />
				</div>
			);
		},
	},
	{
		attributes: {
			uuid: {
				type: 'string',
			},
			tabs: {
				type: 'array',
				default: [],
			},
			defaultTab: {
				type: 'number',
				default: 0,
			},
			activeTab: {
				type: 'string',
				default: '',
			},
		},
		save( { attributes } ) {
			const {
				tabs,
				defaultTab,
				layout: {
					justifyContent,
					orientation = 'horizontal',
					flexWrap = 'wrap',
				} = {},
			} = attributes;

			const className = classnames( 'wp-block-cloudcatch-tabs__wrapper', {
				'items-justified-right': justifyContent === 'right',
				'items-justified-space-between':
					justifyContent === 'space-between',
				'items-justified-left': justifyContent === 'left',
				'items-justified-center': justifyContent === 'center',
				'is-vertical': orientation === 'vertical',
				'no-wrap': flexWrap === 'nowrap',
			} );

			return (
				<div { ...useBlockProps.save( { className } ) }>
					<div className="wp-block-cloudcatch-tabs__tabs-wrapper">
						<div
							className="wp-block-cloudcatch-tabs__tabs"
							role="tablist"
							aria-orientation={ orientation }
						>
							{ tabs.map( ( innerBlock, key ) => (
								<div key={ key }>
									<RichText.Content
										value={
											innerBlock?.attributes?.label ??
											__( 'Title' )
										}
										tagName="label"
										tabIndex="0"
										role="tab"
										key={ key }
										tabid={ key }
										className={ classnames(
											'wp-block-cloudcatch-tab__label',
											innerBlock?.attributes?.className,
											{ active: key === defaultTab }
										) }
									/>
									{ innerBlock?.attributes
										?.showDescription && (
										<RichText.Content
											value={
												innerBlock?.attributes
													?.description ??
												__( 'Description' )
											}
											tagName="div"
											className="wp-block-cloudcatch-tab__description"
										/>
									) }
								</div>
							) ) }
						</div>
					</div>
					<div
						{ ...useInnerBlocksProps.save( {
							className: 'wp-block-cloudcatch-tabs__container',
						} ) }
					/>
				</div>
			);
		},
	},
	{
		attributes: {
			uuid: {
				type: 'string',
			},
			tabs: {
				type: 'array',
				default: [],
			},
			defaultTab: {
				type: 'number',
				default: 0,
			},
			activeTab: {
				type: 'string',
				default: '',
			},
		},
		save( { attributes } ) {
			const {
				tabs,
				defaultTab,
				layout: {
					justifyContent,
					orientation = 'horizontal',
					flexWrap = 'wrap',
				} = {},
			} = attributes;

			const innerBlockCount = tabs.length;

			const blockProps = useBlockProps.save( {
				className: classnames(
					'wp-block-cloudcatch-tabs__wrapper',
					'wp-block-cloudcatch-tabs-v2'
				),
				'data-default-tab': defaultTab || undefined,
			} );

			const innerBlocksProps = useInnerBlocksProps.save( {
				className: classnames(
					'wp-block-cloudcatch-tabs__container',
					'wp-block-cloudcatch-tabs-is-layout-flex',
					{
						'items-justified-right': justifyContent === 'right',
						'items-justified-space-between':
							justifyContent === 'space-between',
						'items-justified-left': justifyContent === 'left',
						'items-justified-center': justifyContent === 'center',
						'is-vertical': orientation === 'vertical',
						'no-wrap': flexWrap === 'nowrap',
					}
				),
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
			} );

			return (
				<div { ...blockProps }>
					<div { ...innerBlocksProps } />
				</div>
			);
		},
	},
];
