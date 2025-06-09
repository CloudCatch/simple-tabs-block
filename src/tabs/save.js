/**
 * External dependencies
 */
import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
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
		role: 'tablist',
	} );

	return (
		<div { ...blockProps }>
			<div { ...innerBlocksProps } />
		</div>
	);
}
