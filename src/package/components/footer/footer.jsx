import React, { memo } from 'react';

import cn from 'classnames';
import { createUseStyles, useTheme } from 'react-jss';

import { useMediaQuery } from '@material-ui/core';

import { ShareLinks } from './share_links/share_links';

import { ReactComponent as LinkedinLogo } from '../../assets/icons/brands/linkedin.svg';
import { ReactComponent as GithubLogo } from '../../assets/icons/brands/github.svg';

import { styles } from './footer_styles';

const useStyles = createUseStyles(styles);

const FooterComponent = () => {
    const classes = useStyles();
    const { screenSizes } = useTheme();

    const useSmallLayout = useMediaQuery(
        `(max-width: ${screenSizes.medium - (screenSizes.medium - screenSizes.small) / 2}px)`,
        { defaultMatches: true }
    );

    if (useSmallLayout) {
        return (
            <div className={cn(classes.container, useSmallLayout && classes.smallLayoutContainer)}>
                <div className={classes.wldLogoGithubLogoContainer}>
                    <a
                        className={classes.linkedinLink}
                        href="https://www.linkedin.com/in/satishjhanwer/"
                        target="_bank"
                    >
                        <LinkedinLogo className={classes.linkedinLogo} />
                    </a>
                    <a className={classes.githubLink} href="https://github.com/satishjhanwer" target="_bank">
                        <GithubLogo className={classes.githubLogo} />
                    </a>
                </div>
                <ShareLinks useSmallLayout />
            </div>
        );
    }

    return (
        <div className={classes.container}>
            <a className={classes.linkedinLink} href="https://www.linkedin.com/in/satishjhanwer/" target="_bank">
                <LinkedinLogo className={classes.linkedinLogo} />
            </a>
            <ShareLinks />
            <a className={classes.githubLink} href="https://github.com/satishjhanwer" target="_bank">
                <GithubLogo className={classes.githubLogo} />
            </a>
        </div>
    );
};

export const Footer = memo(FooterComponent);
