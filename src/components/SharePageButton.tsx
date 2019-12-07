import React, { useState } from 'react';
import { useColorMode } from "theme-ui"
import Icons from "../icons"

import { IconWrapper } from "@components/IconWrapper"
import { ToolTip } from "./ToolTip"
import {
    copyToClipboard
} from "../utils"


export const SharePageButton: React.FC<{}> = () => {
    const [hasCopied, setHasCopied] = useState<boolean>(false)
    const [colorMode] = useColorMode()
    const isDark = colorMode === `dark`
    const fill = isDark ? "#fff" : "#000"

    function copyToClipboardOnClick() {
        if (hasCopied) return

        copyToClipboard(window.location.href)
        setHasCopied(true)

        setTimeout(() => {
            setHasCopied(false)
        }, 1000)
    }

    return (
        <IconWrapper
            isDark={isDark}
            onClick={copyToClipboardOnClick}
            data-a11y="false"
            aria-label="Copy URL to clipboard"
            title="Copy URL to clipboard"
        >
            <Icons.Link fill={fill} />
            <ToolTip isDark={isDark} hasCopied={hasCopied}>
                Copied
        </ToolTip>
        </IconWrapper>
    )
}