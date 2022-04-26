import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export default function TabsList({ innerBlocks }) {

    // console.log(innerBlocks);

    return (
        <>
            {
                innerBlocks.map((innerBlock, key) => {
                    return (
                        <div key={ key }>
                            <RichText
                                aria-label={__('Title')}
                                placeholder={__('Add text…')}
                                value={innerBlock?.attributes?.label ?? __('Title')}
                                onChange={(value) => innerBlock.setAttributes({ label: value })}
                                withoutInteractiveFormatting
                                identifier="label"
                                className="wp-block-cloudcatch-tab__label"
                                unstableOnFocus={ (e) => console.log(innerBlock) }
                            />
                        </div>
                    );
                })
            }
        </>
    );

}
