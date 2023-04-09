import React, { memo, useEffect, useState } from 'react';

import makeStyles from '@mui/styles/makeStyles';
import { FormattedMessage } from 'react-intl';

import { PopperCard, Typography } from '@welovedevs/ui';

import { ReactComponent as WarnIcon } from '../../../../assets/icons/warn.svg';

import { styles } from './profile_card_incomplete_popper_styles';
import { useMode } from '../../../hooks/use_mode';

const useStyles = makeStyles(styles);

const ProfileCardIncompletePopperComponent = ({ open, onClose, anchorElement }) => {
    const classes = useStyles();
    const [hasBeenMounted, setHasBeenMouneted] = useState(false);
    const [mode] = useMode();

    useEffect(() => setHasBeenMouneted(true), []);

    if (mode !== 'edit' || !open || !hasBeenMounted) {
        return null;
    }

    return (
        <PopperCard
            classes={{
                container: classes.container,
                arrowContainer: classes.arrowContainer
            }}
            open={open}
            onClose={onClose}
            anchorElement={anchorElement}
            popperProps={{
                placement: 'top',
                disablePortal: true,
                modifiers: [
                    {
                        name: 'preventOverflow'
                    },
                    {
                        name: 'hide'
                    },
                    {
                        name: 'flip'
                    }
                ]
            }}
        >
            <WarnIcon className={classes.icon} />
            <Typography color="light">
                <FormattedMessage
                    id="ProfileCardIncompletePopper.label.value"
                    defaultMessage="This card is missing data"
                />
            </Typography>
        </PopperCard>
    );
};

export const ProfileCardIncompletePopper = memo(ProfileCardIncompletePopperComponent);
