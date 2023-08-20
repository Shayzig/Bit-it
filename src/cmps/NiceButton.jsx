import React from 'react'

export function NiceButton({ children, Icon, ...restOfProps }) {

    return (
        <button {...restOfProps}>
            {Icon && <><Icon />&nbsp;</>}
            {children}
            {/* {console.log('rest:', restOfProps)} */}
            {/* {console.log('icon:', Icon)} */}
            {/* {console.log('children:', children)} */}
        </button>
    )
}


