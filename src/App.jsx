import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { isArray, mergeWith, omit, cloneDeep } from 'lodash';
import download from 'downloadjs';
import { Button } from '@welovedevs/ui';

import JsonStub from './data/resumeData.json';
import DeveloperProfile from './package';
import { ReactComponent as SaveIcon } from './package/assets/icons/drop_file.svg';

import { styles } from './app_styles';

const useStyles = createUseStyles(styles);
const mergeFunction = (objValue, srcValue, key) => {
    console.log({ objValue, srcValue, key });
    if (!objValue || isArray(objValue)) {
        return srcValue;
    }
    return undefined;
};

const mode = process.env.REACT_APP_MODE || 'readOnly';

function App() {
    const classes = useStyles();
    const [data, setData] = useState(omit(JsonStub, 'resumeCustomization'));

    const onEdit = useCallback((newData) => setData(mergeWith(cloneDeep(data), newData, mergeFunction)), [
        JSON.stringify(data)
    ]);
    const [customization, setCustomization] = useState(JsonStub.resumeCustomization || {});

    const onCustomizationChanged = useCallback(setCustomization, [data]);

    const handleClick = useCallback(async () => {
        // eslint-disable-next-line no-undef
        const blob = new Blob([JSON.stringify({ ...data, resumeCustomization: customization })], {
            type: 'text/plain; charset=utf-8'
        });
        download(
            blob,
            `${`Resume-${data?.basics?.name || 'Developer'}`.replace(' ', '-')}.json`,
            'text/plain; charset=utf-8'
        );
    }, [JSON.stringify(data), JSON.stringify(customization)]);

    return (
        <DeveloperProfile
            mode={mode}
            data={data}
            onEdit={onEdit}
            onCustomizationChanged={onCustomizationChanged}
            options={{
                // locale: 'tr',
                // side: 'back',
                apiKeys: {
                    giphy: process.env.REACT_APP_GIPHY
                },
                endpoints: {
                    devicons: process.env.REACT_DEV_ICONS
                },
                // dismissFooter : true
                // showContactInfos: true,
                customization
                // maxCardsPerRow: 3
            }}
            additionalNodes={{
                banner: {
                    actionsButtons: mode === 'edit' && (
                        <Button variant="outlined" onClick={handleClick} color={'light'}>
                            <SaveIcon className={classes.saveIcon} />
                            <FormattedMessage id="Profile.header.jsonResume.download" defaultMessage="Export" />
                        </Button>
                    )
                }
            }}
        />
    );
}

export default App;
